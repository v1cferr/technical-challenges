# Target Sistemas

## Descrição

Uma empresa de tecnologia e serviços que vai além de criar softwares de gestão — estamos aqui para transformar o mercado de distribuição! Entregamos mais do que soluções tecnológicas; oferecemos inteligência, automação, suporte completo, e construímos relacionamentos sólidos com nossos clientes. Aqui, parceria e proximidade são essenciais!

Somos um time transparente, unido e cheio de energia. Amamos novas ideias, trabalhamos juntos em tudo (e muito!), e valorizamos a colaboração acima de tudo. Queremos alguém que se identifique com o jeito Target de ser 😊

Se você é apaixonado por tecnologia, adora uma boa conversa, valoriza autonomia, e busca um ambiente dinâmico, flexível e repleto de pessoas incríveis, vem fazer parte do nosso time! ✨

**Vaga:** <https://targetsistemas.gupy.io/jobs/8712795>

## Desafios

### 1. Calculadora de soma

Observe o trecho de código abaixo:

```plain
int INDICE = 13;
SOMA = 0;
K = 0;

Enquanto K < INDICE faça {
    K = K + 1;
    SOMA = SOMA + K;
}

Imprimir(SOMA);
```

Ao final do processamento, qual será o valor da variável SOMA?

### 2. Verificador de Fibonacci

Dado a sequência de Fibonacci, onde se inicia por 0 e 1 e o próximo valor sempre será a soma dos 2 valores anteriores (exemplo: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...), escreva um programa na linguagem que desejar onde, informado um número, ele calcule a sequência de Fibonacci e retorne uma mensagem avisando se o número informado pertence ou não a sequência

IMPORTANTE: Esse número pode ser informado através de qualquer entrada de sua preferência ou pode ser previamente definido no código;

### 3. Análise de faturamento

Dado um vetor que guarda o valor de faturamento diário de uma distribuidora, faça um programa, na linguagem que desejar, que calcule e retorne

• O menor valor de faturamento ocorrido em um dia do mês;
• O maior valor de faturamento ocorrido em um dia do mês;
• Número de dias no mês em que o valor de faturamento diário foi superior à média mensal.

IMPORTANTE:

- a) Usar o json ou xml disponível como fonte dos dados do faturamento mensal;
- b) Podem existir dias sem faturamento, como nos finais de semana e feriados. Estes dias devem ser ignorados no cálculo da média;

### 4. Percentual de faturamento por estado

Dado o valor de faturamento mensal de uma distribuidora, detalhado por estado

• SP – R$67.836,43
• RJ – R$36.678,66
• MG – R$29.229,88
• ES – R$27.165,48
• Outros – R$19.849,53

Escreva um programa na linguagem que desejar onde calcule o percentual de representação que cada estado teve dentro do valor total mensal da distribuidora.

### 5. Inversão de string

Escreva um programa que inverta os caracteres de um string

IMPORTANTE:
a) Essa string pode ser informada através de qualquer entrada de sua preferência ou pode ser previamente definida no código;
b) Evite usar funções prontas, como, por exemplo, reverse;

> NÃO SE ESQUEÇA DE INSERIR O LINK DO SEU REPOSITÓRIO NO GITHUB COM O CÓDIGO FONTE QUE VOCÊ DESENVOLVEU!

## Como executar as soluções

### Pré-requisitos

- Node.js (versão 14.x ou superior)
- npm (normalmente instalado com o Node.js)

### Instalação

#### 1. Clone este repositório

```bash
git clone https://github.com/v1cferr/technical-challenges.git
cd technical-challenges/target-sistemas
```

#### 2. Instale as dependências

```bash
npm install
```

#### 3. Executando as soluções

```bash
# Desafio 1: Calculadora de soma
npm run desafio1

# Desafio 2: Verificador de Fibonacci
npm run desafio2

# Desafio 3: Análise de faturamento
npm run desafio3

# Desafio 4: Percentual de faturamento por estado
npm run desafio4

# Desafio 5: Inversão de string
npm run desafio5

# Execute todos os desafios sequencialmente
npm run all
```

## Estrutura do projeto

```bash
target-sistemas/
├── README.md
├── package.json
├── tsconfig.json
├── src/
│   ├── desafio1.ts
│   ├── desafio2.ts
│   ├── desafio3.ts
│   ├── desafio4.ts
│   ├── desafio5.ts
│   └── data/
│       └── faturamento.json
└── .gitignore
```
