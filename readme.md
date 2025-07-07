# Projeto de teste para utilização do K6

A ideia desse projeto é utilizar uma aplicação simples, para testar como é feito a construção e execução da ferrramenta [k6](https://grafana.com/docs/k6/latest/) - uma aplicação de teste de carga.

Assim, foi criado uma API simples (ProductApi) representando uma lista de produtos com algumas propriedades.

E o código JS (K6App) contendo os script de teste e a rotina de testes.

## Recursos

Instação do Node 22.17.0

Instalação do K6 no projeto: `npm install k6`

Instalação K6 na máquina para execução: [Site oficial do K6, opção de via installer](https://grafana.com/docs/k6/latest/set-up/install-k6/);

## Execução

Os testes podem ser executados de 3 formas:

- Local: executadas em uma máquina ou cotainer, usando o comando `k6 run`;
- Distribuida: executadas em um cluster Kubernetes;
- Cloud: executado diretamente no Grafana Cloud.

Por exemplo, para demonstrar a primeira opção (e que foi a forma feita nesse projeto):

- Dentro da pasta onde está o arquivo index.js, abrir uma ferramenta de linha de comando, executar o comando `k6 run [arquivo_index]` e colocar as opções desejadas.
- Por exemplo:

  - `k6 run index.js --vus 10 --duration 35s`

    - `run` é o comando que irá executar os comando presentes no arquivo passado como parâmetro (index.js);
    - `vus` é a opção que indica quantos usuários virtuais simultâneos serão simulados;
    - `duration` indica por quanto tempo o teste irá executar;

- Esses parâmetros adicionais podem ser substituidos por uma configuração, que está presente no arquivo index.js. Abaixo um exemplo da configuração com os mesmos parâmetros de cima:
  - `export const options = {
  vus: 10,
  duration: "30s",
};`

Além disso, é possível executar o k6 a nível de chamadas de API e também a [nível de navegador](https://grafana.com/docs/k6/latest/using-k6-browser/).
