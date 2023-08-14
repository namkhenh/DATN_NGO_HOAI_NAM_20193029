using Common.Contract.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Repositories.Ward
{
  public interface IWardRepository : IRepositoryBaseAsync<Portal.Domain.Entities.Ward, Guid>
  {
  }
}
