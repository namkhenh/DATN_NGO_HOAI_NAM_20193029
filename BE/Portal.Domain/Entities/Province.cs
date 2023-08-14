using Common.Contract.Domain.Interfaces;
using Common.Contract.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Portal.Domain.Entities
{
  public class Province : EntityAuditBase<Guid>, IEntityBase<Guid>
  {
    public int Code { get; set; }
    public string Name { get; set; }
    public string CodeName { get; set; }
    public string Division_Type { get; set; }
    public int Phone_Code { get; set; }
  }
}
