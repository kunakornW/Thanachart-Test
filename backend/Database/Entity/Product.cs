using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Database.Entity
{
    [Table("Product")]
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }

        [Required]
        [MaxLength(10)]
        public string code { get; set; } = string.Empty;

        [MaxLength(100)]
        public string name { get; set; } = string.Empty;

        [Required]
        public decimal price { get; set; }
    }
}
