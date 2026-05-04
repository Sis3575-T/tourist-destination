const fs = require('fs');
const path = require('path');

const filePath = process.argv[2] || 'C:\\Users\\hp\\OneDrive\\New folder (2)\\tourist-destination\\backend\\data\\destinations.js';

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Find all image URLs
const imageRegex = /image:\s*'(https?:\/\/[^']+)'/g;
let match;
const imagePositions = [];

while ((match = imageRegex.exec(content)) !== null) {
  imagePositions.push({
    url: match[1],
    index: match.index,
    length: match[0].length
  });
}

console.log(`Found ${imagePositions.length} image URLs`);

// Find duplicates
const seen = new Set();
const duplicates = [];

imagePositions.forEach((item, idx) => {
  if (seen.has(item.url)) {
    duplicates.push({ ...item, originalIndex: idx });
  } else {
    seen.add(item.url);
  }
});

console.log(`Found ${duplicates.length} duplicate images`);

// Fix duplicates by appending a cache-busting parameter
duplicates.forEach((dup, i) => {
  const oldUrl = dup.url;
  const newUrl = oldUrl + (oldUrl.includes('?') ? '&' : '?') + 'v=' + (i + 1);
  
  // Find the exact position in the content and replace
  const oldStr = `image: '${oldUrl}'`;
  const newStr = `image: '${newUrl}'`;
  
  content = content.replace(oldStr, newStr);
  console.log(`Fixed duplicate: ${oldUrl.substring(0, 50)}... -> ${newUrl.substring(0, 50)}...`);
});

// Write the updated content back
fs.writeFileSync(filePath, content, 'utf8');
console.log('\nFile updated successfully!');
