using Common.Contract.Common.Interfaces;
using Common.Infrastructure.Common.Implements;
using Portal.Application.Repositories.Interfaces.MedicalExaminationSchedulePatientRecord;
using Portal.Application.Repositories.Interfaces.MedicalExaminationService;
using Portal.Domain.Entities;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Repositories.Implements.MedicalExaminationSchedulePatientRecord
{
    public class MedicalExaminationSchedulePatientRecordRepository : RepositoryBaseAsync<Portal.Domain.Entities.MedicalExaminationSchedulePatientRecord, Guid, ApplicationDbContext>, IMedicalExaminationSchedulePatientRecordRepository
    {
        public MedicalExaminationSchedulePatientRecordRepository(ApplicationDbContext dbContext, IUnitOfWork<ApplicationDbContext> unitOfWork) : base(dbContext, unitOfWork)
        {

        }
    }
}
