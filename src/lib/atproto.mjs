// AT-URI helpers for standard.site records (site.standard.publication /
// site.standard.document). ESM because @atcute/tid is ESM-only.
//
// Document record keys are derived deterministically from each post's
// publish date (same TID-from-timestamp approach used by the atapult and
// sequoia-cli publishers), so both the publish script and the Next.js build
// compute the same at:// URI for a post without querying the PDS or storing
// any extra state per post.
import { create as createTid } from '@atcute/tid';

export const PUBLICATION_RKEY = 'self';

export function documentRkey(dateString) {
  return createTid(new Date(dateString).getTime(), 512);
}

export function publicationUri(did) {
  return `at://${did}/site.standard.publication/${PUBLICATION_RKEY}`;
}

export function documentUri(did, dateString) {
  return `at://${did}/site.standard.document/${documentRkey(dateString)}`;
}
