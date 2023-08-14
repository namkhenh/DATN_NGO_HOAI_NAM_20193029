using Portal.Infrastructure;
using System.ComponentModel;
using System.Reflection;

namespace Portal.API.Rpc.user
{
  [DisplayName("Quản lý người dùng")]
  public class UserRoot : Root
  {
    public const string Parent = Module + "/user";
    public const string Master = Module + "/user/user-master";
    private const string Default = Rpc + Module + "/user";
    public const string Get = Default + "/get";
    public const string Count = Default + "/count";
    public const string Create = Default + "/create";
    public const string Update = Default + "/update";
    public const string Delete = Default + "/delete";
    public const string Detail = Default + "/detail";
    public const string DeleteList = Default + "/delete-list";
    public const string Register = Default + "/register";
    public const string Authentication = Default + "/authentication";
    public const string GetUserById = Default + "/get-user-by-id";
    public const string GetUserPaging = Default + "/get-user-paging";
    public const string ChangePassword = Default + "/changepassword";
    public const string ResetPassword = Default + "/resetpassword";
    public const string CheckUserByUserId = Default + "/checkuser-by-userId";
    public const string LockUser = Default + "/lock";
    public const string UnLockUser = Default + "/unlock";
        public const string FindByCode = Default + "/find-by-code";
        public static Dictionary<string, IEnumerable<string>> Action = new Dictionary<string, IEnumerable<string>>
        {
            { "Tìm kiếm", new List<string> {
                Parent,
                Master, Count,
                Get,

            } },

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
                Get
             }},

        };

  }
}
