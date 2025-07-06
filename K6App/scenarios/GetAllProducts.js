import * as http from "k6/http";
import { check, fail, sleep } from "k6";
import { Trend, Rate } from "k6/metrics";

export let GetProductDuration = new Trend("get_product_duration");
export let GetProductFailRate = new Rate("get_product_fail_rate");
export let GetProductSuccessRate = new Rate("get_product_success_rate");
export let GetProductReqs = new Rate("get_product_reqs");

export default function () {
  console.log("valor http: ", http);

  let res = http.get("http://localhost:5214/GetAllProducts");

  GetProductDuration.add(res.timings.duration);
  GetProductReqs.add(1);
  GetProductFailRate.add(res.status == 0 || res.status >= 399);
  GetProductSuccessRate.add(res.status < 399);

  let durationMessage = `Duração máxima ${4000 / 1000}s`;
  if (
    !check(res, {
      "max duration": (r) => r.timings.duration < 4000,
    })
  ) {
    fail(`A requisição demorou mais do que ${durationMessage}`);
  }

  sleep(1);
}
