using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.Ward
{
  public class WardDto
  {
    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public string CodeName { get; set; }
    public string Division_Type { get; set; }
    public string Short_Codename { get; set; }
    public Guid DistrictId { get; set; }
  }
}
