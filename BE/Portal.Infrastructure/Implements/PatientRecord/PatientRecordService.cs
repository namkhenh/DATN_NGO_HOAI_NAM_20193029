using AutoMapper;
using Common.Common.ActionResponse;
using Common.Dtos.Department;
using Common.Dtos.District;
using Common.Dtos.MedicalExaminationSchedule;
using Common.Dtos.MedicalExaminationSchedulePatientRecord;
using Common.Dtos.MedicalExaminationService;
using Common.Dtos.PatientRecord;
using Common.Dtos.Province;
using Common.Dtos.Role;
using Common.Dtos.User;
using Common.Dtos.Ward;
using Common.Share.Common;
using Common.Share.SeedWorks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Portal.Application.Interfaces.PatientRecord;
using Portal.Application.Repositories.Interfaces.CaringInfo;
using Portal.Application.Repositories.Interfaces.CaringInfoDetail;
using Portal.Application.Repositories.Interfaces.Department;
using Portal.Application.Repositories.Interfaces.District;
using Portal.Application.Repositories.Interfaces.MedicalExaminationSchedule;
using Portal.Application.Repositories.Interfaces.MedicalExaminationSchedulePatientRecord;
using Portal.Application.Repositories.Interfaces.MedicalExaminationService;
using Portal.Application.Repositories.Interfaces.PatientRecord;
using Portal.Application.Repositories.Interfaces.Payment;
using Portal.Application.Repositories.Interfaces.Province;
using Portal.Application.Repositories.Ward;
using Portal.Domain.Common;
using Portal.Domain.Entities;
using Portal.Infrastructure.Repositories.Implements.Department;
using Portal.Infrastructure.Repositories.Implements.MedicalExaminationSchedulePatientRecord;
using Portal.Infrastructure.Repositories.Implements.MedicalExaminationService;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MassTransit.ValidationResultExtensions;

namespace Portal.Infrastructure.Implements.PatientRecord
{
  public class PatientRecordService : IPatientRecordService
  {
    private readonly ICaringInfoRepository _caringInfoRepository;
    private readonly ICaringInfoDetailRepository _caringInfoDetailRepository;
    private readonly IPaymentRepository _paymentRepository;
    private readonly IProvinceRepository _provinceRepository;
    private readonly IWardRepository _wardRepository;
    private readonly IDistrictRepository _districtRepository;
    private readonly IMapper _mapper;
    private readonly UserManager<AppUser> _userManager;
    private readonly IMedicalExaminationScheduleRepository _medicalExaminationScheduleRepository;
    private readonly IPatientRecordRepository _patientRecordRepository;
    private readonly IMedicalExaminationSchedulePatientRecordRepository _medicalExaminationSchedulePatientRecordRepository;
    private readonly IMedicalExaminationServiceRepository _medicalExaminationServiceRepository;
    private readonly IDepartmentRepository _departmentRepository;
    public PatientRecordService(IPatientRecordRepository patientRecordRepository, UserManager<AppUser> userManager
        , IMedicalExaminationScheduleRepository medicalExaminationScheduleRepository, IMapper mapper,
        IProvinceRepository provinceRepository, IWardRepository wardRepository, IDistrictRepository districtRepository, IMedicalExaminationSchedulePatientRecordRepository medicalExaminationSchedulePatientRecordRepository, IMedicalExaminationServiceRepository medicalExaminationServiceRepository, IDepartmentRepository departmentRepository
        , IPaymentRepository paymentRepository, ICaringInfoRepository caringInfoRepository,
        ICaringInfoDetailRepository caringInfoDetailRepository)
    {
      _caringInfoRepository = caringInfoRepository;
      _caringInfoDetailRepository = caringInfoDetailRepository;
      _paymentRepository = paymentRepository;
      _provinceRepository = provinceRepository;
      _districtRepository = districtRepository;
      _wardRepository = wardRepository;
      _mapper = mapper;
      _medicalExaminationScheduleRepository = medicalExaminationScheduleRepository;
      _userManager = userManager;
      _patientRecordRepository = patientRecordRepository;
      _medicalExaminationSchedulePatientRecordRepository = medicalExaminationSchedulePatientRecordRepository;
      _medicalExaminationServiceRepository = medicalExaminationServiceRepository;
      _departmentRepository = departmentRepository;
    }

