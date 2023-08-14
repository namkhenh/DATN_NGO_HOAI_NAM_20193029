using Common.Contract.Common.Interfaces;
using Common.Infrastructure.Common.Implements;
using Portal.Application.Repositories.Interfaces.Department;
using Portal.Application.Repositories.Interfaces.Menu;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Repositories.Implements.Department
{
  public class DepartmentRepository : RepositoryBaseAsync<Portal.Domain.Entities.Department, Guid, ApplicationDbContext>, IDepartmentRepository
  {
    public DepartmentRepository(ApplicationDbContext dbContext, IUnitOfWork<ApplicationDbContext> unitOfWork) : base(dbContext, unitOfWork)
    {

    }
  }
}
