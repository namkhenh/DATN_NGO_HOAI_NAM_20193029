using Common.Common.ActionResponse;
using Common.Dtos.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.Payment
{
    public interface IPaymentService
    {
        Task<ActionResponse<bool>> Create(CreateUpdatePayment request);
        Task<ActionResponse<bool>> CreateList(KeyValuePair<Guid,List<Guid>> request);
        Task<ActionResponse<bool>> Delete(Guid Id);
    }
}
