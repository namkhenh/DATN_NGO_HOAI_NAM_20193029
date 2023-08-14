using Common.Contract.Common.Interfaces;
using Common.Infrastructure.Common.Implements;
using Portal.Application.Repositories.Interfaces.Page;
using Portal.Application.Repositories.Interfaces.PageSingal;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Repositories.Implements.PageSingal
{
  public class PageSingalRepository : RepositoryBaseAsync<Portal.Domain.Entities.PageSingal, Guid, ApplicationDbContext>, IPageSingalRepository
  {
    public PageSingalRepository(ApplicationDbContext dbContext, IUnitOfWork<ApplicationDbContext> unitOfWork) : base(dbContext, unitOfWork)
    {

    }
  }
}
