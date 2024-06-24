const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

const fontPath = path.join(__dirname, 'NotoSansCJKjp-Regular.ttf');
const fontData = fs.readFileSync(fontPath);
const base64Font = fontData.toString('base64');

console.log(base64Font);
