using Common.Contract.Common.Interfaces;
using Common.Infrastructure.Common.Implements;
using Portal.Application.Repositories.Interfaces.Department;
using Portal.Application.Repositories.Interfaces.MedicalExaminationSchedule;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Repositories.Implements.MedicalExaminationSchedule
{
  public class MedicalExaminationScheduleRepository : RepositoryBaseAsync<Portal.Domain.Entities.MedicalExaminationSchedule, Guid, ApplicationDbContext>, IMedicalExaminationScheduleRepository
  {
    public MedicalExaminationScheduleRepository(ApplicationDbContext dbContext, IUnitOfWork<ApplicationDbContext> unitOfWork) : base(dbContext, unitOfWork)
    {

    }
  }
}
