using Portal.Infrastructure;
using System.Reflection;

namespace Portal.API.Rpc.patientrecord
{
    public class PatientRecordRoot : Root
    {
        public const string Parent = Module + "/patientrecord";
        public const string Master = Module + "/patientrecord/patientrecord-master";
        public const string Detail = Module + "/patientrecord/patientrecord-detail/";
        private const string Default = Rpc + Module + "/patientrecord";
        public const string Get = Default + "/get";
        public const string Count = Default + "/count";
        public const string Create = Default + "/create";
        public const string Update = Default + "/update";
        public const string Delete = Default + "/delete";
        public const string GetById = Default + "/get-patientrecord-by-Id";
        public const string GetPaging = Default + "/get-paging";
        public const string CreateBySchedule = Default + "/create-by-schedule";
        public const string UpdateEmergency = Default + "/update-emergency";
        public const string GetPatientRecordByDepartment = Default + "/get-by-department";

        public static Dictionary<string, IEnumerable<string>> Action = new Dictionary<string, IEnumerable<string>>
        {
            { "Tìm kiếm", new List<string> {
                Parent,
                Master, Count,
                Get,

            }},
            { "Xem", new List<string> {
                Get, GetById, GetPaging, GetPatientRecordByDepartment, Detail

            }},
            { "Thêm", new List<string> {
                Get, GetById, GetPaging, GetPatientRecordByDepartment, Detail,
                Create,CreateBySchedule

            }},

            { "Sửa", new List<string> {
                Get, GetById, GetPaging, GetPatientRecordByDepartment,Detail,
                Update,UpdateEmergency
            }},

             { "Xóa", new List<string> {
                Get , GetById , GetPaging , GetPatientRecordByDepartment ,
                Delete ,
             }},

        };
    }
}
