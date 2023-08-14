using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.Province
{
  public class ProvinceDto
  {
    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public string CodeName { get; set; }
    public string Division_Type { get; set; }
    public string Phone_Code { get; set; }
  }
}
