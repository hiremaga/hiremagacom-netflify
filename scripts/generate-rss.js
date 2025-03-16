// This script is run during the build process to generate the RSS feed
const path = require('path');
const fs = require('fs');

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
});

const { generateRssFeed } = require('../src/lib/rss');

async function generate() {
  // Ensure the out directory exists
  if (fs.existsSync('./out')) {
    // Copy the RSS feed to the out directory after build
    await generateRssFeed();
    console.log('RSS feed generated successfully');
  } else {
    console.log('The "out" directory does not exist yet, RSS feed will be generated in public only');
    await generateRssFeed();
  }
}

generate().catch(console.error);