    public async Task<ActionResponse<bool>> Create(CreateUpdatePatientRecord request)
    {
      var codePatientGen = GenerateCode.GenerateCodePatientRecord();
      ActionResponse<bool> result = new();
      try
      {
        var userInDb = await _userManager.FindByIdAsync(request.UserId);
        if (userInDb == null)
        {
          result.Message = "User đã tồn tại";
          result.ErrorCode = 404;
          result.Success = false;
          result.Data = false;
          return result;

        }
        var schedule = _medicalExaminationScheduleRepository.FindByCondition(x => x.Id == request.MedicalExaminationScheduleId).FirstOrDefault();
        if (schedule == null)
        {
          result.Message = "Schedule đã tồn tại";
          result.ErrorCode = 404;
          result.Success = false;
          result.Data = false;
          return result;
        }
        var patientRecordInDb = _patientRecordRepository.FindByCondition(x => x.Code == codePatientGen).FirstOrDefault();
        if (patientRecordInDb != null)
        {
          result.Message = "Hồ sơ đã tồn tại";
          result.ErrorCode = 500;
          result.Success = false;
          result.Data = false;
          return result;
        }
        Portal.Domain.Entities.PatientRecord patientRecord = new();
        patientRecord.Code = codePatientGen;
        patientRecord.Name = codePatientGen;
        patientRecord.Emergency = request.Emergency;
        patientRecord.UserId = request.UserId;
        patientRecord.MedicalExaminationScheduleId = request.MedicalExaminationScheduleId;
        var id = await _patientRecordRepository.CreateAsync(patientRecord);
        if (id is Guid)
        {
          result.Message = "Tạo thành công";
          result.ErrorCode = 200;
          result.Success = true;
          result.Data = true;
        }
        return result;
      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        result.ErrorCode = ex.GetHashCode();
        result.Data = false;
        return result;
      }
    }
    public async Task<ActionResponse<bool>> CreateFromSchedule(CreateUpdatePatientRecord request)
    {
      var codePatientGen = GenerateCode.GenerateCodePatientRecord();
      ActionResponse<bool> result = new();
      try
      {
        var schedule = _medicalExaminationScheduleRepository.FindByCondition(x => x.Id == request.MedicalExaminationScheduleId).FirstOrDefault();
        if (schedule != null)
        {
          result.Message = "Không tìm thấy lịch";
          result.ErrorCode = 404;
          result.Data = false;
          result.Success = false;
          return result;
        }
        request.UserId = schedule.AppUserId;
        var userInDb = await _userManager.FindByIdAsync(request.UserId);
        if (userInDb == null)
        {
          result.Message = "Không tìm thấy User";
          result.ErrorCode = 404;
          result.Data = false;
          result.Success = false;
          return result;
        }
        var patientRecordInDb = _patientRecordRepository.FindByCondition(x => x.Code == codePatientGen).FirstOrDefault();
        if (patientRecordInDb != null)
        {
          result.Message = "Hồ sơ đã tồn tại";
          result.ErrorCode = 500;
          result.Data = false;
          result.Success = false;
          return result;
        }
        Portal.Domain.Entities.PatientRecord patientRecord = new();
        patientRecord.Code = codePatientGen;
        patientRecord.Emergency = request.Emergency;
        patientRecord.Name = codePatientGen;
        patientRecord.UserId = request.UserId;
        patientRecord.MedicalExaminationScheduleId = request.MedicalExaminationScheduleId;
        var id = await _patientRecordRepository.CreateAsync(patientRecord);
        if (id is Guid)
        {
          result.Message = "Tạo thành công";
          result.ErrorCode = 200;
          result.Data = true;
          result.Success = true;
          return result;
        }
        return result;
      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        result.ErrorCode = ex.GetHashCode();
        result.Data = false;
        return result;
      }
    }

    public async Task<ActionResponse<bool>> Delete(Guid Id)
    {
      ActionResponse<bool> result = new();
      try
      {
        var patientRecord = _patientRecordRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
        if (patientRecord == null)
        {
          result.Message = "Không tìm thấy hồ sơ";
          result.ErrorCode = 404;
          result.Data = false;
          result.Success = false;
          return result;
        }
        await _patientRecordRepository.DeleteAsync(patientRecord);
        result.Message = "Xóa thành công";
        result.ErrorCode = 200;
        result.Data = true;
        result.Success = true;
        return result;
      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        result.ErrorCode = ex.GetHashCode();
        result.Data = false;
        result.Success = false;
        return result;
      }
    }

