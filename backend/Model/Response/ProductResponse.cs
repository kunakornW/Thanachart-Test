using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model.Response
{
    public class ProductResponse
    {
        public long id { get; set; }

        public string code { get; set; } = string.Empty;

        public string name { get; set; } = string.Empty;

        public decimal price { get; set; }
    }
}
