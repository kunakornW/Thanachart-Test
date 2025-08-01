using backend.Model.Response;

namespace backend.Database.Interface
{
    public interface IProductRepo
    {
        public Task<List<ProductResponse>> Get();
    }
}
