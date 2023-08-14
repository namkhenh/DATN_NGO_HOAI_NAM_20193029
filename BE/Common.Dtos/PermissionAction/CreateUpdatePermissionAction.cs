using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.PermissionAction
{
  public class CreateUpdatePermissionAction
  {
     public KeyValuePair<Guid, List<Guid>> PermissionActions { get; set; }
  }
}
