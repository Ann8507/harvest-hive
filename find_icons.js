const fs = require('fs');

const dts = fs.readFileSync('c:/Users/Dell/Desktop/Antigravity/harvest-hive/node_modules/lucide-react/dist/lucide-react.d.ts', 'utf8');
const regex = /declare const (\w+): react/g;
let matches = [];
let match;
while ((match = regex.exec(dts)) !== null) {
    matches.push(match[1]);
}
console.log(JSON.stringify(matches.filter(m => m.toLowerCase().includes('crop') || m.toLowerCase().includes('leaf') || m.toLowerCase().includes('sprout')), null, 2));
