using Portal.Infrastructure;
using System.Reflection;

namespace Portal.API.Rpc.Caring
{
  public class CaringRoot : Root
  {
    public const string Parent = Module + "/caring";
    private const string Default = Rpc + Module + "/patientrecord";
    public const string Get = Default + "/get";
    public const string Count = Default + "/count";
    public const string Create = Default + "/create-caring";
    public const string Update = Default + "/update-caring";
    public const string CreateCaringInfo = Default + "/create-caringInfoDetail";
    public const string UpdateCaringInfo = Default + "/update-caringinfoDetail";


    public static Dictionary<string, IEnumerable<string>> Action = new Dictionary<string, IEnumerable<string>>
        {
            { "Tìm kiếm", new List<string> {
                 
                Get,

            }},

            { "Thêm", new List<string> {
                Count,
                Get,

            }},

            { "Sửa", new List<string> {
              
            }},

             { "Xóa", new List<string> {
             
             }},

        };
  }
}
