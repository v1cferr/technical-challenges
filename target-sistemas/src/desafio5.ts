// Escreva um programa que inverta os caracteres de um string

// IMPORTANTE:
// a) Essa string pode ser informada através de qualquer entrada de sua preferência ou pode ser previamente definida no código;
// b) Evite usar funções prontas, como, por exemplo, reverse;

// ---

function inverterString(str: string): string {
  let strInvertida = "";
  for (let i = str.length - 1; i >= 0; i--) {
    strInvertida += str[i];
  }
  return strInvertida;
}

// Teste
const stringOriginal = "World of Warcraft is GOAT :D";
const stringInvertida = inverterString(stringOriginal);
console.log(`String original: ${stringOriginal}`);
console.log(`String invertida: ${stringInvertida}`);

// Output:
// String original: World of Warcraft is GOAT :D
// String invertida: D: TAOG si tfarcraW fo dlroW

// Caso queira testar:
// - Só alterar a variável stringOriginal
// - Ou criar uma variável e chamar a função inverterString passando essa variável como parâmetro

// :D
// Entra no meu site: https://v1cferr.dev
