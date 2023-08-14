using Portal.Infrastructure;
using System.ComponentModel;
using System.Reflection;

namespace Portal.API.Rpc.permissionaction
{
  [DisplayName("Quản lý PermissionAction")]
  public class PermissionActionRoot : Root
  {
    public const string Parent = Module + "/permissionaction";
    public const string Master = Module + "/permissionaction/permissionaction-master";
    public const string Detail = Module + "/permissionaction/permissionaction-detail/*";
    private const string Default = Rpc + Module + "/permissionaction";
    public const string Get = Default + "/get";
    public const string Count = Default + "/count";
    public const string Create = Default + "/create";
    public const string Update = Default + "/update";
    public const string Delete = Default + "/delete";
    public const string GetPermissionByRoleId = Default + "/get-permissionaction-by-roleId";
    public const string GetAllPermissionPaging = Default + "/get-all-permissionaction-paging";
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
