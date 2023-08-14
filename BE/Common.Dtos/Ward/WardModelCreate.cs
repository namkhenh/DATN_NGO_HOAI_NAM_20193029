using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.Ward
{
  public class WardModelCreate
  {
    public int code { get; set; }
    public string name { get; set; }
    public string codename { get; set; }
    public string division_type { get; set; }
    public string short_codename { get; set; }
  }
}
