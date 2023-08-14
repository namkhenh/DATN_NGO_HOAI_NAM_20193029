using Portal.Infrastructure;
using System.ComponentModel;

namespace Portal.API.Rpc.permission
{
  [DisplayName("Quản lý Permission")]
  public class PermissionRoot : Root
  {
    public const string Parent = Module + "/permission";
    public const string Master = Module + "/permission/permission-master";
    public const string Detail = Module + "/permission/permission-detail/*";
    private const string Default = Rpc + Module + "/permission";
    public const string Get = Default + "/get";
    public const string Count = Default + "/count";
    public const string Create = Default + "/create";
    public const string Update = Default + "/update";
    public const string Delete = Default + "/delete";
    public const string GetById = Default + "/get-permission-by-Id";

    public const string GetPermissionByRoleId = Default + "/get-permission-by-roleId";
    public const string GetAllPermissionPaging = Default + "/get-all-permission-paging";
    public static Dictionary<string, IEnumerable<string>> Action = new Dictionary<string, IEnumerable<string>>
    {
        { "Tìm kiếm", new List<string> {
            Parent,
            Master, Count,
            Get,

        }},
        { "Xem", new List<string> {
            Get, GetById, GetPermissionByRoleId, GetAllPermissionPaging

        }},
        { "Thêm", new List<string> {
            Get, GetById, GetPermissionByRoleId, GetAllPermissionPaging,
            Create

        }},
        { "Sửa", new List<string> {
            Get , GetById , GetPermissionByRoleId , GetAllPermissionPaging,
            Update
        }},
            { "Xóa", new List<string> {
            Get , GetById , GetPermissionByRoleId , GetAllPermissionPaging ,
            Delete
            }},
    };
  }
}
