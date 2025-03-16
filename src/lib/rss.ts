import fs from 'fs';
import { getSortedPostsData } from './posts';
import RSS from 'rss';

export const generateRssFeed = async () => {
  const site_url = 'https://hiremaga.com';
  
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
  
  const allPosts = getSortedPostsData();
  
  allPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: '', // Could add a description field to your posts if desired
      url: `${site_url}/posts/${post.id}`,
      date: post.date,
    });
  });

  // Write to both public and out directories to ensure it's available in dev and production
  fs.mkdirSync('./public', { recursive: true });
  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
  
  // Also write to the 'out' directory if it exists (for NextJS export)
  if (fs.existsSync('./out')) {
    fs.writeFileSync('./out/rss.xml', feed.xml({ indent: true }));
  }
};