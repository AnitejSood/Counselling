# Arti Sood - Career Counselling & Education Guidance Platform

A modern, responsive Career Counselling and Education Guidance web application built for independent counsellor **Arti Sood**, featuring a 3-part Psychometric Assessment Suite (RIASEC, Big Five, Work Values), Student Portal, Counsellor CRM, and Education Journey Tracker.

---

## 🚀 How to Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Arti Sood platform"
   git remote add origin https://github.com/your-username/counselling-platform.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New Project"** -> **"Import Git Repository"**.
   - Select your GitHub repository (`counselling-platform`).

3. **Configure Project Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy**:
   - Click **"Deploy"**. Vercel will automatically build and publish your app with a live URL (e.g., `https://counselling-platform.vercel.app`).
   - SPA routing is handled by [vercel.json](./vercel.json) to prevent 404s on page refresh.

---

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Run deploy command from root folder:
   ```bash
   vercel
   ```

3. To deploy to production:
   ```bash
   vercel --prod
   ```

---

## 🛠️ Local Development Setup

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build
```
