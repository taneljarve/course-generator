import http from "node:http";
import path from "node:path";
import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";
import os from "node:os";

import MarkdownIt from "markdown-it";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);

// On Vercel, both roots should point to /tmp (we copy hardcoded courses there at startup)
const GENERATED_ROOT = process.env.VERCEL
  ? path.join(os.tmpdir(), "opitee-generated-courses")
  : path.join(process.cwd(), "generated-courses");
const HARDCODED_ROOT = path.join(process.cwd(), "generated-courses");

const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const MAX_BODY_SIZE = 5 * 1024 * 1024;

// Determine which API provider to use
const API_PROVIDER = process.env.API_PROVIDER || "gemini"; // 'openai' or 'gemini'

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

const DaySchema = z.object({
  dayNumber: z.number().int().positive(),
  title: z.string().min(1),
  markdown: z.string().min(1),
});

const CoursePackageSchema = z.object({
  courseTitle: z.string().min(1),
  courseSummary: z.string().min(1),
  overviewMarkdown: z.string().min(1),
  days: z.array(DaySchema),
});

let openai = null;
let gemini = null;

if (process.env.OPENAI_API_KEY) {
  try {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    console.log("[DEBUG] OpenAI initialized");
  } catch (e) {
    console.error("[ERROR] Failed to init OpenAI:", e.message);
  }
}

if (process.env.GEMINI_API_KEY) {
  try {
    gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("[DEBUG] Gemini initialized");
  } catch (e) {
    console.error("[ERROR] Failed to init Gemini:", e.message);
  }
}

await ensureGeneratedRoot();

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);
    const method = request.method || "GET";

    // Add CORS headers
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle CORS preflight requests
    if (method === "OPTIONS") {
      response.writeHead(200);
      response.end();
      return;
    }

    if (method === "GET" && url.pathname === "/api/config") {
      const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
      const hasGemini = Boolean(process.env.GEMINI_API_KEY);
      
      console.log("[DEBUG] /api/config - OPENAI:", hasOpenAI, "GEMINI:", hasGemini);
      
      return sendJson(response, 200, {
        apiConfigured: hasOpenAI || hasGemini,
        providers: {
          openai: {
            configured: hasOpenAI,
            model: OPENAI_MODEL,
          },
          gemini: {
            configured: hasGemini,
            model: GEMINI_MODEL,
          },
        },
        activeProvider: API_PROVIDER,
        model: API_PROVIDER === "openai" ? OPENAI_MODEL : GEMINI_MODEL,
      });
    }

    if (method === "GET" && url.pathname === "/api/library") {
      return sendJson(response, 200, {
        courses: await listCourseLibrary(),
      });
    }

    if (method === "GET" && url.pathname === "/api/file") {
      const courseId = url.searchParams.get("course");
      const fileName = url.searchParams.get("file");

      if (!courseId || !fileName) {
        return sendJson(response, 400, {
          error: "Both course and file query parameters are required.",
        });
      }

      const filePayload = await readCourseFile(courseId, fileName);
      return sendJson(response, 200, filePayload);
    }

    if (method === "POST" && url.pathname === "/api/generate-course") {
      const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
      const hasGemini = Boolean(process.env.GEMINI_API_KEY);
      
      console.log("[DEBUG] /api/generate-course - OPENAI:", hasOpenAI, "GEMINI:", hasGemini);
      
      if (!hasOpenAI && !hasGemini) {
        return sendJson(response, 400, {
          error: "No API keys configured. Set OPENAI_API_KEY or GEMINI_API_KEY and restart.",
        });
      }

      const body = await parseJsonBody(request);
      const input = validateGenerationInput(body);
      
      console.log("[DEBUG] Generating course with provider:", input.provider || API_PROVIDER);
      
      let course;
      try {
        course = await generateCourse(input);
      } catch (genError) {
        console.error("[ERROR] generateCourse failed:", genError.message);
        return sendJson(response, 502, { error: genError.message });
      }
      
      const savedCourse = await persistCourse(course, input);

      return sendJson(response, 200, {
        course: {
          id: savedCourse.id,
          title: savedCourse.meta.courseTitle,
        },
        initialFile: "README.md",
        library: {
          courses: await listCourseLibrary(),
        },
      });
    }

    if (method === "GET") {
      return serveStaticAsset(url.pathname, response);
    }

    return sendJson(response, 404, { error: "Route not found." });
  } catch (error) {
    console.error("[ERROR]", error.message);
    const statusCode = error.statusCode || 500;
    let message = error.message || "Request failed.";
    if (statusCode >= 500) {
      message = "Internal server error. Check logs for details.";
    }
    return sendJson(response, statusCode, { error: message });
  }
});

