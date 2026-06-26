#!/usr/bin/env node

// This script generates an RSS feed for the blog
const fs = require('fs');
const { readAllPosts } = require('../src/lib/frontmatter');
const RSS = require('rss');
const { url: site_url } = require('../site.config.json');

async function generateFeed() {
  const feedOptions = {
    title: 'Abhi Hiremagalur | Blog',
    description: 'Articles and thoughts from Abhi Hiremagalur',
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.png`,
    pubDate: new Date(),
    copyright: `${new Date().getFullYear()} Abhi Hiremagalur`,
  };

  const feed = new RSS(feedOptions);

  readAllPosts().forEach((post) => {
    feed.item({
      title: post.title,
      description: post.content.slice(0, 300) + '...',
      url: `${site_url}/posts/${post.id}`,
      date: new Date(post.date).toISOString(),
    });
  });

  // Write to both public and out directories to ensure it's available in dev and production
  fs.mkdirSync('./public', { recursive: true });
  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));

  // Also write to the 'out' directory if it exists (for NextJS export)
  if (fs.existsSync('./out')) {
    fs.writeFileSync('./out/rss.xml', feed.xml({ indent: true }));
  }

  console.log('RSS feed generated successfully');
}

generateFeed().catch(console.error);