    public async Task<ActionResponse<PatientRecordDto>> Detail(Guid Id)
    {

      var scheduleInDbs = await _medicalExaminationScheduleRepository.FindAll().ToListAsync();
      var patientRecords = await _patientRecordRepository.FindAll().ToListAsync();
      var payments = await _paymentRepository.FindAll().ToListAsync();
      var services = await _medicalExaminationServiceRepository.FindAll().ToListAsync();
      var patientService = await _medicalExaminationSchedulePatientRecordRepository.FindAll().ToListAsync();
      var patientScheduleServices = await _medicalExaminationSchedulePatientRecordRepository.FindAll().ToListAsync();
      var items = from s in scheduleInDbs
                  join p in patientRecords on s.Id equals p.MedicalExaminationScheduleId
                  join ps in patientScheduleServices on p.Id equals ps.PatientRecordId
                  join sv in services on ps.MedicalExaminationServiceId equals sv.Id
                  join pay in payments on ps.Id equals pay.MedicalExaminationSchedulePatientRecordId
                  select new { ScheduleId = sv.Id, PatientId = ps.PatientRecordId };
      var userInDbs = await _userManager.Users.ToListAsync();
      ActionResponse<PatientRecordDto> result = new();
      ProvinceDto province = new();
      WardDto ward = new();
      MedicalExaminationScheduleDto medicalExaminationScheduleDto = new();
      UserDto userDto = new();
      UserDto doctorDto = new();
      DistrictDto districtDto = new();
      List<MedicalExaminationServiceDto> listService = new();
      try
      {
        var patientRecord = _patientRecordRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
        var lstPatientRecord = _medicalExaminationSchedulePatientRecordRepository.FindByCondition(x => x.PatientRecordId == Id).ToList();
        var lstPatientRecordDtos = _mapper.Map<List<Domain.Entities.MedicalExaminationSchedulePatientRecord>, List<MedicalExaminationSchedulePatientRecordDto>>(lstPatientRecord);
        if (patientRecord != null)
        {
          var patientRecordDto = _mapper.Map<Portal.Domain.Entities.PatientRecord, PatientRecordDto>(patientRecord);
          if (patientRecordDto.MedicalExaminationScheduleId != null)
          {
            var medicalExaminationScheduleDtoInDb = _medicalExaminationScheduleRepository.FindByCondition(x => x.Id == patientRecordDto.MedicalExaminationScheduleId).FirstOrDefault();
            if (medicalExaminationScheduleDtoInDb != null)
            {
              medicalExaminationScheduleDto = _mapper.Map<Portal.Domain.Entities.MedicalExaminationSchedule, MedicalExaminationScheduleDto>(medicalExaminationScheduleDtoInDb);
            }
            if (patientRecordDto.UserId != null)
            {
              var userInDb = userInDbs.Where(x => x.Id == patientRecordDto.UserId).FirstOrDefault();
              if (userInDb != null)
              {
                userDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(userInDb);
                if (userInDb.ProvinceId != null)
                {
                  var provinceInDb = _provinceRepository.FindByCondition(x => x.Id == userInDb.ProvinceId).FirstOrDefault();
                  userDto.Province = _mapper.Map<Portal.Domain.Entities.Province, ProvinceDto>(provinceInDb);
                }
                if (userInDb.DistrictId != null)
                {
                  var districtInDb = _districtRepository.FindByCondition(x => x.Id == userInDb.DistrictId).FirstOrDefault();
                  userDto.District = _mapper.Map<Portal.Domain.Entities.District, DistrictDto>(districtInDb);

                }
                if (userInDb.WardId != null)
                {
                  var wardInDb = _wardRepository.FindByCondition(x => x.Id == userInDb.WardId).FirstOrDefault();
                  userDto.Ward = _mapper.Map<Portal.Domain.Entities.Ward, WardDto>(wardInDb);

                }
              }
            }

          }
          if (lstPatientRecordDtos != null && lstPatientRecordDtos.Count > 0)
          {
            foreach (var lstPatientRecordDto in lstPatientRecordDtos)
            {
              var medicalExaminationService = _medicalExaminationServiceRepository.FindByCondition(x => x.Id == lstPatientRecordDto.MedicalExaminationServiceId).FirstOrDefault();
              if (medicalExaminationService != null)
              {
                var serviceDto = _mapper.Map<Portal.Domain.Entities.MedicalExaminationService, MedicalExaminationServiceDto>(medicalExaminationService);
                var departmentDto = new DepartmentDto();
                var department = _departmentRepository.FindByCondition(x => x.Id == medicalExaminationService.DepartmentId).FirstOrDefault();
                if (department != null)
                {
                  departmentDto = _mapper.Map<Portal.Domain.Entities.Department, DepartmentDto>(department);
                  if (departmentDto.AppUserId != null)
                  {
                    var doctorInDb = await _userManager.FindByIdAsync(department.AppUserId);
                    doctorDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(doctorInDb);
                    departmentDto.User = doctorDto;
                  }
                  else
                  {
                    departmentDto.User = new UserDto();
                  }
                }
                serviceDto.Department = departmentDto;
                serviceDto.PatientRecordServiceId = lstPatientRecordDto.Id;
                serviceDto.PatientServiceStatus = lstPatientRecordDto.PatientServiceStatus;
                listService.Add(serviceDto);
              }
            }
          }
          foreach (var service in listService)
          {
            if (items.Any(x => x.ScheduleId == service.Id && x.PatientId == Id) == true)
            {
              service.PaymentStatus = true;
            }
          }
          patientRecordDto.MedicalExaminationSchedule = medicalExaminationScheduleDto;
          patientRecordDto.User = userDto;
          patientRecordDto.Service = listService;
          result.Success = true;
          result.Data = patientRecordDto;
          result.ErrorCode = 200;
        }
        else
        {
          result.Message = "Không tìm thấy hồ sơ";
          result.Data = new PatientRecordDto();
          result.ErrorCode = 404;
        }
        return result;
      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        result.Data = new PatientRecordDto();
        result.ErrorCode = 500;
        return result;
      }

    }

