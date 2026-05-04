const data = require('./data/destinations.js');

// Check for duplicate images
const seen = new Set();
const dups = [];
data.forEach((d, i) => { 
  if (seen.has(d.image)) {
    dups.push({ index: i, name: d.name, image: d.image.substring(0, 60) });
  }
  seen.add(d.image); 
});

console.log('Duplicate images found:', dups.length ? dups : 'None!');

// Check categories
const cats = {};
data.forEach(d => { 
  cats[d.category] = (cats[d.category] || 0) + 1; 
});

console.log('\nCategories and counts:');
Object.keys(cats).sort().forEach(c => {
  console.log('  ' + JSON.stringify(c) + ': ' + cats[c]);
});

// Check for "Nature Tours" category
if (!cats['Nature Tours']) {
  console.log('\nWARNING: No destinations in "Nature Tours" category!');
}

console.log('\nTotal destinations:', data.length);
