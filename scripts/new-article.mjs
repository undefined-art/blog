#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const POSTS_DIR = path.join(process.cwd(), 'content/articles');

const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const generateTemplate = (title, description, tags, date) => {
  const tagsArray = tags.length > 0 ? `["${tags.join('", "')}"]` : '[]';

  return `---
title: "${title}"
description: "${description}"
date: "${date}"
tags: ${tagsArray}
---

Write your article content here...

## Introduction

Start with an engaging introduction that hooks the reader.

## Main Content

Develop your main points here.

### Subheading

Add details and examples.

\`\`\`javascript
// Code examples
const example = "Hello, World!";
console.log(example);
\`\`\`

> Add a meaningful quote or callout here.

## Conclusion

Wrap up with key takeaways.

---

Thanks for reading!
`;
};

const createArticle = (title, description = '', tags = []) => {
  const slug = slugify(title);
  const date = formatDate(new Date());
  const filename = `${slug}.mdx`;
  const filepath = path.join(POSTS_DIR, filename);

  if (fs.existsSync(filepath)) {
    console.log(`❌ Article already exists: ${filename}`);
    process.exit(1);
  }

  const template = generateTemplate(title, description, tags, date);

  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  fs.writeFileSync(filepath, template);

  console.log(`\n✅ Article created: content/articles/${filename}`);
  console.log(`📝 Edit the file to add your content\n`);
};

const parseArgs = () => {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    return null;
  }

  const parsed = { title: '', description: '', tags: [] };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-t' || arg === '--title') {
      parsed.title = args[++i] || '';
    } else if (arg === '-d' || arg === '--description') {
      parsed.description = args[++i] || '';
    } else if (arg === '--tags') {
      parsed.tags = (args[++i] || '').split(',').map(t => t.trim()).filter(Boolean);
    } else if (arg === '-h' || arg === '--help') {
      console.log(`
✦ New Article Script

Usage:
  npm run new                           Interactive mode
  npm run new -- -t "Title"             Quick create with title
  npm run new -- -t "Title" -d "Desc"   With description
  npm run new -- -t "Title" --tags "a,b" With tags

Options:
  -t, --title        Article title (required)
  -d, --description  Article description
  --tags             Comma-separated tags
  -h, --help         Show this help
`);
      process.exit(0);
    } else if (!parsed.title) {
      parsed.title = arg;
    }
  }

  return parsed.title ? parsed : null;
};

const interactiveMode = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt) => {
    return new Promise((resolve) => {
      rl.question(prompt, resolve);
    });
  };

  console.log('\n✦ Create New Article\n');

  const title = await question('Title: ');
  if (!title.trim()) {
    console.log('❌ Title is required');
    rl.close();
    process.exit(1);
  }

  const description = await question('Description: ');
  const tagsInput = await question('Tags (comma-separated): ');
  const tags = tagsInput
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  rl.close();

  createArticle(title, description, tags);
};

const main = async () => {
  const args = parseArgs();

  if (args) {
    if (!args.title) {
      console.log('❌ Title is required. Use -t "Your Title"');
      process.exit(1);
    }
    createArticle(args.title, args.description, args.tags);
  } else {
    await interactiveMode();
  }
};

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
