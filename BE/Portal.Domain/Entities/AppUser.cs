using Common.Share.Enum;
using Microsoft.AspNetCore.Identity;
using Portal.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Domain.Entities
{
  public class AppUser : IdentityUser
  {
    public string? Code { get; set; }
    public string? FullName { get; set; }
    public string? Adress { get; set; }
    public string? Description { get; set; }
    public bool? Status { get; set; } = true;
    public SexEnum? Sex { get; set; }
    public ReligionEnum? Religion { get; set; }
    public int? Age { get; set; }
    public Guid? ProvinceId { get; set; }
    public Guid? DistrictId { get; set; }
    public Guid? WardId { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? CMND { get; set; }
    public string? GuardiasName { get; set; }
    public string? GuardiansPhoneNumber { get; set; }
    public RelationshipEnum Relationship { get; set; }
    public DateTime? DeleteAt { get; set; }
    public DateTimeOffset CreatedDate { get; set; } = DateTime.Now;
    public string? CreateBy { get; set; }

    public DateTimeOffset? LastModifiedDate { get; set; }
  }
}
