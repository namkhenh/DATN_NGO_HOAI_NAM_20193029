using Common.Dtos.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.Department
{
  public class DepartmentDto
  {
    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public string AppUserId { get; set; }
    public UserDto User { get; set; } = new UserDto();
  }
}
