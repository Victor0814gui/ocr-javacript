const fs = require('fs');
const path = require('path');

const directoryPath = '../';
const ignoredFiles = ['20231020_154035.jpg.txt', '20231020_154410.jpg.txt', '20231020_154929.jpg.txt', '20231020_155012.jpg.txt', '20231020_155902.jpg.txt', '20231020_160129.jpg.txt', '20231020_154258.jpg.txt', '20231020_155128.jpg.txt', '20231020_155607.jpg.txt', '20231020_155615.jpg.txt', '20231020_155710.jpg.txt', '20231020_155940.jpg.txt'];

fs.readdirSync(directoryPath).forEach(file => {
  const filePath = path.join(directoryPath, file);
  const isDirectory = fs.statSync(filePath).isDirectory();
  if (!isDirectory && !ignoredFiles.includes(file)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /\d\.\d/g;
    const matches = content.match(regex);
    if (matches && matches.length === 30) {
      console.log(`O arquivo ${file} contém os números das alternativas integrados.`);
    } else {
      console.log(`O arquivo ${file} não contém os números das alternativas integrados.`);
    }
  }
});
