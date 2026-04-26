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
};

const elements = {
  form: document.querySelector("#generate-form"),
  topicSelect: document.querySelector("#topic-select"),
  customTopicField: document.querySelector("#custom-topic-field"),
  topicCustom: document.querySelector("#topic-custom"),
  language: document.querySelector("#language"),
  days: document.querySelector("#days"),
  provider: document.querySelector("#provider"),
  sourceText: document.querySelector("#sourceText"),
  helperText: document.querySelector("#form-helper-text"),
  libraryTree: document.querySelector("#library-tree"),
  preview: document.querySelector("#markdown-preview"),
  raw: document.querySelector("#markdown-raw"),
  emptyState: document.querySelector("#empty-state"),
  viewerPath: document.querySelector("#viewer-path"),
  viewerMeta: document.querySelector("#viewer-meta"),
  apiStatusChip: document.querySelector("#api-status-chip"),
  modelChip: document.querySelector("#model-chip"),
  downloadButton: document.querySelector("#download-file-button"),
  generateButton: document.querySelector("#generate-button"),
  refreshLibraryButton: document.querySelector("#refresh-library-button"),
  toast: document.querySelector("#toast"),
  siteLanguageButtons: document.querySelectorAll("[data-site-lang]"),
  brandTitle: document.querySelector("#brand-title"),
  brandSubtitle: document.querySelector("#brand-subtitle"),
  generatorTitle: document.querySelector("#generator-title"),
  generatorSubtitle: document.querySelector("#generator-subtitle"),
  topicLabel: document.querySelector("#topic-label"),
  customTopicLabel: document.querySelector("#custom-topic-label"),
  languageLabel: document.querySelector("#language-label"),
  daysLabel: document.querySelector("#days-label"),
  providerLabel: document.querySelector("#provider-label"),
  sourceTextLabel: document.querySelector("#source-text-label"),
  libraryTitle: document.querySelector("#library-title"),
  librarySubtitle: document.querySelector("#library-subtitle"),
  viewerOpenLabel: document.querySelector("#viewer-open-label"),
  emptyTitle: document.querySelector("#empty-title"),
  emptyText: document.querySelector("#empty-text"),
};

const DEMO_TOPICS = [
  "AML fundamentals for fintech analysts",
  "Excel for beginners",
  "Cybersecurity basics",
  "Java backend development",
  "Interview preparation for junior data analyst",
];

