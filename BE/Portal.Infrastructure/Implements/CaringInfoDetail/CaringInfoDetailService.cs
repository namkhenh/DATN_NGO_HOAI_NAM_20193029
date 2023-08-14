using Common.Common.ActionResponse;
using Common.Dtos.CaringInfoDetail;
using Portal.Application.Interfaces.CaringInfoDetail;
using Portal.Application.Repositories.Interfaces.CaringInfo;
using Portal.Application.Repositories.Interfaces.CaringInfoDetail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Implements.CaringInfoDetail
{
  public class CaringInfoDetailService : ICaringInfoDetailService
  {
    private readonly ICaringInfoRepository _caringInfoRepository;
    private readonly ICaringInfoDetailRepository _caringInfoDetailRepository;
    public CaringInfoDetailService(ICaringInfoRepository caringInfoRepository, ICaringInfoDetailRepository caringInfoDetailRepository)
    {
      _caringInfoRepository = caringInfoRepository;
      _caringInfoDetailRepository = caringInfoDetailRepository;
    }

    public async Task<ActionResponse<bool>> Create(CreateUpdateCaringInfoDetail request)
    {
      ActionResponse<bool> result = new();
      var caringInDb = _caringInfoRepository.FindByCondition(x => x.Id == request.CaringInfoId).FirstOrDefault();
      if(caringInDb== null) {
        result.Message = "Không có bệnh án ";
        result.Success = false;
        result.ErrorCode = 404;
        return result;
      }
      try
      {
        Portal.Domain.Entities.CaringInfoDetail caringInfoDetail = new();
        caringInfoDetail.Body = request.Body;
        caringInfoDetail.BodyPart = request.BodyPart;
        caringInfoDetail.PreliminaryDiagnosis = request.PreliminaryDiagnosis;
        caringInfoDetail.ComorbiditiesDiagnosis = request.ComorbiditiesDiagnosis;
        caringInfoDetail.ExamStartTime = request.ExamStartTime;
        caringInfoDetail.ExamEndTime = request.ExamEndTime;
        caringInfoDetail.Conclude = request.Conclude;
        caringInfoDetail.ICD10 = request.ICD10;
        caringInfoDetail.DiseasesInclude = request.DiseasesInclude;
        caringInfoDetail.HealthCondition = request.HealthCondition;
        caringInfoDetail.PatientRecordServiceId = request.PatientRecordServiceId;
        caringInfoDetail.CaringInfoId = request.CaringInfoId;
        var id= await _caringInfoDetailRepository.CreateAsync(caringInfoDetail);
        if(id is Guid)
        {
          result.Message = "Tạo bệnh án thành công";
          result.Success = true;
          result.ErrorCode = 200;
          
        }
        return result;
      }
      catch(Exception ex)
      {
        result.Message = "Tạo bệnh án thất bại";
        result.Success = true;
        result.ErrorCode = 500;
        return result;
      }
     
      
     }

    public async Task<ActionResponse<bool>> Update(CreateUpdateCaringInfoDetail request)
    {
      ActionResponse<bool> result = new();
      try
      {
        var caringInfoDetail = _caringInfoDetailRepository.FindByCondition(x => x.Id == request.Id).FirstOrDefault();
        if (caringInfoDetail != null)
        {
          caringInfoDetail.Body = request.Body;
          caringInfoDetail.BodyPart = request.BodyPart;
          caringInfoDetail.PreliminaryDiagnosis = request.PreliminaryDiagnosis;
          caringInfoDetail.ComorbiditiesDiagnosis = request.ComorbiditiesDiagnosis;
          caringInfoDetail.ExamStartTime = request.ExamStartTime;
          caringInfoDetail.ExamEndTime = request.ExamEndTime;
          caringInfoDetail.Conclude = request.Conclude;
          caringInfoDetail.ICD10 = request.ICD10;
          caringInfoDetail.DiseasesInclude = request.DiseasesInclude;
          caringInfoDetail.HealthCondition = request.HealthCondition;
          await _caringInfoDetailRepository.UpdateAsync(caringInfoDetail);
          result.Message = "Tạo bệnh án thành công";
          result.Success = true;
          result.ErrorCode = 200;
        }
        else
        {
          result.Message = "Không tìm thấy bệnh án";
          result.Success = false;
          result.ErrorCode = 404;
        }
        return result;
     
      }catch(Exception ex)
      {
        result.Message = "Tạo bệnh án thất bại";
        result.Success = false;
        result.ErrorCode = 500;
        return result;
      }
    }
  }
}
