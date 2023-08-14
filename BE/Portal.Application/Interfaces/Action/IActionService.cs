using Common.Common.ActionResponse;
using Common.Dtos.Action;
using Common.Share.SeedWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.Action
{
    public interface IActionService
    {
        Task<ActionResponse<List<ActionDto>>> GetAllActionByMenuId(Guid menuId);
        Task<ActionResponse<PagedList<ActionDto>>> GetAllActionPaging();
        Task<ActionResponse<List<ActionDto>>> GetAllAction();
        Task<ActionResponse<ActionDto>> UpdateAction(CreateUpdateAction request);
        Task<ActionResponse<ActionDto>> DeleteAction(Guid Id);
        Task<ActionResponse<ActionDto>> CreateAction(CreateUpdateAction request);
        Task<ActionResponse<List<ActionDto>>> CreateListAction(List<CreateUpdateAction> actions);
    }
}
