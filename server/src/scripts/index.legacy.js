const fs = require('fs');
const path = require('path');

const respostas = {};
let totalHomens = 0;
let totalMulheres = 0;

const diretorio = '../';

fs.readdir(diretorio, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach(file => {
    if (file.match(/^20231020_154035\.jpg\.txt$|^20231020_154410\.jpg\.txt$|^20231020_154929\.jpg\.txt$|^20231020_155012\.jpg\.txt$|^20231020_155902\.jpg\.txt$|^20231020_160129\.jpg\.txt$|^20231020_154258\.jpg\.txt$|^20231020_155128\.jpg\.txt$|^20231020_155607\.jpg\.txt$|^20231020_155615\.jpg\.txt$|^20231020_155710\.jpg\.txt$|^20231020_155940\.jpg\.txt$/)) {
      return; // Ignora os arquivos listados
    }

    const filePath = path.join(diretorio, file);

    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      return; // Ignora diretórios
    }

    const data = fs.readFileSync(filePath, 'utf8');

    const linhas = data.split('\n');

    linhas.forEach(linha => {
      const matchResposta = linha.match(/\(([^)]+)\)/);
      if (matchResposta) {
        const resposta = matchResposta[1].replace(/^"/, ''); // Remover aspas no início
        if (!respostas[resposta]) {
          respostas[resposta] = 0;
        }
        respostas[resposta]++;
        if (resposta === 'X') {
          totalHomens++;
        } else if (resposta === ' ') {
          totalMulheres++;
        }
      }
    });

  });

  // Ao final da leitura dos arquivos
  // Agora temos as contagens nas variáveis respostas

  // Exibir os resultados
  for (const resposta in respostas) {
    console.log(`Alternativa "${resposta}" foi marcada ${respostas[resposta]} vezes.`);
  }

  console.log(`Total de marcações: ${totalHomens + totalMulheres}`);
  console.log(`Total de homens: ${totalHomens}`);
  console.log(`Total de mulheres: ${totalMulheres}`);
});
