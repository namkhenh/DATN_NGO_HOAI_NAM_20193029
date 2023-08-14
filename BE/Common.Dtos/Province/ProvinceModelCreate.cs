using Common.Dtos.District;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.Province
{
  public class ProvinceModelCreate
  {
    public int code { get; set; }
    public string name { get; set; }
    public string codename { get; set; }
    public string division_type { get; set; }
    public int phone_code { get; set; } 
    public List<DistrictModelCreate> districts { get; set; }
    
  }
}