    public async Task<ActionResponse<List<PatientRecordDto>>> GetAll()
    {
      ActionResponse<List<PatientRecordDto>> result = new();
      var schedulesInDb = await _medicalExaminationScheduleRepository.FindAll().ToListAsync();
      var usersInDb = await _userManager.Users.ToListAsync();
      var userIdsInDb = usersInDb.Select(x => x.Id).ToList();
      ProvinceDto province = new();
      WardDto ward = new();
      DistrictDto districtDto = new();
      var allRecords = await _patientRecordRepository.FindAll().Where(x => userIdsInDb.Contains(x.UserId)).OrderBy(x => x.Emergency).OrderBy(x => x.CreatedDate).ToListAsync();
      if (usersInDb != null && allRecords != null && usersInDb.Count() > 0 && allRecords.Count() > 0)
      {
        var patientRecordDtos = _mapper.Map<List<Portal.Domain.Entities.PatientRecord>, List<PatientRecordDto>>(allRecords);
        foreach (var patientRecordDto in patientRecordDtos)
        {
          if (usersInDb.Any(x => x.Id == patientRecordDto.UserId) == true)
          {
            var userInDb = usersInDb.Where(x => x.Id == patientRecordDto.UserId).FirstOrDefault();
            patientRecordDto.User = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(userInDb);
            if (userInDb.ProvinceId is Guid)
            {
              var provinceInDb = _provinceRepository.FindByCondition(x => x.Id == userInDb.ProvinceId).FirstOrDefault();
              patientRecordDto.User.Province = _mapper.Map<Portal.Domain.Entities.Province, ProvinceDto>(provinceInDb);
            }
            if (userInDb.DistrictId is Guid)
            {
              var districtInDb = _districtRepository.FindByCondition(x => x.Id == userInDb.DistrictId).FirstOrDefault();
              patientRecordDto.User.District = _mapper.Map<Portal.Domain.Entities.District, DistrictDto>(districtInDb);
            }
            if (userInDb.WardId is Guid)
            {
              var wardInDb = _wardRepository.FindByCondition(x => x.Id == userInDb.ProvinceId).FirstOrDefault();
              patientRecordDto.User.Ward = _mapper.Map<Portal.Domain.Entities.Ward, WardDto>(wardInDb);
            }
          }
          if (schedulesInDb.Any(x => x.Id == patientRecordDto.MedicalExaminationScheduleId) == true)
          {
            MedicalExaminationScheduleDto scheduleDto = new();
            var schedule = schedulesInDb.Where(x => x.Id == patientRecordDto.MedicalExaminationScheduleId).FirstOrDefault();
            if (schedule != null)
            {
              scheduleDto = _mapper.Map<Portal.Domain.Entities.MedicalExaminationSchedule, MedicalExaminationScheduleDto>(schedule);
            }
            patientRecordDto.MedicalExaminationSchedule = scheduleDto;
          }
        }
        result.Data = patientRecordDtos;
        result.Success = true;
        result.ErrorCode = 200;
        return result;
      }
      result.Data = new List<PatientRecordDto>();
      result.Success = true;
      return result;
    }

