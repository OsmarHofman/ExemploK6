# Projeto de teste para utilização do K6

A ideia desse projeto é utilizar uma aplicação simples, para testar como é feito a construção e execução da ferrramenta [k6](https://grafana.com/docs/k6/latest/) - uma aplicação de teste de carga.

Assim, foi criado uma API simples (ProductApi) representando uma lista de produtos com algumas propriedades.

E o código JS (K6App) contendo os script de teste e a rotina de testes. 

## Recursos

Instação do Node 22.17.0

Instalação do K6 no projeto: `npm install k6`

Instalação K6 na máquina para execução: [Site oficial do K6, opção de via installer](https://grafana.com/docs/k6/latest/set-up/install-k6/);

## Execução

Dentro da pasta onde está o arquivo index.js, abrir uma ferramenta de linha de comando, executar o comando `k6 run [arquivo_index]` e colocar as opções desejadas.

Por exemplo: 

`k6 run index.js --vus 10 --duration 35s`

- `run` é o comando que irá executar os comando presentes no arquivo passado como parâmetro (index.js);
- `vus` é a opção que indica quantos usuários virtuais simultâneos serão simulados;
- `duration` indica por quanto tempo o teste irá executar;