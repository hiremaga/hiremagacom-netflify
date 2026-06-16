import Link from 'next/link';
import NewBadge from './NewBadge';
import PostDate from './PostDate';

export type PostMeta = { id: string; title: string; date: string };

/**
 * The "All writing" list. Rows bleed 14px into the gutter (negative margin +
 * matching padding) so titles align to the column while hover rounding gets
 * breathing room. Posts arrive newest-first; only the first — the single
 * freshest — wears the New marker.
 */
export default function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="-mx-3.5 list-none p-0">
      {posts.map((post, index) => (
        <li key={post.id}>
          <Link
            href={`/posts/${post.id}`}
            className="flex items-center justify-between gap-7 rounded-[10px] border-t border-mist px-3.5 py-4 no-underline transition-colors hover:bg-row-hover"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="font-serif text-list-title font-medium text-ink">{post.title}</span>
              {index === 0 && <NewBadge />}
            </span>
            <PostDate
              dateString={post.date}
              className="whitespace-nowrap font-sans text-meta text-far"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