server.listen(PORT, () => {
  console.log(`Opitee workspace is running at http://localhost:${PORT}`);
});

async function ensureGeneratedRoot() {
  await fs.mkdir(GENERATED_ROOT, { recursive: true });

  // If on Vercel and temp dir is empty, copy hardcoded courses
  if (process.env.VERCEL) {
    const entries = await fs.readdir(GENERATED_ROOT).catch(() => []);
    if (entries.length === 0 && process.env.VERCEL) {
      try {
        const hardcoded = await fs.readdir(HARDCODED_ROOT);
        for (const folder of hardcoded) {
          const src = path.join(HARDCODED_ROOT, folder);
          const dest = path.join(GENERATED_ROOT, folder);
          const stat = await fs.stat(src);
          if (stat.isDirectory()) {
            await fs.cp(src, dest, { recursive: true });
          }
        }
      } catch {}
    }
  }
}

async function listCourseLibrary() {
  const allDirs = new Set();

  for (const dir of [GENERATED_ROOT, HARDCODED_ROOT]) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith(".")) {
          allDirs.add(path.join(dir, entry.name));
        }
      }
    } catch {}
  }

  const courses = await Promise.all(
    Array.from(allDirs).map(async (courseDir) => {
      const folder = path.basename(courseDir);
      const meta = await readCourseMeta(courseDir);
      const allFiles = await fs.readdir(courseDir);
      const markdownFiles = allFiles
        .filter((fileName) => fileName.toLowerCase().endsWith(".md"))
        .sort(sortMarkdownFiles);

      const folderStat = await fs.stat(courseDir);

      return {
        id: folder,
        title: meta?.courseTitle || unslugify(folder),
        topic: meta?.topic || "",
        language: meta?.language || "",
        updatedAt: meta?.updatedAt || folderStat.mtime.toISOString(),
        files: markdownFiles.map((fileName) => ({
          name: fileName,
          label: humanizeFileName(fileName),
        })),
      };
    })
  );

  return courses.sort((left, right) => {
    return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
  });
}

