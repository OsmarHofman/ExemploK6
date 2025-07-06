import GetAllProducts, {
  GetProductDuration,
} from "./scenarios/GetAllProducts.js";
import { group, sleep } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
};

export default () => {
  group(
    "Endpoint Get All Products - Controller Products - Products.Api",
    () => {
      GetAllProducts();
    }
  );

  sleep(1);
};
