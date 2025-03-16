import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Configure gray-matter to accept unquoted strings
const matterOptions = {
  engines: {
    yaml: {
      parse: (s: string) => require('js-yaml').load(s),
    }
  }
};

export function getSortedPostsData() {
  // If directory doesn't exist, return empty array to avoid errors during development
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      try {
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents, matterOptions);

        // Extract data and provide defaults if missing
        const title = matterResult.data.title || 'Untitled';
        const date = matterResult.data.date ? new Date(matterResult.data.date).toISOString().split('T')[0] : '1970-01-01';

        // Combine the data with the id
        return {
          id,
          title,
          date
        };
      } catch (e) {
        console.error(`Error parsing frontmatter in ${fileName}:`, e);
        return {
          id,
          title: 'Error in frontmatter',
          date: '1970-01-01',
        };
      }
    });
  
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  // If directory doesn't exist, return empty array to avoid errors during development
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  try {
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents, matterOptions);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Extract data and provide defaults if missing
    const title = matterResult.data.title || 'Untitled';
    const date = matterResult.data.date ? new Date(matterResult.data.date).toISOString().split('T')[0] : '1970-01-01';

    // Combine the data with the id and contentHtml
    return {
      id,
      contentHtml,
      title,
      date
    };
  } catch (e) {
    console.error(`Error parsing frontmatter in ${id}.md:`, e);
    return {
      id,
      contentHtml: `<p>Error loading content: ${e.message}</p>`,
      title: 'Error in frontmatter',
      date: '1970-01-01',
    };
  }
}