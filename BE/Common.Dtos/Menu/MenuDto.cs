using Common.Dtos.Action;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.Menu
{
  public class MenuDto
  {
    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public string Path { get; set; }
    public List<ActionDto> Actions { get; set; } = new List<ActionDto>();
  }
}
