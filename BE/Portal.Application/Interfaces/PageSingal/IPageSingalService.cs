using Common.Common.ActionResponse;
using Common.Dtos.PageSingal;
using Common.Share.SeedWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.PageSingal
{
  public interface IPageSingalService
  {
    Task<ActionResponse<PageSingalDto>> CreatePageSingal(CreateUpdatePageSingal request);
    Task<ActionResponse<PageSingalDto>> UpdatePageSingal(CreateUpdatePageSingal request);
    Task<ActionResponse<bool>> DeletePageSingal(Guid Id);
    Task<ActionResponse<bool>> DeleteListPageSingal(List<Guid> Ids);
    Task<ActionResponse<PageSingalDto>> GetPageSingalById(Guid Id);
    Task<ActionResponse<PagedList<PageSingalDto>>> GetAllPaging(RequestParameters request);
    Task<ActionResponse<List<PageSingalDto>>> GetAll();

  }
}
