using Common.Dtos.Action;
using Common.Dtos.Menu;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.Permission
{
  public class PermissionDto
  {
    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public string Path { get; set; }
    public string RoleId { get; set; }
    public Guid MenuId { get; set; }
    public bool Status { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public MenuDto? Menu { get; set; } = new MenuDto();
    public List<ActionDto>? Actions { get; set; } = new List<ActionDto>();
  }
}
