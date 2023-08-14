using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.PageSingal
{
  public class CreateUpdatePageSingal
  {
    public Guid? Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
  }
}
