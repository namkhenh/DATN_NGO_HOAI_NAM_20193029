using Common.Contract.Common.Interfaces;
using Common.Infrastructure.Common.Implements;
using Portal.Application.Repositories.Interfaces.PermissionAction;
using Portal.Application.Repositories.Interfaces.ReceptionStatus;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Repositories.Implements.ReceptionStatus
{
    public class ReceptionStatusRepository : RepositoryBaseAsync<Portal.Domain.Entities.ReceptionStatus, Guid, ApplicationDbContext>, IReceptionStatusRepository
    {
        public ReceptionStatusRepository(ApplicationDbContext dbContext, IUnitOfWork<ApplicationDbContext> unitOfWork) : base(dbContext, unitOfWork)
        {

        }
    }
}
