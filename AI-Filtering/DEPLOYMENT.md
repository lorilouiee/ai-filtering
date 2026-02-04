# Deployment Guide

This project is configured to deploy to both **Vercel** and **GitHub Pages**.

## Vercel Deployment

### Setup Steps:

1. **Connect your repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the Vite configuration

2. **Set Environment Variable**
   - In Vercel project settings → Environment Variables
   - Add: `NPM_TOKEN` = Your GitHub Personal Access Token
   - The token needs `read:packages` permission
   - Select all environments (Production, Preview, Development)

3. **Deploy**
   - Vercel will automatically build and deploy on every push
   - The `vercel.json` file is already configured
   - Build command: `npm run build`
   - Output directory: `dist`

### Notes:
- The `base` path is automatically set to `/` for Vercel deployments
- The `.npmrc` file uses `NPM_TOKEN` to authenticate with GitHub Packages

## GitHub Pages Deployment

### Setup Steps:

1. **Enable GitHub Pages**
   - Go to your repository → Settings → Pages
   - Source: Select "GitHub Actions"

2. **The workflow is already configured**
   - The `.github/workflows/deploy.yml` file is set up
   - It will automatically deploy on pushes to `main` branch

3. **Update Repository Name (if needed)**
   - If your repo name is NOT `AI-filtering`, update `vite.config.ts`:
   - Change `base: '/AI-filtering/'` to match your exact repo name

### Notes:
- The workflow uses `GITHUB_TOKEN` automatically (no setup needed)
- The `base` path is set to `/AI-filtering/` for GitHub Pages
- Make sure your default branch is `main` (or update the workflow)

## Both Platforms

- ✅ `package.json` - Build scripts configured
- ✅ `vite.config.ts` - Base path configured for both platforms
- ✅ `.npmrc` - GitHub Packages authentication configured
- ✅ `.github/workflows/deploy.yml` - GitHub Actions workflow ready
- ✅ `vercel.json` - Vercel configuration ready
