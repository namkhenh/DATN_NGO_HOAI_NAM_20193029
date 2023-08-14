using Common.Contract.Domain;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Domain.Entities
{
  public class AppRole : IdentityRole
  {
    public string Code { get; set; }
    public string Description { get; set; }
    public bool Status { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public DateTime? DeleteAt { get; set; }
    public string? CreateBy { get; set; }
    public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.Now;

    public DateTimeOffset? LastModifiedDate { get; set; }

  }
}
