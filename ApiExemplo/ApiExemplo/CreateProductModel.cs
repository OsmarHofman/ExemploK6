namespace ProductAPI
{
    public class CreateProductModel
    {
        public required string Name { get; set; }

        public int Quantity { get; set; }

        public required string Description { get; set; }
    }
}
