using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.Permission
{
  public class CreateUpdatePermission
  {
    public Guid? Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public string Path { get; set; }
    public bool Status { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string RoleId { get; set; }
    public Guid MenuId { get; set; }
  }
}
