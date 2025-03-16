# Abhi Hiremagalur's Blog

This is the personal blog for Abhi Hiremagalur, deployed at hiremaga.com via Netlify.

## Features

- Static site generated using Next.js
- Content written in Markdown
- Minimalist design with Tailwind CSS
- Fast page loads
- RSS feed support
- ButtonDown newsletter integration
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

## Newsletter Integration

The blog includes integration with ButtonDown for newsletter publishing. To set it up:

1. Sign up for a [ButtonDown account](https://buttondown.email/)
2. Get your API key from the ButtonDown dashboard
3. Create a `.env` file in the root directory (based on `.env.example`)
4. Add your ButtonDown API key:

```env
BUTTONDOWN_API_KEY=your_api_key_here
```

### Publishing to Newsletter

To publish the most recent post to ButtonDown:

```bash
npm run newsletter
```

To publish a specific post by ID:

```bash
npm run newsletter:post your-post-id
```

The post ID is the filename without the `.md` extension.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Markdown (processed with remark)
- RSS feed generation
- ButtonDown newsletter integration
- Netlify for hosting and deployment