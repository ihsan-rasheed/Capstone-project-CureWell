using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace CurewellAPI.Models
{
    [Table("Admin")]
    public partial class Admin
    {
        [Key]
        [Column("UserId")]
        public int UserId { get; set; }

        [StringLength(25)]
        [Unicode(false)]
        public string UserName { get; set; } = null!;

        [StringLength(25)]
        [Unicode(false)]
        public string UserPassword { get; set; } = null!;
    }
}
