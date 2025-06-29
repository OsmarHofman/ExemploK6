import GetAllProducts from "./scenarios/GetAllProducts.js";
import {group, sleep} from 'k6';

export default() => {
    group('Endpoint Get All Products - Controller Products - Products.Api', () => {
        GetAllProducts();
    });

    sleep(1);
}