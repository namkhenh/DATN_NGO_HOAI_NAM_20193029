using Common.Dtos.District;
using Common.Dtos.Province;
using Common.Dtos.Role;
using Common.Dtos.Sex;
using Common.Dtos.Ward;
using Common.Share.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.User
{
  public class UserDto
  {
    public string Id { get; set; }
    public string UserName { get; set; }
    public string PhoneNumber { get; set; }
    public string FullName { get; set; }
    public string? Adress { get; set; }
    public string? Description { get; set; }
    public string? CMND { get; set; }
    public string? Code { get; set; }  
    public DateTime? DateOfBirth { get; set; }
    public Guid? ProvinceId { get; set; }
    public Guid? DistrictId { get; set; }
    public Guid? WardId { get; set; }
    public ProvinceDto Province { get; set; }
    public DistrictDto District { get; set; }
    public WardDto Ward { get; set; }
    public bool Status { get; set; }
    public SexEnum? Sex { get; set; }
    public ReligionEnum? Religion { get; set; }
    public int? Age { get; set; }
    public string Email { get; set; }
    public string? GuardiasName { get; set; }
    public string? GuardiansPhoneNumber { get; set; }
    public RelationshipEnum? Relationship { get; set; }
    public List<RoleDto> Roles { get; set; }
  }
}
