using AutoMapper;
using Common.Common.ActionResponse;
using Common.Dtos.CaringInfo;
using Common.Dtos.MedicalExaminationSchedulePatientRecord;
using Common.Dtos.MedicalExaminationService;
using Common.Dtos.PatientRecord;
using Common.Share.SeedWorks;
using Microsoft.EntityFrameworkCore;
using Portal.Application.Interfaces.CaringInfo;
using Portal.Application.Interfaces.MedicalExaminationSchedulePatientRecord;
using Portal.Application.Repositories.Interfaces.CaringInfo;
using Portal.Application.Repositories.Interfaces.MedicalExaminationSchedulePatientRecord;
using Portal.Application.Repositories.Interfaces.MedicalExaminationService;
using Portal.Application.Repositories.Interfaces.PatientRecord;
using Portal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Implements.CaringInfo
{
  public class CaringInfoService : ICaringInfoService
  {
    private readonly IMedicalExaminationServiceRepository _medicalExaminationServiceRepository;
    private readonly IMapper _mapper;
    private readonly IMedicalExaminationSchedulePatientRecordRepository _patientRecordServiceRepository;
    private readonly ICaringInfoRepository _caringInfoRepository;
    private readonly IPatientRecordRepository _patientRecordRepository;
    public CaringInfoService(ICaringInfoRepository caringInfoRepository, IPatientRecordRepository patientRecordRepository
      , IMedicalExaminationSchedulePatientRecordRepository patientRecordServiceRepository, IMapper mapper
      , IMedicalExaminationServiceRepository medicalExaminationServiceRepository)
    {
      _medicalExaminationServiceRepository = medicalExaminationServiceRepository;
      _mapper = mapper;
      _patientRecordServiceRepository = patientRecordServiceRepository;
      _patientRecordRepository = patientRecordRepository;
      _caringInfoRepository = caringInfoRepository;
    }

    public async Task<ActionResponse<bool>> Create(CreateUpdateCaringInfo request)
    {
      ActionResponse<bool> result = new();
      var caringsInDb = await _caringInfoRepository.FindAll().ToListAsync();
      try
      {
        if (caringsInDb.Where(x => x.PatientRecordId == request.PatientRecordId).Any() == true)
        {
          result.Success = false;
          result.Data = false;
          result.Message = "Bệnh án đã tồn tại";
          result.ErrorCode = 200;
          return result;
        }
        Portal.Domain.Entities.CaringInfo create = new();
        create.PatientRecordId = request.PatientRecordId;
        create.Circuit = request.Circuit;
        create.Temperature = request.Temperature;
        create.BloodPressure = request.BloodPressure;
        create.Breathing = request.Breathing;
        create.Height = request.Height;
        create.Weight = request.Weight;
        create.BMI = request.BMI;
        create.PersonalHistory = request.PersonalHistory;
        create.FamilyHistory = request.FamilyHistory;
        create.DrugAlergy = request.DrugAlergy;
        create.PathologicalProcess = request.PathologicalProcess;
        var id =  await _caringInfoRepository.CreateAsync(create);
        if(id is Guid)
        {
          result.Success = true;
          result.Data = true;
          result.Message = "Tạo thành công";
          result.ErrorCode = 200;
          return result;
        }
      }
      catch(Exception ex)
      {
        result.Success = false;
        result.Data = false;
        result.Message = "Tạo thất bại";
        result.ErrorCode = 500;
        return result;
      }
      return result;
     
  }

    public async Task<ActionResponse<bool>> Delete(Guid Id)
    {
      ActionResponse<bool> result = new();
      try
      {
        var caring = await _caringInfoRepository.FindByCondition(x => x.Id == Id).FirstOrDefaultAsync();
        if (caring == null)
        {
          result.Success = false;
          result.Data = false;
          result.Message = "Không tìm thấy bệnh án";
          result.ErrorCode = 404;
          return result;
        }
        await _caringInfoRepository.DeleteAsync(caring);
        result.Success = true;
        result.Data = true;
        result.Message = "Xóa thành công";
        result.ErrorCode = 200;
        return result;
      }
      catch(Exception ex)
      {
        result.Success = false;
        result.Data = false;
        result.Message = "Xóa thất bại";
        result.ErrorCode = 500;
        return result;
      }
    }

    public async Task<ActionResponse<CaringInfoDto>> Detail(Guid Id)
    {
      MedicalExaminationSchedulePatientRecordDto patientRecordServiceDto = new();
      ActionResponse<CaringInfoDto> result = new();
      try
      {
        var caring = await _caringInfoRepository.FindByCondition(x => x.Id == Id).FirstOrDefaultAsync();
        if (caring == null)
        {
          result.Success = false;
          result.Data = new CaringInfoDto();
          result.Message = "Không tìm thấy bệnh án";
          result.ErrorCode = 404;
          return result;
        }
        var caringDto = _mapper.Map<Portal.Domain.Entities.CaringInfo, CaringInfoDto>(caring);
        //if (caringDto.PatientRecordServiceId != null)
        //{
        //  var patientRecordService = await _patientRecordServiceRepository.FindByCondition(x => x.Id == caringDto.PatientRecordServiceId).FirstOrDefaultAsync();
        //  if (patientRecordService == null)
        //  {
        //    result.Success = false;
        //    result.Data = new CaringInfoDto();
        //    result.Message = "Hồ sơ chưa có bệnh án";
        //    result.ErrorCode = 404;
        //    return result;
        //  }
        //  var patientInDb = _patientRecordRepository.FindByCondition(x => x.Id == patientRecordService.PatientRecordId).FirstOrDefault();
        //  if (patientInDb != null)
        //  {
        //    var patientInDbDto = _mapper.Map<Portal.Domain.Entities.PatientRecord,PatientRecordDto>(patientInDb);
        //    patientRecordServiceDto.PatientRecord = patientInDbDto;
        //  }
        //  var medicalService = _medicalExaminationServiceRepository.FindByCondition(x=>x.Id==patientRecordService.MedicalExaminationServiceId).FirstOrDefault();
        //  if(medicalService!=null)
        //  {
        //    var medicalServiceDto = _mapper.Map<Portal.Domain.Entities.MedicalExaminationService, MedicalExaminationServiceDto>(medicalService);
        //    patientRecordServiceDto.MedicalExaminationService = medicalServiceDto;
        //  }
        //  caringDto.PatientRecordService = patientRecordServiceDto;
        //}
        result.Success = true;
        result.ErrorCode = 200;
        result.Data = caringDto;
        return result;
      }
      catch(Exception ex)
      {
        result.Success = true;
        result.ErrorCode = 500;
        result.Message = ex.Message;
        result.Data = new CaringInfoDto();
        return result;
      }
    }

    public Task<ActionResponse<List<CaringInfoDto>>> GetAll()
    {
      throw new NotImplementedException();
    }

    public Task<ActionResponse<PagedList<CaringInfoDto>>> GetPaging(RequestParameters request)
    {
      throw new NotImplementedException();
    }

    public Task<ActionResponse<bool>> Update(CreateUpdateCaringInfo request)
    {
      throw new NotImplementedException();
    }
  }
}
