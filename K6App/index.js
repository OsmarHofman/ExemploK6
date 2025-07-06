import GetAllProducts from './scenarios/GetAllProducts.js';
import { group, sleep } from 'k6';

// O trecho abaixo é opcional, mas pode ser usado para definir o número de usuários virtuais (vus) e a duração do teste.

// export const options = {
//   vus: 10,
//   duration: "30s",
// };

// O trecho abaixo é baseado na configuração de Ramping UVs: https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/ramping-vus/
// No caso abaixo, o teste começará com 20 usuários virtuais (vus) por 5 segundos, depois reduzirá para 10 vus por 10 segundos e finalmente terminará com 0 vus após 15 segundos.
export const options = {
  stages: [
    { duration: '5s', target: 20 },
    { duration: '10s', target: 10 },
    { duration: '15s', target: 0 },
  ],
};

export default () => {
  group(
    'Endpoint Get All Products - Controller Products - Products.Api',
    () => {
      GetAllProducts();
    }
  );

  sleep(1);
};
