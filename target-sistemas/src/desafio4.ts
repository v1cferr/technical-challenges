// Dado o valor de faturamento mensal de uma distribuidora, detalhado por estado

// • SP – R$67.836,43
// • RJ – R$36.678,66
// • MG – R$29.229,88
// • ES – R$27.165,48
// • Outros – R$19.849,53

// Escreva um programa na linguagem que desejar onde calcule o percentual de representação que cada estado teve dentro do valor total mensal da distribuidora.

// ---

// Faturamento mensal por estado
const faturamentoPorEstado = {
  SP: 67836.43,
  RJ: 36678.66,
  MG: 29229.88,
  ES: 27165.48,
  Outros: 19849.53,
};

// Calcula o valor total somando o faturamento de todos os estados
const valorTotalFaturamento = Object.values(faturamentoPorEstado).reduce(
  (soma, faturamento) => soma + faturamento,
  0
);

// Exibe o título do relatório
console.log("Percentual de representação por estado:");

// Para cada estado, calcula e exibe seu percentual de contribuição
Object.entries(faturamentoPorEstado).forEach(([estado, faturamento]) => {
  // Calcula o percentual que o estado representa
  const percentualDoEstado = (faturamento / valorTotalFaturamento) * 100;

  // Formata e exibe o resultado com duas casas decimais
  console.log(`${estado}: ${percentualDoEstado.toFixed(2)}%`);
});

// Output:
// Percentual de representação por estado:
// SP: 37.53%
// RJ: 20.29%
// MG: 16.17%
// ES: 15.03%
// Outros: 10.98%

// Caso queira testar:
// - Altere os valores no objeto `faturamentoPorEstado`
// - Execute o código novamente
// - Só rodar o comando `npm run desafio4`

// :D
// Entra no meu site: https://v1cferr.dev
