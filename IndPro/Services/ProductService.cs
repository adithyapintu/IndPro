using IndPro.Models;

namespace IndPro.Services
{
    public class ProductService : IProductService
    {
        public static List<Product> products = new List<Product>();
        public bool isValidProduct(Product product)
        {
            if(product == null || String.IsNullOrEmpty(product.name) || String.IsNullOrEmpty(product.description) || product.price == 0)
            {
                return false;
            }
            return true;
        }

        public ProductService()
        {
            createProduct(new Product() { name = "Iphone 15", description = "This is the latest phone by apple", price = 799});
            createProduct(new Product() { name = "Samsung s24 Ultra", description = "This is the latest phone by Samsung", price = 1199});
            createProduct(new Product() { name = "Nothing Phone 2a", description = "This is the latest phone by Nothing", price = 299});
        }

        public List<Product> getAllProducts()
        {
            return products;
        }

        public Product createProduct(Product product) { 
            product.id = Guid.NewGuid();
            products.Add(product);
            return product;
        }

        public Tuple<string, Product> updateProduct(Guid id, Product product)
        {
            Product? productToBeUpdated = products.Find(p => p.id == id);
            if (productToBeUpdated != null)
            {
                if (isValidProduct(product))
                {
                    productToBeUpdated.name = product.name;
                    productToBeUpdated.description = product.description;
                    productToBeUpdated.price = product.price;
                    int index = products.IndexOf(productToBeUpdated);
                    products[index] = productToBeUpdated;
                    return new Tuple<string, Product>("Success", product);
                }
                else
                {
                    return new Tuple<string, Product>("Invalid Data", product);
                }

            }
            else
            {
                return new Tuple<string, Product>("Data NotFound", product); ;
            }
        }

        public bool deleteProduct(Guid id)
        {
            Product? productToBeRemoved = products.Find(p => p.id == id);
            if (productToBeRemoved != null)
            {
                products.Remove(productToBeRemoved);
                return true;
            }
            return false;
        }
    }
}
