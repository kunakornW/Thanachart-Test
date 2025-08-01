using backend.Database.Interface;
using backend.Database.Repository;
using backend.Model.Request;
using backend.Model.Response;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StockController : ControllerBase
    {
        private readonly IStockRepo stockRepo;

        public StockController(IStockRepo stockRepo)
        {
            this.stockRepo = stockRepo;
        }

        [HttpGet("GetStock")]
        public async Task<ResponseMessage> Get()
        {
            ResponseMessage res = new ResponseMessage();

            try
            {
                var result = await stockRepo.GetStock();
                res.data = result;
            }
            catch (Exception e)
            {
                res.SetFault(e, 500);
            }

            return res;
        }

        [HttpPost("CheckStock")]
        public async Task<ResponseMessage> CheckStock([FromBody] StockRequest model)
        {
            ResponseMessage res = new ResponseMessage();

            try
            {
                var result = await stockRepo.CheckStock(model);
                res.data = result;
            }
            catch (Exception e)
            {
                res.SetFault(e, 500);
            }

            return res;
        }

        [HttpPost("CheckOut")]
        public async Task<ResponseMessage> CheckOut([FromBody] List<StockRequest> model)
        {
            ResponseMessage res = new ResponseMessage();

            try
            {
                var result = await stockRepo.CheckOut(model);
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
