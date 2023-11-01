const fs = require('fs');
const path = require('path');

const diretorio = '../';

const respostas = {};

fs.readdir(diretorio, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach(file => {
    if ([
      '20231020_154035.jpg.txt',
      '20231020_154410.jpg.txt',
      '20231020_154929.jpg.txt',
      '20231020_155012.jpg.txt',
      '20231020_155902.jpg.txt',
      '20231020_160129.jpg.txt',
      '20231020_154258.jpg.txt',
      '20231020_155128.jpg.txt',
      '20231020_155607.jpg.txt',
      '20231020_155615.jpg.txt',
      '20231020_155710.jpg.txt',
      '20231020_155940.jpg.txt'
    ].includes(file)) {
      return; // Ignora os arquivos listados
    }

    const filePath = path.join(diretorio, file);

    const stats = fs.statSync(filePath);

    if (stats.isDirectory() || !file.endsWith('.txt')) {
      return; // Ignora diretórios e arquivos que não sejam .txt
    }

    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const matches = data.match(/(\d\.\d+)\(X\)/g);

      if (matches) {
        matches.forEach(match => {
          if (!respostas[match]) {
            respostas[match] = 0;
          }
          respostas[match]++;
        });
      }
    } catch (error) {
      console.error(`Erro ao processar o arquivo ${file}: ${error.message}`);
    }
  });

  // Ao final da leitura dos arquivos
  // Agora temos as contagens nas variáveis respostas

  // Exibir os resultados
  for (const resposta in respostas) {
    console.log(`Alternativa "${resposta}" foi marcada ${respostas[resposta]} vezes.`);
  }
});
