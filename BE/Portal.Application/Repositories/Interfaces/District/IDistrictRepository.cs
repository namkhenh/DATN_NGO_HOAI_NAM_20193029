using Common.Contract.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Repositories.Interfaces.District
{
  public interface IDistrictRepository : IRepositoryBaseAsync<Portal.Domain.Entities.District, Guid>
  {
  }
}
