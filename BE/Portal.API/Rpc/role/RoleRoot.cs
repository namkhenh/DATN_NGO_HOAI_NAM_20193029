using Portal.Infrastructure;
using System.ComponentModel;
using System.Reflection;

namespace Portal.API.Rpc.role
{
    [DisplayName("Quản lý vai trò")]
    public class RoleRoot : Root
    {
        public const string Parent = Module + "/role";
        public const string Master = Module + "/role/role-master";
        public const string Detail = Module + "/detail";
        private const string Default = Rpc + Module + "/role";
        public const string Get = Default + "/get";
        public const string Count = Default + "/count";
        public const string Create = Default + "/create";
        public const string Update = Default + "/update";
        public const string Delete = Default + "/delete";
        public const string DeleteListRole = Default + "/delete-list-role";
        public const string GetAllPaging = Default + "/get-paging";
        public const string AssignRolesToUser = Default + "/assign-roles-to-user";
        public const string AssignUsersToRole = Default + "/assign-users-to-role";
        public static Dictionary<string, IEnumerable<string>> Action = new Dictionary<string, IEnumerable<string>>
        {
            { "Tìm kiếm", new List<string> {
                Parent,
                Master, Count,
                Get,

            }},
            { "Xem", new List<string> {
                Get, GetAllPaging

            }},
            { "Thêm", new List<string> {
                Get, GetAllPaging, Create,
                AssignRolesToUser,
                AssignUsersToRole
            }},

            { "Sửa", new List<string> {
                Get , GetAllPaging, Update,
                AssignRolesToUser,
                AssignUsersToRole
            }},

             { "Xóa", new List<string> {
                Get , GetAllPaging,Delete
             }},

        };
    }
}
