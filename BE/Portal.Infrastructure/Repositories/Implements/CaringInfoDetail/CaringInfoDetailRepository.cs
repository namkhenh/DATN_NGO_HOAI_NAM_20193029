using Common.Contract.Common.Interfaces;
using Common.Infrastructure.Common.Implements;
using Portal.Application.Repositories.Interfaces.CaringInfo;
using Portal.Application.Repositories.Interfaces.CaringInfoDetail;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Repositories.Implements.CaringInfoDetail
{
  public class CaringInfoDetailRepository : RepositoryBaseAsync<Portal.Domain.Entities.CaringInfoDetail, Guid, ApplicationDbContext>, ICaringInfoDetailRepository
  {
    public CaringInfoDetailRepository(ApplicationDbContext dbContext, IUnitOfWork<ApplicationDbContext> unitOfWork) : base(dbContext, unitOfWork)
    {

    }
  }
}
