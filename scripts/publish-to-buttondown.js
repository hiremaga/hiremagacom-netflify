#!/usr/bin/env node

// This script publishes the latest post to ButtonDown
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const fetch = require('node-fetch');

// Check for the ButtonDown API key
const apiKey = process.env.BUTTONDOWN_API_KEY;
if (!apiKey) {
  console.error('Error: BUTTONDOWN_API_KEY environment variable not set');
  console.error('Please set it by running:');
  console.error('export BUTTONDOWN_API_KEY=your_api_key_here');
  process.exit(1);
}

async function publishLatestPost() {
  // Get posts data directly from file system
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  
  // If directory doesn't exist, exit early
  if (!fs.existsSync(postsDirectory)) {
    console.error('Error: Posts directory not found');
    process.exit(1);
  }
  
  // Check if a specific post ID was provided
  const postId = process.argv[2]; // Get the post ID from command line argument
  let targetFile;
  
  if (postId) {
    // If a specific post ID was provided, use that
    targetFile = `${postId}.md`;
    if (!fs.existsSync(path.join(postsDirectory, targetFile))) {
      console.error(`Error: Post with ID '${postId}' not found`);
      process.exit(1);
    }
  } else {
    // Otherwise, get the most recent post
    const fileNames = fs.readdirSync(postsDirectory)
      .filter(fileName => fileName.endsWith('.md'));
      
    if (fileNames.length === 0) {
      console.error('Error: No markdown posts found');
      process.exit(1);
    }
    
    // Get file stats to find the most recently modified file
    const fileStats = fileNames.map(fileName => ({
      name: fileName,
      mtime: fs.statSync(path.join(postsDirectory, fileName)).mtime
    }));
    
    // Sort by modified time, most recent first
    fileStats.sort((a, b) => b.mtime - a.mtime);
    
    // Get the most recently modified file
    targetFile = fileStats[0].name;
  }
  
  try {
    // Read the post content
    const fullPath = path.join(postsDirectory, targetFile);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Parse the frontmatter
    const matterResult = matter(fileContents);
    
    // Extract data from frontmatter
    const title = matterResult.data.title || 'Untitled';
    const date = matterResult.data.date 
      ? new Date(matterResult.data.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];
    
    // Content is the rest of the file
    const content = matterResult.content;
    
    // Post ID is the filename without extension
    const id = targetFile.replace(/\.md$/, '');
    
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
    const site_url = 'https://hiremaga.com';
    console.log(`Post URL: ${site_url}/posts/${id}`);
    
  } catch (error) {
    console.error('Error publishing to ButtonDown:', error.message);
    process.exit(1);
  }
}

publishLatestPost().catch(console.error);