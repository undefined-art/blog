## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000/blog/](http://localhost:3000/blog/) to see your blog.

## 📝 Writing Articles

Create new articles in the `content/articles/` directory:

```mdx
---
title: "Title"
description: "A brief description"
date: "2001-01-01"
tags: ["Tag1", "Tag2"]
image: "/images/cover.jpg" // Place images in the `public/images/` folder
---

Your markdown content here...
```

## 🚀 Deploy to GitHub Pages

### Step 1: Create Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository named `blog` (or any name you prefer)
3. Keep it public for GitHub Pages

### Step 2: Push Code

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/{username}/blog.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository: `https://github.com/{username}/blog`
2. Click **Settings** → **Pages**
3. Under "Build and deployment", select **GitHub Actions**
4. The workflow will auto-deploy on every push!

Your blog will be live at: **https://{username}.github.io/blog/**

---

### Alternative: Root Domain ({username}.github.io)

If you want the blog at the root URL `{username}.github.io`:

1. Name the repository `{username}.github.io`
2. Update `next.config.mjs`:

```javascript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
```

3. Push and the blog will be at `https://{username}.github.io/`

---

Built with ❤️ and ☕ by [undefined-art](https://github.com/undefined-art)
