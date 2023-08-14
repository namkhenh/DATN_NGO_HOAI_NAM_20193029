using Common.Common.ActionResponse;
using Common.Dtos.District;
using Common.Dtos.Province;
using Common.Dtos.Ward;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.Province
{
  public interface IProvinceService
  {
    Task ToolAdd(List<ProvinceModelCreate> provinceList);
    Task<ActionResponse<List<ProvinceDto>>> GetAll();
    Task<ActionResponse<List<DistrictDto>>> GetDistrictByProvinceId(Guid Id);
    Task<ActionResponse<List<WardDto>>> GetWardByDistrictId(Guid Id);
  }
}
