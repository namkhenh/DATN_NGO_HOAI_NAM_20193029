using Common.Common.ActionResponse;
using Common.Dtos.Payment;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portal.Application.Interfaces.Payment;
using Portal.Application.Repositories.Interfaces.MedicalExaminationSchedulePatientRecord;
using Portal.Application.Repositories.Interfaces.MedicalExaminationService;
using Portal.Application.Repositories.Interfaces.PatientRecord;
using Portal.Application.Repositories.Interfaces.Payment;
using System;
using System.Collections.Generic;
using System.Formats.Tar;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Implements.Payment
{
    public class PaymentService : IPaymentService
    {
        private readonly IPatientRecordRepository _patientRecordRepository;
        private readonly IMedicalExaminationServiceRepository _medicalExaminationServiceRepository;
        private readonly IMedicalExaminationSchedulePatientRecordRepository _medicalExaminationSchedulePatientRecordRepository;
        private readonly IPaymentRepository _paymentRepository;
        public PaymentService(IPaymentRepository paymentRepository, IMedicalExaminationSchedulePatientRecordRepository medicalExaminationSchedulePatientRecordRepository,
            IPatientRecordRepository patientRecordRepository, IMedicalExaminationServiceRepository medicalExaminationServiceRepository)
        {
            _patientRecordRepository = patientRecordRepository;
            _medicalExaminationServiceRepository = medicalExaminationServiceRepository;
            _medicalExaminationSchedulePatientRecordRepository = medicalExaminationSchedulePatientRecordRepository;
            _paymentRepository = paymentRepository;
        }
        public async Task<ActionResponse<bool>> Create(CreateUpdatePayment request)
        {
            ActionResponse<bool> result = new();
            try
            {
                Portal.Domain.Entities.Payment create = new();
                create.MedicalExaminationSchedulePatientRecordId = request.MedicalExaminationSchedulePatientRecordId;
                var id = await _paymentRepository.CreateAsync(create);
                if (id is Guid)
                {
                    result.Message = "Tạo thành công";
                    result.Data = true;
                    result.Success = true;
                    result.ErrorCode = 200;
                }
                return result;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Data = false;
                result.Success = false;
                result.ErrorCode = ex.GetHashCode();
                return result;
            }
        }

        public async Task<ActionResponse<bool>> CreateList(KeyValuePair<Guid, List<Guid>> request)
        {
            ActionResponse<bool> result = new();
            List<Guid> Ids = new();
            var patientRecords = await _patientRecordRepository.FindAll().ToListAsync();
            var services = await _medicalExaminationServiceRepository.FindAll().ToListAsync();
            var patientRecord = patientRecords.Where(x => x.Id == request.Key).FirstOrDefault();
            if (patientRecord == null)
            {
                result.Success = false;
                result.Message = "Không tìm thấy hồ sơ";
                result.ErrorCode = 404;
                return result;
            }
            foreach (var item in request.Value)
            {
                var service = services.Where(x => x.Id == item).FirstOrDefault();
                if (service != null)
                {
                    var patientRecordService = _medicalExaminationSchedulePatientRecordRepository.FindByCondition(x => x.PatientRecordId == request.Key && x.MedicalExaminationServiceId == item).FirstOrDefault();
                    if (patientRecordService != null)
                    {
                        patientRecordService.PatientServiceStatus = Domain.Enums.PatientServiceEnum.Waiting;
                        await _medicalExaminationSchedulePatientRecordRepository.UpdateAsync(patientRecordService);
                        Ids.Add(patientRecordService.Id);
                    }
                    else
                    {
                        result.Success = false;
                        result.Message = $"Không tìm thấy dịch vụ tương ứng {item}";
                        result.ErrorCode = 404;
                        return result;
                    }
                }
                else
                {
                    result.Success = false;
                    result.Message = $"Không tìm thấy dịch vụ tương ứng {item}";
                    result.ErrorCode = 404;
                    return result;
                }
            }
            if (Ids.Count() > 0)
            {
                var paymentCreates = Ids.Select(x => new Portal.Domain.Entities.Payment() { MedicalExaminationSchedulePatientRecordId = x }).ToList();
                await _paymentRepository.CreateListAsync(paymentCreates);
                result.Success = true;
                result.Message = "Thanh toán thành công";
                result.ErrorCode = 200;
                return result;
            }
            else
            {
                result.Success = false;
                result.Message = "Không tìm thấy dịch vụ tương ứng";
                result.ErrorCode = 404;
                return result;
            }
        }

        public async Task<ActionResponse<bool>> Delete(Guid Id)
        {
            ActionResponse<bool> result = new();
            try
            {
                var payment = _paymentRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
                if (payment != null)
                {
                    await _paymentRepository.DeleteAsync(payment);
                    result.Success = true;
                    result.Message = "Xóa thành công";
                    result.Data = true;
                    result.ErrorCode = 200;
                }
                return result;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
                result.Data = false;
                result.ErrorCode = ex.GetHashCode();
                return result;
            }
        }
    }
}
