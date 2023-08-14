using Portal.Infrastructure;
using System.ComponentModel;
using System.Reflection;

namespace Portal.API.Rpc.province
{
  [DisplayName("Quản lý địa chỉ")]
  public class ProvinceRoot : Root
  {
    public const string Parent = Module + "/province";
    public const string Master = Module + "/province/province-master";
    public const string Detail = Module + "/detail";
    private const string Default = Rpc + Module + "/province";
    public const string Get = Default + "/get";
    public const string Count = Default + "/count";
    public const string Create = Default + "/create";
    public const string Update = Default + "/update";
    public const string Delete = Default + "/delete";
    public const string GetDistrictByProvinceId = Default + "/get-district-by-provinceId";
    public const string GetWardByDistrictId = Default + "/get-ward-by-districtId";
    public static Dictionary<string, IEnumerable<string>> Action = new Dictionary<string, IEnumerable<string>>
        {
            { "Tìm kiếm", new List<string> {
                Parent,
                Master, Count,
                Get,

            }},

            { "Thêm", new List<string> {
                Parent,
                Master, Count,
                Get,

            }},

            { "Sửa", new List<string> {
                Parent,
                Master, Count,
                Get,
            }},

             { "Xóa", new List<string> {
                Parent,
                Master, Count,
                Get,Delete
             }},

        };
  }
}
