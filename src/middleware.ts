import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

// Get list of valid post IDs
const getValidPostIds = () => {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    
    return fs.readdirSync(postsDirectory)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading post IDs:', error);
    return [];
  }
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only run this middleware for paths that are:
  // 1. Not starting with underscore (Next.js internal)
  // 2. Not starting with /api/
  // 3. Not starting with /posts/
  // 4. Not /
  // 5. Not recognized file extensions
  if (
    pathname.startsWith('/_') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/posts/') ||
    pathname === '/' ||
    /\.(jpg|png|gif|svg|ico|css|js|json)$/.test(pathname)
  ) {
    return NextResponse.next();
  }
  
  // Extract potential post ID from the URL pathname (remove leading slash)
  const potentialPostId = pathname.substring(1);
  
  // Check if it's a valid post ID (for static generation, we need to do this differently)
  // For now, we'll use a runtime check by reading files from posts directory
  // In production, we'll handle redirects via Netlify's _redirects file
  if (getValidPostIds().includes(potentialPostId)) {
    // Redirect to new URL structure
    return NextResponse.redirect(new URL(`/posts/${potentialPostId}`, request.url));
  }
  
  // Continue with normal request for non-post paths
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (image files)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
};