async function readCourseMeta(courseDir) {
  try {
    const raw = await fs.readFile(path.join(courseDir, ".course.json"), "utf8");
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

async function readCourseFile(courseId, fileName) {
  const courseDir = safeCourseDirectory(courseId);
  const safeFileName = safeMarkdownFileName(fileName);
  const filePath = path.join(courseDir, safeFileName);

  const [rawMarkdown, fileStat] = await Promise.all([
    fs.readFile(filePath, "utf8"),
    fs.stat(filePath),
  ]);
  const meta = await readCourseMeta(courseDir);

  return {
    courseId,
    fileName: safeFileName,
    title: meta?.courseTitle || unslugify(courseId),
    markdown: rawMarkdown,
    html: markdown.render(rawMarkdown),
    updatedAt: fileStat.mtime.toISOString(),
  };
}

function validateGenerationInput(body) {
  const topic = String(body?.topic || "").trim();
  const language = String(body?.language || "").trim();
  const sourceText = String(body?.sourceText || "").trim();
  const days = Math.min(30, Math.max(1, Math.round(Number(body?.days))));
  const provider = String(body?.provider || "").trim();

  if (!topic) {
    throw createError(400, "Topic is required.");
  }

  if (!language) {
    throw createError(400, "Language is required.");
  }

  if (!Number.isFinite(days)) {
    throw createError(400, "Days must be a valid number.");
  }

  return {
    topic,
    language,
    days,
    sourceText,
    provider,
  };
}

async function generateCourse(input) {
  const sourceInstruction = input.sourceText
    ? `Primary source text is provided below. Use it as the main grounding material. If you add any supporting knowledge that is not directly in the source text, label that content explicitly as supplementary context and keep it concise.\n\nSOURCE TEXT:\n${input.sourceText}`
    : "No source text was provided. Build the course from general domain knowledge and keep it practical.";

  const systemPrompt = [
    "You generate complete learning courses as Markdown files.",
    "Return only valid JSON that matches the provided schema.",
    "The content must read well in a GitHub Markdown preview.",
    "Do not use HTML. Use Markdown headings, bullet lists, tables where useful, fenced code blocks if relevant, and short paragraphs.",
    "The requested language must be used consistently throughout the course.",
    "Create one README overview file plus one standalone day file per day.",
    "Each day markdown must start with a level-1 heading in the form '# Day N: Title'.",
    "Each day file should include these sections in Markdown: Learning Objectives, Key Concepts, Guided Explanation, Practical Exercise, Reflection Questions, and Quick Checklist.",
  ].join(" ");

  const userPrompt = [
    `Topic: ${input.topic}`,
    `Language: ${input.language}`,
    `Length in days: ${input.days}`,
    sourceInstruction,
    "The README overview should contain a concise course summary, who it is for, how to use the course, and a day-by-day outline table.",
    "The day files should be cohesive and practical rather than generic filler.",
    "",
    "Return ONLY a valid JSON object with this structure (no markdown, no extra text):",
    JSON.stringify({
      courseTitle: "string",
      courseSummary: "string",
      overviewMarkdown: "string",
      days: [
        {
          dayNumber: "number",
          title: "string",
          markdown: "string",
        },
      ],
    }),
  ].join("\n\n");

  let parsed;

  const apiProvider = input.provider || API_PROVIDER;
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);

  if (apiProvider === "gemini" && hasGemini) {
    console.log("[DEBUG] Using Gemini, model:", GEMINI_MODEL);
    const model = gemini.getGenerativeModel({ model: GEMINI_MODEL });
    const result = await model.generateContent(userPrompt);
    const text = result.response.text();
    console.log("[DEBUG] Gemini response length:", text.length);
    
    // Extract JSON from response (Gemini might wrap it)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // Return the raw text for debugging
      throw createError(502, "Gemini did not return valid JSON. Response: " + text.substring(0, 200));
    }
    
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (e) {
      throw createError(502, "Failed to parse Gemini response as JSON.");
    }
  } else if (openai) {
    // Use OpenAI chat completion and parse JSON manually
    console.log("[DEBUG] Using OpenAI, model:", OPENAI_MODEL);
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    });

    const text = response.choices[0]?.message?.content || "";
    console.log("[DEBUG] OpenAI raw response:", text.substring(0, 500));
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw createError(502, "OpenAI did not return valid JSON.");
    }

    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (e) {
      throw createError(502, "Failed to parse OpenAI response as JSON.");
    }
  } else {
    throw createError(400, "No API provider configured.");
  }

  if (!parsed) {
    throw createError(502, "API returned an empty structured response.");
  }

  const normalizedDays = normalizeGeneratedDays(parsed.days, input.days);

  return {
    courseTitle: parsed.courseTitle,
    courseSummary: parsed.courseSummary,
    overviewMarkdown: parsed.overviewMarkdown,
    days: normalizedDays,
  };
}

function normalizeGeneratedDays(days, expectedCount) {
  const sorted = [...days].sort((left, right) => left.dayNumber - right.dayNumber);
  const trimmed = sorted.slice(0, expectedCount);

  if (trimmed.length !== expectedCount) {
    throw createError(
      502,
      `OpenAI returned ${trimmed.length} day files, but ${expectedCount} were requested.`
    );
  }

  return trimmed.map((day, index) => ({
    dayNumber: index + 1,
    title: day.title.trim(),
    markdown: day.markdown.trim(),
  }));
}

