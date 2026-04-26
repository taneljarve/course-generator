# Opitee

Opitee is now a Markdown-first learning workspace:

- course content is generated as real `.md` files
- files are saved under `generated-courses/`
- the UI shows a folder tree on the left and a GitHub-like Markdown preview on the right
- generation uses the OpenAI API on the server side

## What changed

The generation form is intentionally simple:

- topic
- language
- length in days
- optional long source text

When a course is generated, the backend creates:

- one course folder inside `generated-courses/`
- one `README.md`
- one `DayXX_*.md` file per learning day

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set your OpenAI API key:

```bash
export OPENAI_API_KEY="your_api_key_here"
```

Optional:

```bash
export OPENAI_MODEL="gpt-4-mini"
export API_PROVIDER="openai"  # or "gemini"
export GEMINI_API_KEY="your_gemini_api_key_here"
```

`gpt-4-mini` is the default fallback model in this project.

3. Start the app:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```

## Notes

- The API key is used only on the server in `server.js`.
- Generated Markdown files stay on disk in this repo.
- The preview uses GitHub-style Markdown CSS plus a custom workspace layout.
