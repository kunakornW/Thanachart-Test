using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Database.Entity
{
    [Table("Stock")]
    public class Stock
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }

        [Required]
        [MaxLength(10)]
        public string productCode { get; set; } = string.Empty;

        [Required]
        public int stock { get; set; }
    }
}
