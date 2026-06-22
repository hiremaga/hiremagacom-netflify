#!/usr/bin/env node

// This script publishes the latest post to ButtonDown
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { postsDirectory, listPostFiles, readPost } = require('../src/lib/frontmatter');
const { url: site_url } = require('../site.config.json');

// Check for the ButtonDown API key
const apiKey = process.env.BUTTONDOWN_API_KEY;
if (!apiKey) {
  console.error('Error: BUTTONDOWN_API_KEY environment variable not set');
  console.error('Please set it by running:');
  console.error('export BUTTONDOWN_API_KEY=your_api_key_here');
  process.exit(1);
}

function resolvePostId(requestedId) {
  if (requestedId) {
    if (!fs.existsSync(path.join(postsDirectory, `${requestedId}.md`))) {
      console.error(`Error: Post with ID '${requestedId}' not found`);
      process.exit(1);
    }
    return requestedId;
  }

  // No ID given: fall back to the most recently modified post.
  const fileNames = listPostFiles();
  if (fileNames.length === 0) {
    console.error('Error: No markdown posts found');
    process.exit(1);
  }

  const mostRecent = fileNames
    .map((fileName) => ({
      fileName,
      mtime: fs.statSync(path.join(postsDirectory, fileName)).mtime,
    }))
    .sort((a, b) => b.mtime - a.mtime)[0];

  return mostRecent.fileName.replace(/\.md$/, '');
}

async function publishLatestPost() {
  if (!fs.existsSync(postsDirectory)) {
    console.error('Error: Posts directory not found');
    process.exit(1);
  }

  const id = resolvePostId(process.argv[2]);

  try {
    const { title, content } = readPost(id);

    // Prepare the data for ButtonDown
    const emailData = {
      subject: title,
      body: content,
      email_type: 'public', // or 'private' if you want to send to subscribers only
    };

    // Send to ButtonDown
    console.log(`Publishing "${title}" to ButtonDown...`);

    const response = await fetch('https://api.buttondown.email/v1/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ButtonDown API error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    console.log(`Success! Email "${title}" scheduled with ButtonDown.`);
    console.log(`Email ID: ${result.id}`);

    // Show post URL for easy verification
    console.log(`Post URL: ${site_url}/posts/${id}`);

  } catch (error) {
    console.error('Error publishing to ButtonDown:', error.message);
    process.exit(1);
  }
}

publishLatestPost().catch(console.error);
