using Common.Contract.Domain.Interfaces;
using Common.Contract.Domain;
using Portal.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Domain.Entities
{
    public class CaringInfo : EntityAuditBase<Guid>, IEntityBase<Guid>
    {
        //thông tin sống và tiền sử bệnh sẽ đi cùng hồ sơ
        public Guid PatientRecordId { get; set; }
        public decimal Circuit { get; set; }
        public decimal Temperature { get; set; }
        public decimal BloodPressure { get; set; }
        public decimal Breathing { get; set; }
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        public decimal BMI { get; set; }
        public string PersonalHistory { get; set; }
        public string FamilyHistory { get; set; }
        public string DrugAlergy { get; set; }
        public string PathologicalProcess { get; set; }
        
    }
}
