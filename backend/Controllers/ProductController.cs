using backend.Database.Interface;
using backend.Model.Response;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepo productRepo;
        public ProductController(IProductRepo _productRepo)
        {
            productRepo = _productRepo;
        }

        [HttpGet("Order")]
        public async Task<ResponseMessage> Get()
        {
            ResponseMessage res = new ResponseMessage();

            try
            {
                var result = await productRepo.Get();
                res.data = result;
            }
            catch (Exception e)
            {
                res.SetFault(e, 500);
            }

            return res;
        }
    }
}
