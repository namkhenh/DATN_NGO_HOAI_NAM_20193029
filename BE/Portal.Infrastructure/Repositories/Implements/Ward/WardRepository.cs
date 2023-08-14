using Common.Contract.Common.Interfaces;
using Common.Infrastructure.Common.Implements;
using Portal.Application.Repositories.Interfaces.RefeshToken;
using Portal.Application.Repositories.Ward;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Repositories.Implements.Ward
{
  public class WardRepository : RepositoryBaseAsync<Portal.Domain.Entities.Ward, Guid, ApplicationDbContext>, IWardRepository
  {
    public WardRepository(ApplicationDbContext dbContext, IUnitOfWork<ApplicationDbContext> unitOfWork) : base(dbContext, unitOfWork)
    {
    }
  }
}
