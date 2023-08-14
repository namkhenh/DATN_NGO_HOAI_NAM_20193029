using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.PermissionAction
{
  public class PermissionActionDto
  {
    public Guid Id { get; set; }
    public Guid ActionId { get; set; }
    public Guid PermissionId { get; set; }
  }
}
