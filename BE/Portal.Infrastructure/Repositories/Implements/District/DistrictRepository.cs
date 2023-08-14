using Common.Contract.Common.Interfaces;
using Common.Infrastructure.Common.Implements;
using Portal.Application.Repositories.Interfaces.Department;
using Portal.Application.Repositories.Interfaces.District;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Repositories.Implements.District
{
  public class DistrictRepository : RepositoryBaseAsync<Portal.Domain.Entities.District, Guid, ApplicationDbContext>, IDistrictRepository
  {
    public DistrictRepository(ApplicationDbContext dbContext, IUnitOfWork<ApplicationDbContext> unitOfWork) : base(dbContext, unitOfWork)
    {

    }
  }
}
