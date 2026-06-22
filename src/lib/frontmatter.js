// Shared frontmatter parsing for content/posts/*.md.
// Plain JS (not TS) so both the Next.js app (src/lib/posts.ts) and the
// CLI scripts (scripts/*.js, run by plain `node`) can require/import it
// without a build step, keeping the parsing rules in one place.
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Accept unquoted strings in frontmatter (e.g. titles with a colon).
const matterOptions = {
  engines: {
    yaml: {
      parse: (s) => require('js-yaml').load(s),
    },
  },
};

function listPostFiles() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((fileName) => fileName.endsWith('.md'));
}

function readPost(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  try {
    const { data, content } = matter(fileContents, matterOptions);
    const date = data.date ? new Date(data.date).toISOString().split('T')[0] : '1970-01-01';
    return { id, title: data.title || 'Untitled', date, content };
  } catch (error) {
    console.error(`Error parsing frontmatter in ${id}.md:`, error);
    return { id, title: 'Error in frontmatter', date: '1970-01-01', content: '' };
  }
}

function readAllPosts() {
  return listPostFiles()
    .map((fileName) => readPost(fileName.replace(/\.md$/, '')))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

module.exports = { postsDirectory, listPostFiles, readPost, readAllPosts };
