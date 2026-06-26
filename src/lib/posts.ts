import { remark } from 'remark';
import html from 'remark-html';
import { readAllPosts, readPost } from './frontmatter';

export function getSortedPostsData() {
  return readAllPosts().map(({ id, title, date }) => ({ id, title, date }));
}

export function getAllPostIds() {
  return readAllPosts().map(({ id }) => ({ params: { id } }));
}

export async function getPostData(id: string) {
  const { title, date, content } = readPost(id);
  const processedContent = await remark().use(html).process(content);

  return {
    id,
    contentHtml: processedContent.toString(),
    title,
    date,
  };
}