    public async Task<ActionResponse<PagedList<PatientRecordDto>>> GetAllPaging(RequestParameters request)
    {
      var schedulesInDb = await _medicalExaminationScheduleRepository.FindAll().ToListAsync();
      var usersInDb = await _userManager.Users.ToListAsync();
      var userIdsInDb = usersInDb.Select(x => x.Id).ToList();
      ActionResponse<PagedList<PatientRecordDto>> result = new();
      var lstPatientRecords = _patientRecordRepository.FindAll().Where(x => userIdsInDb.Contains(x.UserId));
      if (lstPatientRecords.Count() <= 0)
      {
        result.Data = new PagedList<PatientRecordDto>();
        result.Success = true;
        result.ErrorCode = 200;
        return result;
      }
      var lstPatientsPaging = await lstPatientRecords.PageBy(x => x.Id, request.PageIndex, request.PageSize)
     .OrderBy(x => x.Emergency).OrderBy(x => x.CreatedDate).ToListAsync();
      var patientRecordDtos = _mapper.Map<List<Portal.Domain.Entities.PatientRecord>, List<PatientRecordDto>>(lstPatientsPaging);
      patientRecordDtos = patientRecordDtos.Where(x => userIdsInDb.Contains(x.UserId)).ToList();

      foreach (var patientRecord in patientRecordDtos)
      {
        var userInDb = usersInDb.Where(x => x.Id == patientRecord.UserId).FirstOrDefault();
        patientRecord.User = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(userInDb);
        if (userInDb.ProvinceId is Guid)
        {
          var provinceInDb = _provinceRepository.FindByCondition(x => x.Id == userInDb.ProvinceId).FirstOrDefault();
          patientRecord.User.Province = _mapper.Map<Portal.Domain.Entities.Province, ProvinceDto>(provinceInDb);
        }
        if (userInDb.DistrictId is Guid)
        {
          var districtInDb = _districtRepository.FindByCondition(x => x.Id == userInDb.DistrictId).FirstOrDefault();
          patientRecord.User.District = _mapper.Map<Portal.Domain.Entities.District, DistrictDto>(districtInDb);
        }
        if (userInDb.WardId is Guid)
        {
          var wardInDb = _wardRepository.FindByCondition(x => x.Id == userInDb.ProvinceId).FirstOrDefault();
          patientRecord.User.Ward = _mapper.Map<Portal.Domain.Entities.Ward, WardDto>(wardInDb);
        }
        if (schedulesInDb.Any(x => x.Id == patientRecord.MedicalExaminationScheduleId) == true)
        {
          MedicalExaminationScheduleDto scheduleDto = new();
          var schedule = schedulesInDb.Where(x => x.Id == patientRecord.MedicalExaminationScheduleId).FirstOrDefault();
          if (schedule != null)
          {
            scheduleDto = _mapper.Map<Portal.Domain.Entities.MedicalExaminationSchedule, MedicalExaminationScheduleDto>(schedule);
          }
          patientRecord.MedicalExaminationSchedule = scheduleDto;
        }
      }
      var pageList = new PagedList<PatientRecordDto>(patientRecordDtos, lstPatientRecords.Count(), request.PageIndex, request.PageSize);
      result.Success = true;
      result.ErrorCode = 200;
      result.Data = pageList;
      return result;
    }

