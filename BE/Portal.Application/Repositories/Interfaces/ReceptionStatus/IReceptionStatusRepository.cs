using Common.Contract.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Repositories.Interfaces.ReceptionStatus
{
    public interface IReceptionStatusRepository : IRepositoryBaseAsync<Portal.Domain.Entities.ReceptionStatus, Guid>
    {
    }
}
