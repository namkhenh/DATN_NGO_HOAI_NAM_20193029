using MongoDB.Driver.Core.Configuration;
using Portal.Infrastructure;
using System.ComponentModel;
using System.Reflection;

namespace Portal.API.Rpc.medicalexaminationschedule
{
    [DisplayName("Quản lý Đặt lịch")]
    public class MedicalExaminationScheduleRoot : Root
    {
        public const string Parent = Module + "/medicalexaminationschedule";
        public const string Master = Module + "/medicalexaminationschedule/medicalexaminationschedule-master";
        public const string Detail = Module + "/medicalexaminationschedule/medicalexaminationschedule-detail";
        private const string Default = Rpc + Module + "/medicalexaminationschedule";
        public const string Get = Default + "/get";
        public const string Count = Default + "/count";
        public const string Create = Default + "/create";
        public const string Update = Default + "/update";
        public const string Delete = Default + "/delete";
        public const string GetById = Default + "/get-by-id";
        public const string DeleteList = Default + "/delete-list";
        public const string GetPaging = Default + "/get-paging";
        public const string UpdateStatus = Default + "/update-status";
        public const string GetPagingByUserId = Default + "/get-paging-by-userId";
        public const string GetByCreateBy = Default + "/get-by-createBy";
        public static Dictionary<string, IEnumerable<string>> Action = new Dictionary<string, IEnumerable<string>>
        {
            { "Tìm kiếm", new List<string> {
                Parent,
                Master, Count,
                Get,

            }},
            {
                 "Xem", new List<string> {
                GetPaging,
                GetPagingByUserId,
                GetByCreateBy,
                GetById
            }
            },
            { "Thêm", new List<string> {
                Create,
                GetPaging,
                GetPagingByUserId,
                GetByCreateBy,
                GetById
            }},
            { "Sửa", new List<string> {
                GetPaging,
                GetPagingByUserId,
                GetByCreateBy,
                GetById,
                Update

            }},
            { "Duyệt lịch", new List<string> {
                GetPaging,
                GetPagingByUserId,
                GetByCreateBy,
                GetById,
                UpdateStatus,

            }},
             { "Xóa", new List<string> {
                GetPaging,
                GetPagingByUserId,
                GetByCreateBy,
                GetById,
                 Delete
             }},

        };
    }
}
