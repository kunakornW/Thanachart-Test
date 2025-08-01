using System.ComponentModel.DataAnnotations;

namespace backend.Model.Request
{
    public class StockRequest
    {
        [Required]
        public string productCode { get; set; } = string.Empty;

        [Required]
        public int orderNumber { get; set; }
    }
}
