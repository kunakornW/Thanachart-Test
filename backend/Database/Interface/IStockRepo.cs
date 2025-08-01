using backend.Model.Request;
using backend.Model.Response;

namespace backend.Database.Interface
{
    public interface IStockRepo
    {
        public Task<List<StockResponse>> GetStock();

        public Task<StockResponse> CheckStock(StockRequest model);

        public Task<decimal> CheckOut(List<StockRequest> model);
    }
}
