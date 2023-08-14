using Portal.Infrastructure;
using System.Reflection;

namespace Portal.API.Rpc.payments
{
  public class PaymentRoot : Root
  {
    public const string Parent = Module + "/payment";
    public const string Master = Module + "/payment/payment-master";
    public const string Detail = Module + "/payment/payment-detail/*";
    private const string Default = Rpc + Module + "/payment";
    public const string Get = Default + "/get";
    public const string Count = Default + "/count";
    public const string Create = Default + "/create";
    public const string CreateList = Default + "/create-list";
    public const string Update = Default + "/update";
    public const string Delete = Default + "/delete";
    public const string GetById = Default + "/get-payment-by-Id";
    public const string GetPaging = Default + "/get-paging";
    public const string CreateBySchedule = Default + "/create-by-schedule";


    public static Dictionary<string, IEnumerable<string>> Action = new Dictionary<string, IEnumerable<string>>
    {
        { "Tìm kiếm", new List<string> {
            Parent,
            Master, Count,
            Get,

        }},

        { "Thanh toán", new List<string> {
            Create

        }},
    };
  }
}
