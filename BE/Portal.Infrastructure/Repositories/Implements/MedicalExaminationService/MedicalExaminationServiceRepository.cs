using Common.Contract.Common.Interfaces;
using Common.Infrastructure.Common.Implements;
using Portal.Application.Repositories.Interfaces.MedicalExaminationService;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Repositories.Implements.MedicalExaminationService
{
  public class MedicalExaminationServiceRepository : RepositoryBaseAsync<Portal.Domain.Entities.MedicalExaminationService, Guid, ApplicationDbContext>, IMedicalExaminationServiceRepository
  {
    public MedicalExaminationServiceRepository(ApplicationDbContext dbContext, IUnitOfWork<ApplicationDbContext> unitOfWork) : base(dbContext, unitOfWork)
    {

    }
  }
}
