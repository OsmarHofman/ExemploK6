import GetAllProducts from './scenarios/GetAllProducts.js';
import { group, sleep } from 'k6';

// O trecho abaixo é opcional e uma forma simples de demonstrar as opções que o k6 dispõe.

// export const options = {
//   vus: 10,
//   duration: "30s",
// };

//O trecho abaixo demonstra o uso de thresholds, que são limites definidos para as métricas personalizadas. Eles são utilizados para garantir que as métricas atendam a determinados critérios de desempenho. A documentação oficial sobre isso está em: https://k6.io/docs/using-k6/thresholds/

// export const options = {
//   stages: [
//     { duration: '5s', target: 20 },
//     { duration: '10s', target: 10 },
//     { duration: '15s', target: 0 },
//   ],

//   thresholds: {
//     get_product_duration: ['p(95)<4000'], // 95% das requisições devem ter duração menor que 4000ms
//     get_product_fail_rate: ['rate<0.05'], // Taxa de falhas deve ser menor que 5%
//     get_product_success_rate: ['rate>0.95'], // Taxa de sucesso deve ser maior que 95%
//     get_product_reqs: ['rate>0'], // Deve haver pelo menos uma requisição
//   },
// };

// O trecho abaixo é um exemplo usando scenarios, que são uma forma de executar vários testes de carga simultaneamente, permitindo que você defina diferentes configurações para cada cenário. Isso é útil quando você deseja testar diferentes endpoints ou cenários de uso em uma única execução do K6. A documentação oficial sobre isso está em: https://k6.io/docs/using-k6/scenarios/

export const options = {
  // Como definido pelos cenários, será executado o cenário 'stages_example', usando as configurações definidas abaixo e depois de 5 segundos, o cenário 'iterations_example' será executado.
  scenarios: {
    stages_example: {
      // O executor é a forma como o K6 executa os testes. Existem vários tipos de executores. Para utilizar a opção de stages é necessário utilizar a ramping-vus. A documentação oficial sobre isso está em: https://k6.io/docs/using-k6/scenarios/executors/
      executor: 'ramping-vus',

      startVUs: 0, // Número inicial de usuários virtuais (vus)

      // O trecho abaixo é baseado na configuração de Ramping UVs: https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/ramping-vus/
      // No caso abaixo, o teste começará com 20 usuários virtuais (vus) por 5 segundos, depois reduzirá para 10 vus por 10 segundos e finalmente terminará com 0 vus após 15 segundos.
      stages: [
        { duration: '5s', target: 20 },
        { duration: '10s', target: 10 },
        { duration: '15s', target: 0 },
      ],

      gracefulRampDown: '0s',
    },

    iterations_example: {
      executor: 'per-vu-iterations', // Esse executor é utilizado quando você quer que cada usuário virtual execute um número fixo de iterações, ao invés de um tempo fixo.

      vus: 5,
      iterations: 10, // Define o número de iterações que cada usuário virtual executará. Não pode ser usado junto com `stages`.
      startTime: '5s', // Define o tempo de início do executor
    },
  },
};

// O trecho abaixo é opcional e uma forma simples de demonstrar como gerar um arquivo de resumo após a execução do teste. A documentação oficial sobre isso está em: https://k6.io/docs/using-k6/output/#summary-output
export function handleSummary(data) {
  return {
    'summary.json': JSON.stringify(data),
  };
}

export default () => {
  group(
    'Endpoint Get All Products - Controller Products - Products.Api',
    () => {
      GetAllProducts();
    }
  );

  sleep(1);
};