async function persistCourse(course, input) {
  const timestamp = new Date();
  const timestampSlug = [
    timestamp.getFullYear(),
    String(timestamp.getMonth() + 1).padStart(2, "0"),
    String(timestamp.getDate()).padStart(2, "0"),
    "-",
    String(timestamp.getHours()).padStart(2, "0"),
    String(timestamp.getMinutes()).padStart(2, "0"),
    String(timestamp.getSeconds()).padStart(2, "0"),
  ].join("");
  const baseSlug = slugify(course.courseTitle || input.topic).slice(0, 48) || "course";
  const courseId = `${timestampSlug}-${baseSlug}`;
  const courseDir = path.join(GENERATED_ROOT, courseId);

  await fs.mkdir(courseDir, { recursive: true });

  const files = [
    {
      fileName: "README.md",
      content: course.overviewMarkdown.trim() + "\n",
    },
    ...course.days.map((day) => ({
      fileName: `Day${String(day.dayNumber).padStart(2, "0")}_${slugify(day.title).slice(0, 50) || `day-${day.dayNumber}`}.md`,
      content: day.markdown.trim() + "\n",
    })),
  ];

  await Promise.all(
    files.map((file) =>
      fs.writeFile(path.join(courseDir, file.fileName), file.content, "utf8")
    )
  );

  const meta = {
    id: courseId,
    courseTitle: course.courseTitle,
    courseSummary: course.courseSummary,
    topic: input.topic,
    language: input.language,
    days: input.days,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    files: files.map((file) => file.fileName),
  };

  await fs.writeFile(
    path.join(courseDir, ".course.json"),
    JSON.stringify(meta, null, 2),
    "utf8"
  );

  return { id: courseId, meta };
}

async function serveStaticAsset(pathname, response) {
  const staticFileMap = {
    "/": { filePath: path.join(__dirname, "index.html"), contentType: "text/html; charset=utf-8" },
    "/index.html": {
      filePath: path.join(__dirname, "index.html"),
      contentType: "text/html; charset=utf-8",
    },
    "/styles.css": {
      filePath: path.join(__dirname, "styles.css"),
      contentType: "text/css; charset=utf-8",
    },
    "/app.js": {
      filePath: path.join(__dirname, "app.js"),
      contentType: "text/javascript; charset=utf-8",
    },
    "/vendor/github-markdown-dark.css": {
      filePath: path.join(
        __dirname,
        "node_modules",
        "github-markdown-css",
        "github-markdown-dark.css"
      ),
      contentType: "text/css; charset=utf-8",
    },
  };

  const asset = staticFileMap[pathname];
  if (!asset) {
    return sendJson(response, 404, { error: "Static asset not found." });
  }

  try {
    const file = await fs.readFile(asset.filePath);
    response.writeHead(200, { "Content-Type": asset.contentType });
    response.end(file);
  } catch (error) {
    console.error(error);
    sendJson(response, 404, { error: "Static asset not found." });
  }
}

function safeCourseDirectory(courseId) {
  const safeId = path.basename(String(courseId || "").trim());
  if (!safeId || safeId.includes("..")) {
    throw createError(400, "Invalid course id.");
  }

  for (const root of [GENERATED_ROOT, HARDCODED_ROOT]) {
    const resolved = path.resolve(root, safeId);
    if (resolved.startsWith(path.resolve(root))) {
      return resolved;
    }
  }

  throw createError(400, "Invalid course path.");
}

function safeMarkdownFileName(fileName) {
  const safeName = path.basename(String(fileName || "").trim());
  if (!safeName.toLowerCase().endsWith(".md")) {
    throw createError(400, "Only Markdown files are supported.");
  }

  return safeName;
}

function sortMarkdownFiles(left, right) {
  if (left === "README.md") return -1;
  if (right === "README.md") return 1;
  return left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" });
}

function humanizeFileName(fileName) {
  if (fileName === "README.md") {
    return "Course overview";
  }

  return fileName
    .replace(/\.md$/i, "")
    .replace(/^Day\d+_/, "")
    .replaceAll("_", " ");
}

function unslugify(value) {
  return String(value || "")
    .replace(/^\d{8}-\d{6}-/, "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function parseJsonBody(request) {
  const chunks = [];
  let total = 0;

  for await (const chunk of request) {
    total += chunk.length;

    if (total > MAX_BODY_SIZE) {
      throw createError(413, "Request body is too large.");
    }

    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");

  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    throw createError(400, "Request body must be valid JSON.");
  }
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

function createError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}
