// Observe o trecho de código abaixo:
// int INDICE = 13, SOMA = 0, K = 0
// Enquanto K < INDICE faça { K = K + 1; SOMA = SOMA + K; }
// Imprimir(SOMA);
// Ao final do processamento, qual será o valor da variável SOMA?

// ---

// Loop para calcular a soma dos números de 1 até INDICE
function calcularSoma(indice: number): number {
  let soma = 0;
  let k = 0;

  while (k < indice) {
    k = k + 1;
    soma = soma + k;
  }

  return soma;
}

// Testando a função
const indice = 13;

const resultado = calcularSoma(indice);
console.log(`O valor da variável SOMA é: ${resultado}`);
// Output:
// O valor da variável SOMA é: 91

// Caso queira testar:
// Só rodar o comando `npm run desafio1`
// :D
// Entra no meu site: https://v1cferr.dev
