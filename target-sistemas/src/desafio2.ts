// Dado a sequência de Fibonacci, onde se inicia por 0 e 1 e o próximo valor sempre será a soma dos 2 valores anteriores (exemplo: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...), escreva um programa na linguagem que desejar onde, informado um número, ele calcule a sequência de Fibonacci e retorne uma mensagem avisando se o número informado pertence ou não a sequência

// IMPORTANTE: Esse número pode ser informado através de qualquer entrada de sua preferência ou pode ser previamente definido no código;

// ---

// Verifica se um número pertence à sequência de Fibonacci
function pertenceFibonacci(num: number): boolean {
  let a = 0;
  let b = 1;
  let c = 0;

  while (c < num) {
    c = a + b;
    a = b;
    b = c;
  }

  return c === num;
}

// Testando
const numero = 21;
const pertence = pertenceFibonacci(numero);

if (pertence) {
  console.log(`${numero} pertence à sequência de Fibonacci.`);
} else {
  console.log(`${numero} não pertence à sequência de Fibonacci.`);
}

// Output:
// 21 pertence à sequência de Fibonacci.

// :D
// Entra no meu site: https://v1cferr.dev
