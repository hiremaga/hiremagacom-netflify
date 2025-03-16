import fs from 'fs';
import RSS from 'rss';
import path from 'path';
import matter from 'gray-matter';

// Define the function to generate the RSS feed
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

  // Get posts data directly from file system to avoid import issues
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  
  // If directory doesn't exist, return early
  if (!fs.existsSync(postsDirectory)) {
    console.log('Posts directory not found, creating empty RSS feed');
  } else {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .forEach((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');
        
        try {
          // Read markdown file as string
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          
          // Use gray-matter to parse the post metadata section
          const matterResult = matter(fileContents);
          
          // Extract data and provide defaults if missing
          const title = matterResult.data.title || 'Untitled';
          const date = matterResult.data.date 
            ? new Date(matterResult.data.date).toISOString() 
            : new Date('1970-01-01').toISOString();
          
          // Add the post to the feed
          feed.item({
            title: title,
            description: matterResult.content.slice(0, 300) + '...',
            url: `${site_url}/posts/${id}`,
            date: date,
          });
        } catch (error) {
          console.error(`Error processing ${fileName} for RSS feed:`, error);
        }
      });
  }

  // Write to both public and out directories to ensure it's available in dev and production
  fs.mkdirSync('./public', { recursive: true });
  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
  
  // Also write to the 'out' directory if it exists (for NextJS export)
  if (fs.existsSync('./out')) {
    fs.writeFileSync('./out/rss.xml', feed.xml({ indent: true }));
  }
  
  console.log('RSS feed generated successfully');
};