namespace ProductAPI
{
    public class Product
    {
        public Product()
        {

        }

        public Product(Guid id, string name, DateOnly createdDate, int quantity, string? description = null)
        {
            Id = id;
            Name = name;
            CreatedDate = createdDate;
            Quantity = quantity;
            Description = description;
        }

        public Guid Id { get; set; }

        public string? Name { get; set; }

        public DateOnly CreatedDate { get; set; }

        public int Quantity { get; set; }

        public string? Description { get; set; }
    }
}
