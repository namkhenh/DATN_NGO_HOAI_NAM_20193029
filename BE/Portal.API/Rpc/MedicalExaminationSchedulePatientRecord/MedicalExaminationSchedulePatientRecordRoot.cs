using Portal.Infrastructure;
using System.Reflection;

namespace Portal.API.Rpc.MedicalExaminationSchedulePatientRecord
{
    public class MedicalExaminationSchedulePatientRecordRoot : Root
    {
        public const string Parent = Module + "/patientrecordservice";
        public const string Master = Module + "/patientrecordservice/patientrecordservice-master";
        public const string Detail = Module + "/patientrecordservice/patientrecordservice-detail/*";
        private const string Default = Rpc + Module + "/patientrecordservice";
        public const string Get = Default + "/get";
        public const string Count = Default + "/count";
        public const string Create = Default + "/create";
        public const string CreateList = Default + "/create-list";
        public const string Update = Default + "/update";
        public const string UpdateStatus = Default + "/update-status";
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
                GetPaging,
                Get,
                GetById,


            }},
            { "Thêm", new List<string> {
                GetPaging,
                Get,
                GetById,
                Create,
                CreateList,

            }},

            { "Sửa", new List<string> {
                GetPaging , Get , GetById,
                UpdateStatus,
                Update,

            }},

             { "Xóa", new List<string> {
                GetPaging , Get , GetById ,
                Delete
             }},

        };
    }
}
