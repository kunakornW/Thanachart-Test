using backend.Database.Interface;
using backend.Model.Request;
using backend.Model.Response;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace backend.Database.Repository
{
    public class StockRepo : IStockRepo
    {
        private readonly DatabaseContext db;

        public StockRepo(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<List<StockResponse>> GetStock()
        {
            return await (from st in db.Stocks
                          join p in db.Products on st.productCode equals p.code
                          select new StockResponse
                          {
                              productCode = st.productCode,
                              productName = p.name,
                              canOrder = false,
                              stock = st.stock
                          }
                          ).ToListAsync();

        }

        public async Task<StockResponse> CheckStock(StockRequest model)
        {
            var result = new StockResponse();

            var obj = await db.Stocks.Where(x => x.productCode.Equals(model.productCode)).FirstOrDefaultAsync();
            if (obj != null)
            {
                result.productCode = obj.productCode;
                result.stock = obj.stock;
                result.canOrder = obj.stock < model.orderNumber ? false : true;
            }
            else
                throw new Exception("ไม่พบสินค้าใน Stock");

            return result;
        }

        public async Task<decimal> CheckOut(List<StockRequest> model)
        {
            await db.Database.BeginTransactionAsync();
            string productCode = "";
            decimal totalPrice = 0;

            try
            {
                foreach(var m in model)
                {
                    var product = await db.Products.Where(x => x.code.Equals(m.productCode)).FirstOrDefaultAsync();
                    if(product != null)
                    {
                        totalPrice += (product.price * m.orderNumber);
                    }
                    else
                        throw new Exception($"ไม่พบสินค้า '{productCode}' ใน Stock");

                    var obj = await db.Stocks.Where(x => x.productCode.Equals(m.productCode)).FirstOrDefaultAsync();
                    if (obj != null)
                    {
                        obj.stock -= m.orderNumber;
                        db.Entry(obj).State = EntityState.Modified;

                    }
                    else
                        throw new Exception($"ไม่พบสินค้า '{productCode}' ใน Stock");
                }

                await db.SaveChangesAsync();
                await db.Database.CommitTransactionAsync();

            }
            catch (Exception e)
            {
                await db.Database.RollbackTransactionAsync();
                throw new Exception(e.Message);
            }

            return totalPrice;
        }
    }
}
