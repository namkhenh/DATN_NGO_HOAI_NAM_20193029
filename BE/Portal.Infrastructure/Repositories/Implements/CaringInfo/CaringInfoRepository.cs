using Common.Contract.Common.Interfaces;
using Common.Infrastructure.Common.Implements;
using Portal.Application.Repositories.Interfaces.AppUserDepartment;
using Portal.Application.Repositories.Interfaces.CaringInfo;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Repositories.Implements.CaringInfo
{
  public class CaringInfoRepository : RepositoryBaseAsync<Portal.Domain.Entities.CaringInfo, Guid, ApplicationDbContext>, ICaringInfoRepository
  {
    public CaringInfoRepository(ApplicationDbContext dbContext, IUnitOfWork<ApplicationDbContext> unitOfWork) : base(dbContext, unitOfWork)
    {

    }
  }
}