    public async Task<ActionResponse<PagedList<MedicalExaminationSchedulePatientRecordDto>>> GetPatientRecordByDepartment(Guid Id, RequestParameters request)
    {
      ActionResponse<PagedList<MedicalExaminationSchedulePatientRecordDto>> result = new();
      var payments = await _paymentRepository.FindAll().ToListAsync();
      var provinces = await _provinceRepository.FindAll().ToListAsync();
      var districts = await _districtRepository.FindAll().ToListAsync();
      var wards = await _wardRepository.FindAll().ToListAsync();
      var users = await _userManager.Users.ToListAsync();
      var departments = await _departmentRepository.FindAll().ToListAsync();
      var lstPatients = await _patientRecordRepository.FindAll().ToListAsync();
      var services = await _medicalExaminationServiceRepository.FindAll().ToListAsync();
      var patientServices = _medicalExaminationSchedulePatientRecordRepository.FindAll();
      var lstPatientsPaging = await patientServices.PageBy(x => x.Id, request.PageIndex, request.PageSize).ToListAsync();
      var patientRecordServiceDtos = _mapper.Map<List<Portal.Domain.Entities.MedicalExaminationSchedulePatientRecord>, List<MedicalExaminationSchedulePatientRecordDto>>(lstPatientsPaging);

      var items = from ps in patientServices
                  join p in payments on ps.Id equals p.MedicalExaminationSchedulePatientRecordId
                  select new { ps.PatientRecordId, ps.MedicalExaminationServiceId };

      foreach (var patientRecordService in patientRecordServiceDtos)
      {
        if (patientRecordService.PatientRecordId != null)
        {
          var patientDto = GetPatientRecordDto(patientRecordService.PatientRecordId, lstPatients, users, provinces, districts, wards);
          patientRecordService.PatientRecord = patientDto;
        }
        if (patientRecordService.MedicalExaminationServiceId != null)
        {
          var serviceDto = GetService(patientRecordService.MedicalExaminationServiceId, services, departments, users, provinces, districts, wards);
          patientRecordService.MedicalExaminationService = serviceDto;
        }
      }
      patientRecordServiceDtos = patientRecordServiceDtos.Where(x => x.MedicalExaminationService.DepartmentId == Id).ToList();
      if (patientRecordServiceDtos.Count() > 0 && items.Count() > 0)
      {
        patientRecordServiceDtos = patientRecordServiceDtos.Where(x => items.Any(item => item.MedicalExaminationServiceId == x.Id && item.PatientRecordId == x.PatientRecordId) == true).ToList();

      }
      var pageList = new PagedList<MedicalExaminationSchedulePatientRecordDto>(patientRecordServiceDtos, patientServices.Count(), request.PageIndex, request.PageSize);
      result.Success = true;
      result.ErrorCode = 200;
      result.Data = pageList;
      return result;
    }
    private PatientRecordDto GetPatientRecordDto(Guid Id, List<Portal.Domain.Entities.PatientRecord> items, List<Portal.Domain.Entities.AppUser> users
        , List<Portal.Domain.Entities.Province> provinces, List<Portal.Domain.Entities.District> districts,
        List<Portal.Domain.Entities.Ward> wards)
    {
      PatientRecordDto result = new();

      if (items.Any(x => x.Id == Id) == true)
      {
        var patientRecordFound = items.Where(x => x.Id == Id).FirstOrDefault();
        result = _mapper.Map<Portal.Domain.Entities.PatientRecord, PatientRecordDto>(patientRecordFound);
        if (result.UserId != null)
        {
          var user = users.Where(x => x.Id == result.UserId).FirstOrDefault();
          var userDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(user);
          if (userDto.ProvinceId != null)
          {
            var province = provinces.Where(x => x.Id == userDto.ProvinceId).FirstOrDefault();
            var provinceDto = _mapper.Map<Portal.Domain.Entities.Province, ProvinceDto>(province);
            userDto.Province = provinceDto;
          }
          if (userDto.DistrictId != null)
          {
            var district = districts.Where(x => x.Id == userDto.DistrictId).FirstOrDefault();
            var districtDto = _mapper.Map<Portal.Domain.Entities.District, DistrictDto>(district);
            userDto.District = districtDto;
          }
          if (userDto.WardId != null)
          {
            var ward = wards.Where(x => x.Id == userDto.WardId).FirstOrDefault();
            var wardDto = _mapper.Map<Portal.Domain.Entities.Ward, WardDto>(ward);
            userDto.Ward = wardDto;
          }
          result.User = userDto;
        }

        return result;
      }
      return result;
    }
    private MedicalExaminationServiceDto GetService(Guid Id, List<Portal.Domain.Entities.MedicalExaminationService> items, List<Portal.Domain.Entities.Department> departments
       , List<Portal.Domain.Entities.AppUser> users, List<Portal.Domain.Entities.Province> provinces, List<Portal.Domain.Entities.District> districts,
        List<Portal.Domain.Entities.Ward> wards)
    {
      MedicalExaminationServiceDto result = new();
      if (items.Any(x => x.Id == Id) == true)
      {
        var serviceFound = items.Where(x => x.Id == Id).FirstOrDefault();
        result = _mapper.Map<Portal.Domain.Entities.MedicalExaminationService, MedicalExaminationServiceDto>(serviceFound);
        if (result.DepartmentId != null)
        {
          var department = departments.Where(x => x.Id == result.DepartmentId).FirstOrDefault();
          if (department != null)
          {
            result.Department = _mapper.Map<Portal.Domain.Entities.Department, DepartmentDto>(department);
            if (result.Department != null)
            {
              var user = users.Where(x => x.Id == result.Department.AppUserId).FirstOrDefault();
              var userDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(user);
              if (userDto.ProvinceId != null)
              {
                var province = provinces.Where(x => x.Id == userDto.ProvinceId).FirstOrDefault();
                var provinceDto = _mapper.Map<Portal.Domain.Entities.Province, ProvinceDto>(province);
                userDto.Province = provinceDto;
              }
              if (userDto.DistrictId != null)
              {
                var district = districts.Where(x => x.Id == userDto.DistrictId).FirstOrDefault();
                var districtDto = _mapper.Map<Portal.Domain.Entities.District, DistrictDto>(district);
                userDto.District = districtDto;
              }
              if (userDto.WardId != null)
              {
                var ward = wards.Where(x => x.Id == userDto.WardId).FirstOrDefault();
                var wardDto = _mapper.Map<Portal.Domain.Entities.Ward, WardDto>(ward);
                userDto.Ward = wardDto;
              }
              result.Department.User = userDto;
            }
          }

        }


        return result;
      }
      return result;
    }
    public async Task<ActionResponse<bool>> Update(CreateUpdatePatientRecord request)
    {
      ActionResponse<bool> result = new();
      try
      {
        var patientRecord = _patientRecordRepository.FindByCondition(x => x.Id == request.Id).FirstOrDefault();
        if (patientRecord == null)
        {
          result.Message = "Không tìm thấy hồ sơ";
          result.ErrorCode = 404;
          result.Success = true;
          result.Data = false;
          return result;
        }
        patientRecord.UserId = request.UserId;
        patientRecord.Emergency = request.Emergency;
        await _patientRecordRepository.UpdateAsync(patientRecord);
        result.Success = true;
        result.ErrorCode = 200;
        return result;

      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        result.ErrorCode = ex.GetHashCode();
        result.Success = false;
        result.Data = false;
        return result;
      }
    }

    public async Task<ActionResponse<bool>> UpdateEmergency(Guid Id, bool status)
    {
      ActionResponse<bool> result = new();
      try
      {
        var patientRecord = await _patientRecordRepository.FindByCondition(x => x.Id == Id).FirstOrDefaultAsync();
        if (patientRecord == null)
        {
          result.Success = false;
          result.Data = false;
          result.ErrorCode = 404;
          result.Message = "Không tìm thấy";
          return result;
        }
        result.Success = true;
        result.Data = true;
        patientRecord.Emergency = status;
        await _patientRecordRepository.UpdateAsync(patientRecord);
        return result;
      }
      catch (Exception ex)
      {
        result.Success = false;
        result.Data = false;
        result.ErrorCode = 500;
        result.Message = ex.Message;
        return result;
      }
    }
  }
}
