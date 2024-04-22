using IndPro.Models;
using IndPro.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace IndPro.Controllers
{
    [Route("api/products")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public IActionResult getAllProducts()
        {
            return Ok(_productService.getAllProducts());
        }

        [HttpPost]
        public IActionResult createProduct([FromBody]Product product)
        {
            if(_productService.isValidProduct(product))
            {
                Product createdProduct = _productService.createProduct(product);
                return Ok(createdProduct);
            }
            else
            {
                return BadRequest("Invalid Data Provided");
            }
        }

        [HttpPut("{id}")]
        public IActionResult updateProduct(Guid id, [FromBody]Product product)
        {

            Tuple<string, Product> response = _productService.updateProduct(id, product);
            if(response.Item1 == "Success")
            {
                return Ok(response.Item2);
            }
            else if (response.Item1 == "Invalid Data")
            {
                return BadRequest("Invalid Data Provided");
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult deleteProduct(Guid id)
        {
            bool isDeleted = _productService.deleteProduct(id);
            if (isDeleted)
            {
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
