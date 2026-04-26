const state = {
  config: null,
  library: [],
  selectedCourseId: null,
  selectedFileName: null,
  currentDocument: null,
  expandedCourses: new Set(),
  viewMode: "preview",
  isGenerating: false,
  siteLanguage: "et",
  aiProvider: "gemini",
};

const elements = {
  form: document.querySelector("#generate-form"),
  topicSelect: document.querySelector("#topic-select"),
  customTopicField: document.querySelector("#custom-topic-field"),
  topicCustom: document.querySelector("#topic-custom"),
  language: document.querySelector("#language"),
  days: document.querySelector("#days"),
  aiToggle: document.querySelector("#ai-toggle"),
  libraryTree: document.querySelector("#library-tree"),
  preview: document.querySelector("#markdown-preview"),
  raw: document.querySelector("#markdown-raw"),
  emptyState: document.querySelector("#empty-state"),
  viewerPath: document.querySelector("#viewer-path"),
  apiStatusChip: document.querySelector("#api-status-chip"),
  downloadButton: document.querySelector("#download-file-button"),
  generateButton: document.querySelector("#generate-button"),
  toast: document.querySelector("#toast"),
  siteLanguageButtons: document.querySelectorAll("[data-site-lang]"),
};

const TRANSLATIONS = {
  en: {
    generateButton: "Generate",
    generatingButton: "Generating...",
    topicLabel: "Topic",
    languageLabel: "Language",
    daysLabel: "Days",
    apiReady: "Ready",
    apiMissing: "Not ready",
    topicMissing: "Select topic",
    generated: "Course generated",
    generationFailed: "Error",
    noCourses: "No courses",
    emptyTitle: "Select course",
    emptyText: "Choose from sidebar or generate new",
  },
  et: {
    generateButton: "Genereeri",
    generatingButton: "Genereerin...",
    topicLabel: "Teema",
    languageLabel: "Keel",
    daysLabel: "Päevad",
    apiReady: "Valmis",
    apiMissing: "Pole valmis",
    topicMissing: "Vali teema",
    generated: "Kursus loodud",
    generationFailed: "Viga",
    noCourses: "Kursusi pole",
    emptyTitle: "Vali kursus",
    emptyText: "Vali vasakult või loo uus",
  },
};

function t(key) {
  return TRANSLATIONS[state.siteLanguage]?.[key] || TRANSLATIONS.en[key] || key;
}

boot();

async function boot() {
  bindEvents();
  await refreshConfigAndLibrary();
  renderLibraryTree();
}

function bindEvents() {
  elements.form.addEventListener("submit", handleGenerate);
  elements.topicSelect.addEventListener("change", handleTopicSelectionChange);
  elements.aiToggle.addEventListener("click", handleAiToggle);

  document.querySelectorAll("[data-site-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.siteLanguage = btn.dataset.siteLang;
      applySiteLanguage();
    });
  });

  document.querySelectorAll("[data-view-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.viewMode = btn.dataset.viewMode;
      applyViewMode();
    });
  });

  elements.downloadButton.addEventListener("click", downloadCurrentFile);

  document.addEventListener("click", async (event) => {
    const fileBtn = event.target.closest("[data-open-file]");
    if (fileBtn) {
      await openDocument(fileBtn.dataset.courseId, fileBtn.dataset.fileName);
    }

    const folderBtn = event.target.closest("[data-toggle-course]");
    if (folderBtn) {
      toggleFolder(folderBtn.dataset.courseId);
    }
  });
}

async function refreshConfigAndLibrary() {
  try {
    const [config, library] = await Promise.all([
      fetchJson("/api/config"),
      fetchJson("/api/library"),
    ]);
    state.config = config;
    state.library = library.courses;
    renderConfig();
    renderLibraryTree();
  } catch (e) {
    console.error(e);
  }
}

