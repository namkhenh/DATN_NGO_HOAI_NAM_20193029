using Portal.Infrastructure;
using System.ComponentModel;
using System.Reflection;

namespace Portal.API.Rpc.department
{
  [DisplayName("Quản lý Phòng ban")]
  public class DepartmentRoot : Root
  {
    public const string Parent = Module + "/department";
    public const string Master = Module + "/department/department-master";
    public const string Detail = Module + "/department/department-detail/*";
    private const string Default = Rpc + Module + "/department";
    public const string Get = Default + "/get";
    public const string Count = Default + "/count";
    public const string Create = Default + "/create";
    public const string Update = Default + "/update";
    public const string Delete = Default + "/delete";
    public const string GetDepartmentById = Default + "/get-by-id";
    public const string DeleteListDepartment = Default + "/delete-list";
    public const string GetDepartmentPaging = Default + "/get-paging";
    public static Dictionary<string, IEnumerable<string>> Action = new Dictionary<string, IEnumerable<string>>
        {
            { "Tìm kiếm", new List<string> {
                Parent,
                Master, Count,
                Get,

            }},
            { "Xem", new List<string> {
                GetDepartmentPaging ,
                Get

            }},
            { "Thêm", new List<string> {
                GetDepartmentPaging,
                Create,
                Get
            }},

            { "Sửa", new List<string> {
                GetDepartmentPaging,
                Update,
                Get
            }},

             { "Xóa", new List<string> {
                GetDepartmentPaging,
                Delete,
                DeleteListDepartment
             }},

        };
  }
}
