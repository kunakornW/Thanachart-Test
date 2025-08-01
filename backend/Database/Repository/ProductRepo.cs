using backend.Database.Interface;
using backend.Model.Response;
using Microsoft.EntityFrameworkCore;

namespace backend.Database.Repository
{
    public class ProductRepo : IProductRepo
    {

        private readonly DatabaseContext db;

        public ProductRepo(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<List<ProductResponse>> Get()
        {
            return await db.Products.Select(x => new ProductResponse
            {
                id = x.id,
                code = x.code,
                name = x.name,
                price = x.price
            }).ToListAsync();
        }
    }
}
