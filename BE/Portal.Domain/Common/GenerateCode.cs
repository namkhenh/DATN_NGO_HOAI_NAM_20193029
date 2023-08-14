using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Domain.Common
{
  public static class GenerateCode
  {
    public static string GenerateCodeDoctor()
    {
      Random random = new Random();
      return "BS_"+ random.Next(10000, 99999).ToString();
    }
    public static string GenerateCodeDefault()
    {
      Random random = new Random();
      return "BN_" + random.Next(10000, 99999).ToString();
    }
    public static string GenerateCodeSchedule() {
      Random random = new Random();
      return "DL_" + random.Next(10000, 99999).ToString();
    }
    public static string GenerateCodePatientRecord()
    {
      Random random = new Random();
      return "HS_" + random.Next(10000, 99999).ToString();
    }
    public static string GenerateCodeAdmin()
    {
      Random random = new Random();
      return "AD_" + random.Next(10000, 99999).ToString();
    }
  }
}
