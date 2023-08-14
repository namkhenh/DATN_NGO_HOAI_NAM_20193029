using Portal.Infrastructure;
using System.ComponentModel;
using System.Reflection;

namespace Portal.API.Rpc.action
{
    [DisplayName("Quản lý Action")]
    public class ActionRoot : Root
    {
        public const string Parent = Module + "/action";
        public const string Master = Module + "/action/action-master";
        public const string Detail = Module + "/action/action-detail/*";
        private const string Default = Rpc + Module + "/action";
        public const string Get = Default + "/get";
        public const string Count = Default + "/count";
        public const string Create = Default + "/create";
        public const string Update = Default + "/update";
        public const string Delete = Default + "/delete";
        public const string GetAllActionByMenuId = Default + "/get-all-action-by-menuId";
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
