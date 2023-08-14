using Common.Contract.Common.Interfaces;
using Common.Infrastructure.Common.Implements;
using Portal.Application.Repositories.Interfaces.ActionPage;
using Portal.Application.Repositories.Interfaces.AppUserDepartment;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Repositories.Implements.AppUserDepartment
{
  public class AppUserDepartmentRepository : RepositoryBaseAsync<Portal.Domain.Entities.AppUserDepartment, Guid, ApplicationDbContext>, IAppUserDepartmentRepository
  {
    public AppUserDepartmentRepository(ApplicationDbContext dbContext, IUnitOfWork<ApplicationDbContext> unitOfWork) : base(dbContext, unitOfWork)
    {

    }
  }
}