const TRANSLATIONS = {
  en: {
    pageTitle: "Course Generator",
    brandTitle: "Course Generator",
    brandSubtitle: "Markdown-first learning workspace",
    generatorTitle: "Generate course",
    generatorSubtitle: "Topic, language, days, and optional source text.",
    topicLabel: "Topic",
    customTopicLabel: "Your topic",
    customTopicPlaceholder: "Write your own topic",
    languageLabel: "Language",
    daysLabel: "Days",
    providerLabel: "Provider",
    sourceTextLabel: "Source text",
    sourceTextPlaceholder:
      "Paste long source material here. This can be many paragraphs or multiple pages.",
    generateButton: "Generate Markdown course",
    generatingButton: "Generating...",
    helperReady: 'Generated files are saved under <code>generated-courses/</code>.',
    helperMissing:
      'Set <code>OPENAI_API_KEY</code> and restart the server before generating.',
    libraryTitle: "Learning files",
    librarySubtitle: 'Folders and Markdown files from <code>generated-courses</code>.',
    refresh: "Refresh",
    viewerOpenLabel: "Open file",
    noFile: "No file selected",
    selectPreview: "Select a Markdown file to preview it.",
    emptyTitle: "No Markdown file selected",
    emptyText:
      "Generate a course or choose a file from the left sidebar. The right side will render the Markdown in a GitHub-like preview.",
    preview: "Preview",
    raw: "Raw",
    download: "Download .md",
    apiReady: "OpenAI API ready",
    apiMissing: "Missing OPENAI_API_KEY",
    serverNotReachable: "Server not reachable",
    model: "Model",
    customTopicOption: "Custom topic...",
    topicMissing: "Please select or enter a topic.",
    formMissing: "Please fill topic, language, and days.",
    libraryRefreshed: "Library refreshed.",
    generated: "Markdown course generated.",
    generationFailed: "Course generation failed.",
    openFailed: "Could not open the Markdown file.",
    opened: "Opened {file}.",
    noCourses: "No generated Markdown folders yet. Create your first course.",
    backendDown:
      "The backend did not respond. Start the local server and refresh.",
    courseOverview: "Course overview",
    filesMeta: "{count} files · {date}",
  },
  et: {
    pageTitle: "Kursusegeneraator",
    brandTitle: "Kursusegeneraator",
    brandSubtitle: "Markdown-põhine õpituba",
    generatorTitle: "Genereeri kursus",
    generatorSubtitle: "Teema, keel, päevade arv ja soovi korral algmaterjal.",
    topicLabel: "Teema",
    customTopicLabel: "Sinu teema",
    customTopicPlaceholder: "Kirjuta oma teema",
    languageLabel: "Keel",
    daysLabel: "Päevad",
    providerLabel: "Pakkujat",
    sourceTextLabel: "Lähte tekst",
    sourceTextPlaceholder:
      "Kleebi siia pikem algmaterjal. See võib olla mitu lõiku või mitu lehekülge.",
    generateButton: "Genereeri Markdown kursus",
    generatingButton: "Genereerin...",
    helperReady: 'Genereeritud failid salvestatakse kausta <code>generated-courses/</code>.',
    helperMissing:
      'Sea <code>OPENAI_API_KEY</code> ja käivita server uuesti enne genereerimist.',
    libraryTitle: "Õpifailid",
    librarySubtitle: 'Kaustad ja Markdown failid kaustast <code>generated-courses</code>.',
    refresh: "Värskenda",
    viewerOpenLabel: "Ava fail",
    noFile: "Faili pole valitud",
    selectPreview: "Vali Markdown fail, et seda eelvaates näha.",
    emptyTitle: "Markdown faili pole valitud",
    emptyText:
      "Genereeri kursus või vali fail vasakult. Paremal kuvatakse GitHubi-laadne Markdown eelvaade.",
    preview: "Eelvaade",
    raw: "Toorvaade",
    download: "Laadi .md alla",
    apiReady: "OpenAI API valmis",
    apiMissing: "OPENAI_API_KEY puudub",
    serverNotReachable: "Server pole kättesaadav",
    model: "Mudel",
    customTopicOption: "Oma teema...",
    topicMissing: "Palun vali või sisesta teema.",
    formMissing: "Palun täida teema, keel ja päevade arv.",
    libraryRefreshed: "Nimekiri värskendatud.",
    generated: "Markdown kursus genereeritud.",
    generationFailed: "Kursuse genereerimine ebaõnnestus.",
    openFailed: "Markdown faili avamine ebaõnnestus.",
    opened: "Avatud: {file}.",
    noCourses: "Ühtegi genereeritud Markdown kausta veel ei ole. Loo esimene kursus.",
    backendDown: "Backend ei vastanud. Käivita kohalik server ja proovi uuesti.",
    courseOverview: "Kursuse ülevaade",
    filesMeta: "{count} faili · {date}",
  },
};

let toastTimer = null;

boot();

async function boot() {
  bindEvents();
  applySiteLanguage();
  await refreshConfigAndLibrary();
}

