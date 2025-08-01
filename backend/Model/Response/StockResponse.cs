using System.ComponentModel.DataAnnotations;

namespace backend.Model.Response
{
    public class StockResponse
    {
        public string productName { get; set; } = string.Empty;
        public string productCode { get; set; } = string.Empty;

        public int stock { get; set; }

        public bool canOrder { get; set; }
    }
}
