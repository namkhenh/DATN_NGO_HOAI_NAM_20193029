using Portal.Infrastructure;
using System.ComponentModel;
using System.Reflection;

namespace Portal.API.Rpc.pagesingal
{
  [DisplayName("Quản lý page lẻ")]
  public class PageSingalRoot : Root
  {
    public const string Parent = Module + "/pageSingal";
    public const string Master = Module + "/pageSingal/pageSingal-master";
    public const string Detail = Module + "/pageSingal/pageSingal-detail/*";
    private const string Default = Rpc + Module + "/pageSingal";
    public const string Get = Default + "/get";
    public const string Count = Default + "/count";
    public const string Create = Default + "/create";
    public const string Update = Default + "/update";
    public const string Delete = Default + "/delete";
    public const string DeleteListPageSingal = Default + "/delete-list-pageSingal";
    public const string GetPageSingalById = Default + "/get-pageSingal-by-id";
    public const string GetAllPaging = Default + "/get-paging";
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
