#!/usr/bin/env node

// Publishes site.standard.publication and site.standard.document records
// (see https://standard.site/docs/) for this blog to the author's existing
// atproto/Bluesky account, so atproto clients (Bluesky, Leaflet, etc.) can
// discover and render this site's posts.
//
// Record shapes and the well-known verification file are modelled on the
// (MIT-licensed) atapult and sequoia-cli publishers, cross-checked against
// each other rather than against the lexicon source directly.
import 'dotenv/config';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { CredentialSession, Agent } from '@atproto/api';
import { readAllPosts } from '../src/lib/frontmatter.js';
import { publicationUri, documentRkey, PUBLICATION_RKEY } from '../src/lib/atproto.mjs';

const handle = process.env.ATPROTO_HANDLE;
const password = process.env.ATPROTO_APP_PASSWORD;
const service = process.env.ATPROTO_SERVICE || 'https://bsky.social';

if (!handle || !password) {
  console.error('Error: ATPROTO_HANDLE and ATPROTO_APP_PASSWORD environment variables must be set');
  console.error('Generate an app password at https://bsky.app/settings/app-passwords');
  process.exit(1);
}

const siteConfigPath = fileURLToPath(new URL('../site.config.json', import.meta.url));
const wellKnownPath = fileURLToPath(new URL('../public/.well-known/site.standard.publication', import.meta.url));

function readSiteConfig() {
  return JSON.parse(readFileSync(siteConfigPath, 'utf8'));
}

function writeSiteConfig(siteConfig) {
  writeFileSync(siteConfigPath, JSON.stringify(siteConfig, null, 2) + '\n');
}

async function ensureDid(siteConfig, did) {
  if (siteConfig.atproto.did === did) return;
  siteConfig.atproto.did = did;
  writeSiteConfig(siteConfig);
  console.log(`Recorded DID ${did} in site.config.json — commit this so the build can render <link> tags.`);
}

async function ensureWellKnownFile(did) {
  const expected = publicationUri(did);
  mkdirSync(fileURLToPath(new URL('../public/.well-known/', import.meta.url)), { recursive: true });
  writeFileSync(wellKnownPath, expected);
  console.log(`Wrote ${expected} to public/.well-known/site.standard.publication`);
}

async function createOrUpdatePublication(agent, siteConfig) {
  const record = {
    $type: 'site.standard.publication',
    url: siteConfig.url,
    name: siteConfig.name,
    description: 'Essays on software, leadership, and what I am learning next.',
    preferences: { showInDiscover: true },
  };

  let existing;
  try {
    const res = await agent.com.atproto.repo.getRecord({
      repo: agent.did,
      collection: 'site.standard.publication',
      rkey: PUBLICATION_RKEY,
    });
    existing = res.data.value;
  } catch (error) {
    if (error.error !== 'RecordNotFound') throw error;
  }

  const action = existing ? 'putRecord' : 'createRecord';
  const changed =
    !existing ||
    existing.name !== record.name ||
    existing.description !== record.description ||
    existing.url !== record.url;

  if (!changed) {
    console.log(`Publication ${PUBLICATION_RKEY} already up to date.`);
    return;
  }

  await agent.com.atproto.repo[action]({
    repo: agent.did,
    collection: 'site.standard.publication',
    rkey: PUBLICATION_RKEY,
    record,
  });
  console.log(`Publication ${PUBLICATION_RKEY} ${existing ? 'updated' : 'created'}.`);
}

async function createOrUpdateDocuments(agent, siteConfig, posts) {
  const pubUri = publicationUri(agent.did);

  const existingRes = await agent.com.atproto.repo.listRecords({
    repo: agent.did,
    collection: 'site.standard.document',
    limit: 100,
  });
  const existingByRkey = new Map(
    existingRes.data.records
      .filter((r) => r.value.site === pubUri)
      .map((r) => [r.uri.split('/').pop(), r.value])
  );

  for (const post of posts) {
    const rkey = documentRkey(post.date);
    const description = post.content.trim().slice(0, 300);
    const record = {
      $type: 'site.standard.document',
      site: pubUri,
      title: post.title,
      publishedAt: new Date(post.date).toISOString(),
      path: `/posts/${post.id}`,
      description,
      textContent: post.content,
    };

    const existing = existingByRkey.get(rkey);
    const action = existing ? 'putRecord' : 'createRecord';
    const changed =
      !existing ||
      existing.title !== record.title ||
      existing.description !== record.description ||
      existing.textContent !== record.textContent;

    if (!changed) {
      console.log(`Document ${rkey} (${post.id}) already up to date.`);
      continue;
    }

    await agent.com.atproto.repo[action]({
      repo: agent.did,
      collection: 'site.standard.document',
      rkey,
      record,
    });
    console.log(`Document ${rkey} (${post.id}) ${existing ? 'updated' : 'created'}.`);
  }
}

async function main() {
  const session = new CredentialSession(new URL(service));
  await session.login({ identifier: handle, password });
  const agent = new Agent(session);

  const siteConfig = readSiteConfig();
  await ensureDid(siteConfig, agent.did);
  await ensureWellKnownFile(agent.did);
  await createOrUpdatePublication(agent, siteConfig);
  await createOrUpdateDocuments(agent, siteConfig, readAllPosts());

  console.log('Done.');
}

main().catch((error) => {
  console.error('Error publishing to atproto:', error.message);
  process.exit(1);
});
