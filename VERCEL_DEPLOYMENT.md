# Deployment Guide - Vercel

This guide explains how to deploy the Course Generator to Vercel.

## Prerequisites

- [Vercel account](https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)
- At least one of:
  - OpenAI API key (from https://platform.openai.com)
  - Google Gemini API key (from https://aistudio.google.com)

## Setup Steps

### 1. Prepare Your Repository

Make sure your repository contains all files including `vercel.json`:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

### 2. Deploy to Vercel

**Option A: Using Vercel CLI**

```bash
npm install -g vercel
vercel --prod
```

**Option B: Using Vercel Dashboard**

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Select your repository
4. Vercel will auto-detect the Node.js project
5. Click "Deploy"

### 3. Configure Environment Variables

After deployment starts (or in Project Settings):

1. Go to your Vercel project dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add one or both of the following:

**For OpenAI:**
```
OPENAI_API_KEY = sk-...your-api-key...
OPENAI_MODEL = gpt-4-mini
API_PROVIDER = openai
```

**For Gemini:**
```
GEMINI_API_KEY = ...your-api-key...
GEMINI_MODEL = gemini-2.0-flash
API_PROVIDER = gemini
```

4. Click "Save"
5. Vercel will automatically redeploy with the new environment variables

### 4. Access Your App

Your app will be available at `https://your-project-name.vercel.app`

## Features

- **Multi-API Support**: Use OpenAI, Gemini, or both
- **Serverless**: No server management needed
- **Auto-Scaling**: Handles traffic spikes automatically
- **Free Tier**: Vercel offers a free tier for personal projects
- **Custom Domain**: Connect your own domain in Project Settings

## API Provider Selection

### OpenAI
- Model: `gpt-4-mini` (default)
- Fast and reliable
- Costs per-token

### Gemini  
- Model: `gemini-2.0-flash` (default)
- Very fast
- Free tier available with rate limits
- Set `API_PROVIDER=gemini` to use

## Environment Variables Explained

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | If using OpenAI |
| `OPENAI_MODEL` | OpenAI model to use | No, defaults to gpt-4-mini |
| `GEMINI_API_KEY` | Your Google Gemini API key | If using Gemini |
| `GEMINI_MODEL` | Gemini model to use | No, defaults to gemini-2.0-flash |
| `API_PROVIDER` | Which API to use (`openai` or `gemini`) | No, defaults to openai |
| `PORT` | Server port | No, defaults to 3000 |

## File Storage on Vercel

Generated courses are stored in `/tmp` (Vercel's temporary filesystem). This means:
- Courses are **not persisted** between deployments
- Courses **are available** during the same deployment
- For persistent storage, consider adding a database

To add database support:
1. Use a service like Firebase, MongoDB Atlas, or Supabase
2. Modify `server.js` to save/load from your database instead of the filesystem

## Troubleshooting

### API Key Not Working
- Verify the API key is correct
- Check that the key has appropriate permissions
- Ensure the environment variable name is exact (case-sensitive)
- Redeploy after adding environment variables

### Generation Fails
- Check that you have at least one API key configured
- Verify the API provider is correct in `API_PROVIDER`
- Check Vercel logs in the Dashboard for detailed errors

### Courses Not Showing
- Generated courses are temporary on Vercel
- Refresh the page to reload the course library
- Generate a new course to test the system

## Local Development

To test locally with the same environment as Vercel:

1. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

2. Add your API keys:
```
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
```

3. Run locally:
```bash
npm install
npm run dev
```

4. Visit `http://localhost:3000`

## Cost Estimation

### OpenAI Pricing
- ~$0.15 per 5-day course (with gpt-4-mini)
- Varies by topic complexity

### Gemini Pricing
- Free tier: Up to 1500 calls/day
- Paid: ~$0.075 per 1M input tokens

### Vercel Pricing
- Free: Up to 100 Serverless Function Executions/month (ample for hobby use)
- Pro: $20/month for unlimited

## Support

- [Vercel Docs](https://vercel.com/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Google Gemini Docs](https://ai.google.dev/tutorials/python_quickstart)
