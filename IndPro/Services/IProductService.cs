using IndPro.Models;

namespace IndPro.Services
{
    public interface IProductService
    {
        public bool isValidProduct(Product product);
        public List<Product> getAllProducts();
        public Product createProduct(Product product);
        public Tuple<string, Product> updateProduct(Guid id, Product product);
        public bool deleteProduct(Guid id);
    }
}
