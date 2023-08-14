using Portal.Infrastructure;
using System.ComponentModel;
using System.Reflection;

namespace Portal.API.Rpc.medicalexaminationservice
{
  [DisplayName("Quản lý dịch vụ")]
  public class MedicalExaminationServiceRoot : Root
  {
    public const string Parent = Module + "/medicalexaminationservice";
    public const string Master = Module + "/medicalexaminationservice/medicalexaminationservice-master";
    public const string Detail = Module + "/medicalexaminationservice/medicalexaminationservice-detail/*";
    private const string Default = Rpc + Module + "/medicalexaminationservice";
    public const string Get = Default + "/get";
    public const string Count = Default + "/count";
    public const string Create = Default + "/create";
    public const string Update = Default + "/update";
    public const string Delete = Default + "/delete";
    public const string GetById = Default + "/get-by-id";
    public const string DeleteList = Default + "/delete-list";
    public const string GetPaging = Default + "/get-paging";
    public static Dictionary<string, IEnumerable<string>> Action = new Dictionary<string, IEnumerable<string>>
        {
            { "Tìm kiếm", new List<string> {
                Parent,
                Master, Count,
                Get,
            }},
            { "Xem", new List<string> {
                GetPaging , Get , GetById,

            }},
            { "Thêm", new List<string> {
                GetPaging , Get , GetById,
                Create
            }},
            { "Sửa", new List<string> {
                GetPaging , Get , GetById,
                Update
            }},

             { "Xóa", new List<string> {
                GetPaging , Get , GetById ,
                Delete
             }},

        };
  }
}