async function handleGenerate(e) {
  e.preventDefault();
  if (state.isGenerating) return;

  const payload = {
    topic: getSelectedTopic(),
    language: elements.language.value,
    days: Number(elements.days.value),
    provider: state.aiProvider,
  };

  if (!payload.topic) {
    showToast(t("topicMissing"));
    return;
  }

  setGenerating(true);
  try {
    const res = await fetchJson("/api/generate-course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    state.library = res.library.courses;
    renderLibraryTree();
    await openDocument(res.course.id, res.initialFile);
    showToast(t("generated"));
  } catch (e) {
    showToast(e.message || t("generationFailed"));
  } finally {
    setGenerating(false);
  }
}

function getSelectedTopic() {
  if (elements.topicSelect.value === "custom") {
    return elements.topicCustom.value.trim();
  }
  return elements.topicSelect.value;
}

function handleTopicSelectionChange() {
  const isCustom = elements.topicSelect.value === "custom";
  elements.customTopicField.classList.toggle("hidden", !isCustom);
}

function handleAiToggle() {
  const providers = state.config?.providers || {};
  if (state.aiProvider === "gemini" && providers.openai?.configured) {
    state.aiProvider = "openai";
  } else {
    state.aiProvider = "gemini";
  }
  elements.aiToggle.textContent = state.aiProvider.toUpperCase();
}

async function openDocument(courseId, fileName) {
  try {
    const doc = await fetchJson(`/api/file?course=${encodeURIComponent(courseId)}&file=${encodeURIComponent(fileName)}`);
    state.selectedCourseId = courseId;
    state.selectedFileName = fileName;
    state.currentDocument = doc;
    renderDocument();
    renderLibraryTree();
  } catch (e) {
    showToast("Could not open file");
  }
}

function toggleFolder(courseId) {
  if (state.expandedCourses.has(courseId)) {
    state.expandedCourses.delete(courseId);
  } else {
    state.expandedCourses.add(courseId);
  }
  renderLibraryTree();
}

function renderConfig() {
  const providers = state.config?.providers || {};
  const hasOpenAI = providers.openai?.configured;
  const hasGemini = providers.gemini?.configured;

  const dot = document.getElementById("status-dot");
  dot.classList.toggle("error", !hasOpenAI && !hasGemini);

  elements.apiStatusChip.textContent = hasOpenAI || hasGemini ? t("apiReady") : t("apiMissing");
  elements.aiToggle.textContent = state.aiProvider.toUpperCase();
  elements.aiToggle.disabled = !hasOpenAI && !hasGemini;
}

function renderLibraryTree() {
  if (!state.library.length) {
    elements.libraryTree.innerHTML = `<div class="file-button">${t("noCourses")}</div>`;
    return;
  }

  const langGroups = state.library.reduce((acc, course) => {
    const lang = course.language?.toLowerCase() || "other";
    if (!acc[lang]) acc[lang] = [];
    acc[lang].push(course);
    return acc;
  }, {});

  elements.libraryTree.innerHTML = Object.entries(langGroups)
    .map(([lang, courses]) => {
      const coursesHtml = courses.map((course) => {
        const isExpanded = state.expandedCourses.has(course.id);
        const courseFiles = course.files || [];
        const isActive = course.id === state.selectedCourseId;

        return `
          <div class="explorer-folder">
            <button class="folder-button" data-toggle-course="${course.id}">
              <span class="folder-icon">${isExpanded ? "📂" : "📁"}</span>
              <span>${course.title}</span>
              <span class="folder-chevron">${isExpanded ? "▾" : "▸"}</span>
            </button>
            ${isExpanded ? `
              <div class="explorer-files">
                ${courseFiles.map((file) => `
                  <button class="file-button ${file.name === state.selectedFileName && course.id === state.selectedCourseId ? "active" : ""}"
                    data-open-file
                    data-course-id="${course.id}"
                    data-file-name="${file.name}">
                    <span class="file-icon">📄</span>
                    <span class="file-name">${file.label || file.name}</span>
                  </button>
                `).join("")}
              </div>
            ` : ""}
          </div>
        `;
      }).join("");

      return `
        <div class="explorer-section">
          <div class="explorer-header">${lang === "eesti" ? "🇪🇪 Eesti" : lang === "english" ? "🇬🇧 English" : "📁 Other"}</div>
          ${coursesHtml}
        </div>
      `;
    })
    .join("");
}

function renderDocument() {
  const doc = state.currentDocument;
  if (!doc) {
    elements.emptyState.classList.remove("hidden");
    elements.preview.classList.add("hidden");
    elements.raw.classList.add("hidden");
    return;
  }

  elements.emptyState.classList.add("hidden");
  elements.viewerPath.textContent = `${doc.courseId}/${doc.fileName}`;

  if (state.viewMode === "preview") {
    elements.preview.innerHTML = doc.html;
    elements.preview.classList.remove("hidden");
    elements.raw.classList.add("hidden");
  } else {
    elements.raw.textContent = doc.markdown;
    elements.raw.classList.remove("hidden");
    elements.preview.classList.add("hidden");
  }
  elements.downloadButton.disabled = false;
}

function applyViewMode() {
  document.querySelectorAll("[data-view-mode]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.viewMode === state.viewMode);
  });
  renderDocument();
}

function applySiteLanguage() {
  document.querySelectorAll("[data-site-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.siteLang === state.siteLanguage);
  });
}

function setGenerating(value) {
  state.isGenerating = value;
  elements.generateButton.disabled = value;
  elements.generateButton.textContent = value ? t("generatingButton") : t("generateButton");
}

function downloadCurrentFile() {
  if (!state.currentDocument) return;
  const blob = new Blob([state.currentDocument.markdown], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = state.currentDocument.fileName;
  a.click();
}

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error((await res.json())?.error || "Error");
  return res.json();
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  setTimeout(() => elements.toast.classList.remove("visible"), 2500);
}