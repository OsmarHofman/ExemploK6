using Microsoft.AspNetCore.Mvc;

namespace ProductAPI.Controllers
{
    [ApiController]

    public class ProductController : ControllerBase
    {
        private readonly List<Product> Products;

        public ProductController()
        {
            Products ??= CreateProducts();
        }

        private static List<Product> CreateProducts()
        {
            return
            [
                new() {
                    Id = Guid.Parse("3a8a1069-f0c5-4c9a-aa84-6c9c96f056ea"),
                    Name = "Product 1",
                    CreatedDate = DateOnly.FromDateTime(DateTime.Now),
                    Quantity = 10,
                    Description = "Description of Product 1"
                },
                new() {
                    Id = Guid.Parse("7af8fe4f-1a7e-441b-b69d-20969c9adc57"),
                    Name = "Product 2",
                    CreatedDate = DateOnly.FromDateTime(DateTime.Now),
                    Quantity = 20,
                    Description = "Description of Product 2"
                },
                new() {
                    Id = Guid.Parse("d8a91166-7d53-428c-a2ec-72093d59fa2e"),
                    Name = "Product 3",
                    CreatedDate = DateOnly.FromDateTime(DateTime.Now),
                    Quantity = 30,
                    Description = "Description of Product 3"
                }
            ];
        }

        [HttpGet, Route("GetAllProducts")]
        public ActionResult GetAllProducts()
        {
            if (Products.Count != 0)
                return Ok(Products);

            return NotFound();
        }

        [HttpGet, Route("GetProductByName")]
        public ActionResult GetProductByName(string name)
        {
            if (Products.Count == 0)
                NotFound();

            var product = Products.Find(x => x.Name == name);

            if (product is null)
                return NotFound();

            return Ok(product);
        }

        [HttpPost, Route("CreateProduct")]
        public ActionResult CreateProduct(CreateProductModel createProductModel)
        {
            if (Products.Count == 0)
                NotFound();

            var newProduct = new Product
            {
                Id = Guid.NewGuid(),
                Name = createProductModel.Name,
                CreatedDate = DateOnly.FromDateTime(DateTime.Now),
                Quantity = createProductModel.Quantity,
                Description = createProductModel.Description
            };

            Products.Add(newProduct);

            return Ok(Products);
        }

        [HttpPatch, Route("UpdateProductQuantityByName")]
        public ActionResult UpdateProductQuantityByName(string productName, int quantity)
        {
            if (quantity < 0)
                BadRequest();

            if (Products.Count == 0)
                NotFound();

            var product = Products.Find(x => x.Name == productName);

            if (product is null)
                return NotFound();

            product.Quantity = quantity;

            return Ok(Products);
        }

        [HttpDelete, Route("DeleteProductByName")]
        public ActionResult DeleteProductByName(string productName)
        {
            if (Products.Count == 0)
                NotFound();

            var product = Products.Find(x => x.Name == productName);

            if (product is null)
                return NotFound();

            Products.Remove(product);

            return Ok(Products);
        }
    }
}
