const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGE_DIR = path.join(__dirname, '..', 'public', 'images');

// Ensure image directory exists
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(IMAGE_DIR, filename);

    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      return resolve(filepath);
    }

    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        fs.unlink(filepath, () => {});
        return reject(new Error(`Failed to download: ${response.statusCode}`));
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAllImages(items, type = 'destination') {
  const results = [];
  
  for (const item of items) {
    if (!item.image || !item.image.startsWith('http')) {
      results.push({ id: item._id || item.name, status: 'skipped', reason: 'not a remote URL' });
      continue;
    }

    const url = item.image;
    let ext = '.jpg';
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const detectedExt = path.extname(pathname);
      if (detectedExt) ext = detectedExt;
    } catch (e) {
      // Use default extension
    }
    
    const safeName = (item._id || item.name || 'unknown').toString().replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${type}_${safeName}${ext}`;
    
    try {
      const filepath = await downloadImage(url, filename);
      results.push({ id: item._id || item.name, status: 'success', filename, localPath: `/images/${filename}` });
    } catch (err) {
      results.push({ id: item._id || item.name, status: 'error', error: err.message });
    }
  }
  
  return results;
}

module.exports = { downloadImage, downloadAllImages, IMAGE_DIR };
