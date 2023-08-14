using Common.Dtos.Department;
using Portal.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.MedicalExaminationService
{
    public class MedicalExaminationServiceDto
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public bool PaymentStatus { get; set; } = false;
        public string Name { get; set; }
        public Guid PatientRecordServiceId { get; set; }
        public Guid DepartmentId { get; set; }
        public DepartmentDto Department { get; set; }
        public decimal AmountOfMoney { get; set; }
        public PatientServiceEnum PatientServiceStatus { get; set; }
    }
}
