using Common.Common.ActionResponse;
using Common.Dtos.CaringInfo;
using Common.Dtos.CaringInfoDetail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.CaringInfoDetail
{
  public interface ICaringInfoDetailService
  {
    Task<ActionResponse<bool>> Create(CreateUpdateCaringInfoDetail request);
    Task<ActionResponse<bool>> Update(CreateUpdateCaringInfoDetail request);
  }
}
