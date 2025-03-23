// Dado um vetor que guarda o valor de faturamento diário de uma distribuidora, faça um programa, na linguagem que desejar, que calcule e retorne

// • O menor valor de faturamento ocorrido em um dia do mês;
// • O maior valor de faturamento ocorrido em um dia do mês;
// • Número de dias no mês em que o valor de faturamento diário foi superior à média mensal.

// IMPORTANTE:

// - a) Usar o json ou xml disponível como fonte dos dados do faturamento mensal;
// - b) Podem existir dias sem faturamento, como nos finais de semana e feriados. Estes dias devem ser ignorados no cálculo da média;

// ---

import fs from "fs";
import path from "path";

interface FaturamentoDiario {
  dia: number;
  valor: number;
}

function analisarFaturamento() {
  try {
    // Lê o arquivo JSON
    const filePath = path.resolve(__dirname, "data", "faturamento.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const faturamento: FaturamentoDiario[] = JSON.parse(rawData);

    // Filtra dias com faturamento (valor > 0)
    const diasComFaturamento = faturamento.filter((dia) => dia.valor > 0);

    if (diasComFaturamento.length === 0) {
      console.log("Não há dias com faturamento para analisar.");
      return;
    }

    // Encontra o menor valor de faturamento
    const menorFaturamento = Math.min(
      ...diasComFaturamento.map((dia) => dia.valor)
    );

    // Encontra o maior valor de faturamento
    const maiorFaturamento = Math.max(...faturamento.map((dia) => dia.valor));

    // Calcula a média mensal (ignorando dias sem faturamento)
    const somaFaturamento = diasComFaturamento.reduce(
      (soma, dia) => soma + dia.valor,
      0
    );
    const mediaMensal = somaFaturamento / diasComFaturamento.length;

    // Conta dias com faturamento acima da média
    const diasAcimaDaMedia = diasComFaturamento.filter(
      (dia) => dia.valor > mediaMensal
    ).length;

    // Exibe resultados
    console.log(
      `Menor valor de faturamento: R$ ${menorFaturamento.toFixed(4)}`
    );
    console.log(
      `Maior valor de faturamento: R$ ${maiorFaturamento.toFixed(4)}`
    );
    console.log(
      `Número de dias com faturamento acima da média: ${diasAcimaDaMedia}`
    );
  } catch (error) {
    console.error("Erro ao analisar o faturamento:", error);
  }
}

// Executa a análise
analisarFaturamento();
