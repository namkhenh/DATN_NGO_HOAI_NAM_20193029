using Common.Contract.Common.Interfaces;
using Common.Infrastructure.Common.Implements;
using Portal.Application.Repositories.Interfaces.PageSingal;
using Portal.Application.Repositories.Interfaces.PatientRecord;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Repositories.Implements.PatientRecord
{
    public class PatientRecordRepository : RepositoryBaseAsync<Portal.Domain.Entities.PatientRecord, Guid, ApplicationDbContext>, IPatientRecordRepository
    {
        public PatientRecordRepository(ApplicationDbContext dbContext, IUnitOfWork<ApplicationDbContext> unitOfWork) : base(dbContext, unitOfWork)
        {

        }
    }
}