function bindEvents() {
  elements.form.addEventListener("submit", handleGenerate);
  elements.topicSelect.addEventListener("change", handleTopicSelectionChange);
  elements.refreshLibraryButton.addEventListener("click", async () => {
    await loadLibrary({ preserveSelection: true });
    showToast(t("libraryRefreshed"));
  });
  elements.downloadButton.addEventListener("click", downloadCurrentFile);

  document.addEventListener("click", async (event) => {
    const siteLanguageButton = event.target.closest("[data-site-lang]");
    if (siteLanguageButton) {
      state.siteLanguage = siteLanguageButton.dataset.siteLang;
      applySiteLanguage();
      renderConfig();
      renderLibraryTree();
      renderDocument();
      return;
    }

    const fileButton = event.target.closest("[data-open-file]");
    if (fileButton) {
      await openDocument(fileButton.dataset.courseId, fileButton.dataset.fileName);
      return;
    }

    const folderButton = event.target.closest("[data-toggle-course]");
    if (folderButton) {
      toggleExpanded(folderButton.dataset.courseId);
      renderLibraryTree();
      return;
    }

    const modeButton = event.target.closest("[data-view-mode]");
    if (modeButton) {
      state.viewMode = modeButton.dataset.viewMode;
      updateViewModeButtons();
      renderDocument();
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
    ensureExpandedCourses();

    renderConfig();
    renderLibraryTree();

    if (state.library.length > 0) {
      const preferred = state.library.find((c) => c.id === "excel-for-beginners-et");
      const initialCourse = preferred || state.library[0];
      const initialFile = pickInitialFile(initialCourse);

      if (initialCourse && initialFile) {
        await openDocument(initialCourse.id, initialFile.name, { silent: true });
      } else {
        resetViewer();
      }
    } else {
      resetViewer();
    }
  } catch (error) {
    console.error(error);
    renderConfigError(error);
    showToast("Could not load the workspace.");
  }
}

async function loadLibrary({ preserveSelection = false } = {}) {
  const previousCourseId = preserveSelection ? state.selectedCourseId : null;
  const previousFileName = preserveSelection ? state.selectedFileName : null;
  const library = await fetchJson("/api/library");
  state.library = library.courses;
  ensureExpandedCourses();
  renderLibraryTree();

  if (previousCourseId && previousFileName) {
    const courseStillExists = state.library.find((course) => course.id === previousCourseId);
    const fileStillExists = courseStillExists?.files.find((file) => file.name === previousFileName);

    if (courseStillExists && fileStillExists) {
      await openDocument(previousCourseId, previousFileName, { silent: true });
      return;
    }
  }

  const preferred = state.library.find((c) => c.id === "excel-for-beginners-et");
  const initialCourse = preferred || state.library[0];
  const initialFile = pickInitialFile(initialCourse);

  if (initialCourse && initialFile) {
    await openDocument(initialCourse.id, initialFile.name, { silent: true });
  } else {
    resetViewer();
  }
}

async function handleGenerate(event) {
  event.preventDefault();

  if (state.isGenerating) return;

  const payload = {
    topic: getSelectedTopic(),
    language: elements.language.value.trim(),
    days: Number(elements.days.value),
    sourceText: elements.sourceText.value,
    provider: elements.provider.value.trim() || undefined,
  };

  if (!payload.topic) {
    showToast(t("topicMissing"));
    return;
  }

  if (!payload.language || !Number.isFinite(payload.days)) {
    showToast(t("formMissing"));
    return;
  }

  setGenerating(true);

  try {
    const response = await fetchJson("/api/generate-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    state.library = response.library.courses;
    ensureExpandedCourses(response.course.id);
    renderLibraryTree();
    await openDocument(response.course.id, response.initialFile, { silent: true });
    showToast(t("generated"));
  } catch (error) {
    console.error(error);
    showToast(error.message || t("generationFailed"));
  } finally {
    setGenerating(false);
  }
}

async function openDocument(courseId, fileName, options = {}) {
  if (!courseId || !fileName) return;

  state.selectedCourseId = courseId;
  state.selectedFileName = fileName;
  state.expandedCourses.add(courseId);
  renderLibraryTree();

  try {
    const documentData = await fetchJson(
      `/api/file?course=${encodeURIComponent(courseId)}&file=${encodeURIComponent(fileName)}`
    );

    state.currentDocument = documentData;
    renderDocument();
    renderLibraryTree();

    if (!options.silent) {
      showToast(t("opened", { file: fileName }));
    }
  } catch (error) {
    console.error(error);
    showToast(t("openFailed"));
  }
}

function renderConfig() {
  const configured = Boolean(state.config?.apiConfigured);
  const providers = state.config?.providers || {};
  const activeProvider = state.config?.activeProvider || "unknown";
  
  let statusText = t("apiMissing");
  if (providers.openai?.configured) {
    statusText = "OpenAI ready";
  } else if (providers.gemini?.configured) {
    statusText = "Gemini ready";
  }
  
  if (providers.openai?.configured && providers.gemini?.configured) {
    statusText = `${activeProvider.toUpperCase()} active`;
  }
  
  elements.apiStatusChip.textContent = statusText;
  elements.apiStatusChip.classList.toggle("error", !configured);
  elements.modelChip.textContent = `${t("model")}: ${state.config?.model || "-"}`;
  elements.helperText.innerHTML = configured
    ? t("helperReady")
    : t("helperMissing");
}

function renderConfigError(error) {
  elements.apiStatusChip.textContent = t("serverNotReachable");
  elements.apiStatusChip.classList.add("error");
  elements.modelChip.textContent = `${t("model")}: -`;
  elements.helperText.textContent = error.message || "Could not reach the backend.";
  elements.libraryTree.innerHTML =
    `<div class="skeleton">${escapeHtml(t("backendDown"))}</div>`;
}

function renderLibraryTree() {
  if (!state.library.length) {
    elements.libraryTree.innerHTML =
      `<div class="skeleton">${escapeHtml(t("noCourses"))}</div>`;
    return;
  }

  elements.libraryTree.innerHTML = state.library
    .map((course) => {
      const isExpanded = state.expandedCourses.has(course.id);
      const filesMarkup = isExpanded
        ? `
          <div class="folder-files">
            ${course.files
              .map((file) => {
                const isActive =
                  course.id === state.selectedCourseId && file.name === state.selectedFileName;

                return `
                  <button
                    type="button"
                    class="file-button ${isActive ? "active" : ""}"
                    data-open-file
                    data-course-id="${escapeHtml(course.id)}"
                    data-file-name="${escapeHtml(file.name)}"
                  >
                    <span class="file-icon">•</span>
                    <span>
                      <strong>${escapeHtml(file.name)}</strong>
                      <span>${escapeHtml(file.label)}</span>
                    </span>
                  </button>
                `;
              })
              .join("")}
          </div>
        `
        : "";

      return `
        <section class="course-folder">
          <button
            type="button"
            class="folder-header"
            data-toggle-course
            data-course-id="${escapeHtml(course.id)}"
          >
            <span class="folder-title">
              <strong>${escapeHtml(course.title)}</strong>
              <span>${escapeHtml(
                t("filesMeta", { count: course.files.length, date: formatDate(course.updatedAt) })
              )}</span>
            </span>
            <span class="folder-chevron">${isExpanded ? "▾" : "▸"}</span>
          </button>
          ${filesMarkup}
        </section>
      `;
    })
    .join("");
}

function renderDocument() {
  updateViewModeButtons();

  if (!state.currentDocument) {
    resetViewer();
    return;
  }

  const path = `generated-courses/${state.currentDocument.courseId}/${state.currentDocument.fileName}`;
  elements.viewerPath.textContent = path;
  elements.viewerMeta.textContent = `${state.currentDocument.title} · ${formatDate(
    state.currentDocument.updatedAt
  )}`;
  elements.downloadButton.disabled = false;
  elements.emptyState.classList.add("hidden");

  if (state.viewMode === "preview") {
    elements.preview.innerHTML = state.currentDocument.html;
    elements.preview.classList.remove("hidden");
    elements.raw.classList.add("hidden");
  } else {
    elements.raw.textContent = state.currentDocument.markdown;
    elements.raw.classList.remove("hidden");
    elements.preview.classList.add("hidden");
  }
}

function resetViewer() {
  state.currentDocument = null;
  elements.viewerPath.textContent = t("noFile");
  elements.viewerMeta.textContent = t("selectPreview");
  elements.downloadButton.disabled = true;
  elements.preview.innerHTML = "";
  elements.raw.textContent = "";
  elements.preview.classList.add("hidden");
  elements.raw.classList.add("hidden");
  elements.emptyState.classList.remove("hidden");
}

function updateViewModeButtons() {
  document.querySelectorAll("[data-view-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.viewMode === state.viewMode);
  });
}

function setGenerating(value) {
  state.isGenerating = value;
  elements.generateButton.disabled = value;
  elements.generateButton.textContent = value
    ? t("generatingButton")
    : t("generateButton");
}

function ensureExpandedCourses(preferredCourseId) {
  if (preferredCourseId) {
    state.expandedCourses.add(preferredCourseId);
  }

  if (!state.expandedCourses.size && state.library[0]) {
    state.expandedCourses.add(state.library[0].id);
  }
}

function toggleExpanded(courseId) {
  if (state.expandedCourses.has(courseId)) {
    state.expandedCourses.delete(courseId);
  } else {
    state.expandedCourses.add(courseId);
  }
}

function pickInitialFile(course) {
  if (!course || !course.files?.length) return null;
  return (
    course.files.find((file) => file.name.toLowerCase() === "readme.md") || course.files[0]
  );
}

function getSelectedTopic() {
  if (elements.topicSelect.value === "custom") {
    return elements.topicCustom.value.trim();
  }

  return elements.topicSelect.value.trim();
}

function handleTopicSelectionChange() {
  const isCustom = elements.topicSelect.value === "custom";
  elements.customTopicField.classList.toggle("hidden", !isCustom);

  if (isCustom) {
    elements.topicCustom.required = true;
  } else {
    elements.topicCustom.required = false;
    elements.topicCustom.value = "";
  }
}

function applySiteLanguage() {
  const lang = state.siteLanguage;
  document.documentElement.lang = lang;
  document.title = t("pageTitle");

  elements.brandTitle.textContent = t("brandTitle");
  elements.brandSubtitle.textContent = t("brandSubtitle");
  elements.generatorTitle.textContent = t("generatorTitle");
  elements.generatorSubtitle.textContent = t("generatorSubtitle");
  elements.topicLabel.textContent = t("topicLabel");
  elements.customTopicLabel.textContent = t("customTopicLabel");
  elements.topicCustom.placeholder = t("customTopicPlaceholder");
  elements.languageLabel.textContent = t("languageLabel");
  elements.daysLabel.textContent = t("daysLabel");
  elements.providerLabel.textContent = t("providerLabel");
  elements.sourceTextLabel.textContent = t("sourceTextLabel");
  elements.sourceText.placeholder = t("sourceTextPlaceholder");
  elements.libraryTitle.textContent = t("libraryTitle");
  elements.librarySubtitle.innerHTML = t("librarySubtitle");
  elements.refreshLibraryButton.textContent = t("refresh");
  elements.viewerOpenLabel.textContent = t("viewerOpenLabel");
  elements.emptyTitle.textContent = t("emptyTitle");
  elements.emptyText.textContent = t("emptyText");
  elements.downloadButton.textContent = t("download");

  document.querySelector('[data-view-mode="preview"]').textContent = t("preview");
  document.querySelector('[data-view-mode="raw"]').textContent = t("raw");

  updateTopicOptions();
  updateSiteLanguageButtons();
  setGenerating(state.isGenerating);

  if (!state.currentDocument) {
    resetViewer();
  }
}

function updateTopicOptions() {
  const customSelected = elements.topicSelect.value === "custom";
  const currentValue = customSelected ? "custom" : elements.topicSelect.value;

  elements.topicSelect.innerHTML = [
    ...DEMO_TOPICS.map((topic) => {
      const selected = topic === currentValue ? " selected" : "";
      return `<option value="${escapeHtml(topic)}"${selected}>${escapeHtml(topic)}</option>`;
    }),
    `<option value="custom"${customSelected ? " selected" : ""}>${escapeHtml(
      t("customTopicOption")
    )}</option>`,
  ].join("");

  handleTopicSelectionChange();
}

function updateSiteLanguageButtons() {
  elements.siteLanguageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.siteLang === state.siteLanguage);
  });
}

function t(key, replacements = {}) {
  const dict = TRANSLATIONS[state.siteLanguage] || TRANSLATIONS.en;
  let value = dict[key] || TRANSLATIONS.en[key] || key;

  Object.entries(replacements).forEach(([token, replacement]) => {
    value = value.replace(`{${token}}`, String(replacement));
  });

  return value;
}

function downloadCurrentFile() {
  if (!state.currentDocument) return;

  const blob = new Blob([state.currentDocument.markdown], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = state.currentDocument.fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error || `Request failed with status ${response.status}`);
  }

  return payload;
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 2600);
}
