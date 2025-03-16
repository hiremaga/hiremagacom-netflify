# Abhi Hiremagalur's Blog

This is the personal blog for Abhi Hiremagalur, deployed at hiremaga.com via Netlify.

## Features

- Static site generated using Next.js
- Content written in Markdown
- Minimalist design with Tailwind CSS
- Fast page loads
- Easy to maintain and update

## Development

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content Management

All blog posts are stored as Markdown files in the `content/posts` directory. To add a new post:

1. Create a new `.md` file in the `content/posts` directory
2. Add frontmatter with `title` and `date`:

```md
---
title: 'Your Post Title'
date: 'YYYY-MM-DD'
---

Your content here...
```

3. Write your post content using Markdown

## Deployment

The site is set up to deploy automatically to Netlify. When you push changes to the main branch, Netlify will automatically build and deploy the updated site.

To manually deploy:

1. Push your changes to GitHub
2. Netlify will automatically detect the changes and deploy the site
3. Check the deployment status on your Netlify dashboard

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Markdown (processed with remark)
- Netlify for hosting and deployment