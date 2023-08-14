using Common.Contract.Common.Interfaces;
using Common.Infrastructure.Common.Implements;
using Portal.Application.Repositories.Interfaces.PatientRecord;
using Portal.Application.Repositories.Interfaces.Payment;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Repositories.Implements.Payment
{
    public class PaymentRepository : RepositoryBaseAsync<Portal.Domain.Entities.Payment, Guid, ApplicationDbContext>, IPaymentRepository
    {
        public PaymentRepository(ApplicationDbContext dbContext, IUnitOfWork<ApplicationDbContext> unitOfWork) : base(dbContext, unitOfWork)
        {

        }
    }
}
