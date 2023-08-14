using AutoMapper;
using Common.Common.ActionResponse;
using Common.Dtos.Department;
using Common.Dtos.District;
using Common.Dtos.MedicalExaminationSchedule;
using Common.Dtos.MedicalExaminationSchedulePatientRecord;
using Common.Dtos.MedicalExaminationService;
using Common.Dtos.PatientRecord;
using Common.Dtos.Province;
using Common.Dtos.User;
using Common.Dtos.Ward;
using Common.Share.Common;
using Common.Share.Enum;
using Common.Share.SeedWorks;
using MassTransit.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Portal.Application.Interfaces.MedicalExaminationSchedulePatientRecord;
using Portal.Application.Repositories.Interfaces.Department;
using Portal.Application.Repositories.Interfaces.District;
using Portal.Application.Repositories.Interfaces.MedicalExaminationSchedule;
using Portal.Application.Repositories.Interfaces.MedicalExaminationSchedulePatientRecord;
using Portal.Application.Repositories.Interfaces.MedicalExaminationService;
using Portal.Application.Repositories.Interfaces.PatientRecord;
using Portal.Application.Repositories.Interfaces.Province;
using Portal.Application.Repositories.Ward;
using Portal.Domain.Entities;
using Portal.Domain.Enums;
using Portal.Infrastructure.Repositories.Implements.Department;
using Portal.Infrastructure.Repositories.Implements.District;
using Portal.Infrastructure.Repositories.Implements.MedicalExaminationSchedule;
using Portal.Infrastructure.Repositories.Implements.MedicalExaminationService;
using Portal.Infrastructure.Repositories.Implements.Province;
using Portal.Infrastructure.Repositories.Implements.Ward;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZstdSharp.Unsafe;

namespace Portal.Infrastructure.Implements.MedicalExaminationSchedulePatientRecord
{
    public class MedicalExaminationSchedulePatientRecordService : IMedicalExaminationSchedulePatientRecordService
    {
        private readonly IMapper _mapper;
        private readonly IPatientRecordRepository _patientRecordRepository;
        private readonly IMedicalExaminationSchedulePatientRecordRepository _medicalExaminationSchedulePatientRecordRepository;
        private readonly IMedicalExaminationScheduleRepository _medicalExaminationScheduleRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IProvinceRepository _provinceRepository;
        private readonly IWardRepository _wardRepository;
        private readonly IDistrictRepository _districtRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IMedicalExaminationServiceRepository _medicalExaminationServiceRepository;
        public MedicalExaminationSchedulePatientRecordService(IMedicalExaminationSchedulePatientRecordRepository medicalExaminationSchedulePatientRecordRepository
        , IPatientRecordRepository patientRecordRepository, IMapper mapper, IMedicalExaminationScheduleRepository medicalExaminationScheduleRepository, IProvinceRepository provinceRepository, IWardRepository wardRepository, IDistrictRepository districtRepository, UserManager<AppUser> userManager, IDepartmentRepository departmentRepository, IMedicalExaminationServiceRepository medicalExaminationServiceRepository)
        {
            _mapper = mapper;
            _patientRecordRepository = patientRecordRepository;
            _medicalExaminationSchedulePatientRecordRepository = medicalExaminationSchedulePatientRecordRepository;
            _medicalExaminationScheduleRepository = medicalExaminationScheduleRepository;
            _userManager = userManager;
            _provinceRepository = provinceRepository;
            _districtRepository = districtRepository;
            _wardRepository = wardRepository;
            _departmentRepository = departmentRepository;
            _medicalExaminationServiceRepository = medicalExaminationServiceRepository;
        }

        public async Task<ActionResponse<bool>> Create(CreateUpdateMedicalExaminationSchedulePatientRecord request)
        {
            ActionResponse<bool> result = new();
            var lstPatientServiceInDbs = await _medicalExaminationSchedulePatientRecordRepository.FindAll().ToListAsync();
            try
            {
                if (lstPatientServiceInDbs != null && lstPatientServiceInDbs.Count() > 0)
                {
                    if (lstPatientServiceInDbs.Where(x => x.PatientRecordId == request.PatientRecordId && x.MedicalExaminationServiceId == request.MedicalExaminationServiceId).Any() == true)
                    {
                        result.Success = false;
                        result.Message = "Đã tồn tại";
                        result.ErrorCode = 404;
                        result.Data = false;
                        return result;
                    }

                }
                Portal.Domain.Entities.MedicalExaminationSchedulePatientRecord create = new();
                create.PatientRecordId = request.PatientRecordId;
                create.MedicalExaminationServiceId = request.MedicalExaminationServiceId;
                var id = await _medicalExaminationSchedulePatientRecordRepository.CreateAsync(create);
                if (id is Guid)
                {
                    result.Success = true;
                    result.Message = "Tạo thành công";
                    result.ErrorCode = 200;
                    result.Data = true;
                }
                return result;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
                result.ErrorCode = ex.GetHashCode();
                result.Data = false;
                return result;
            }
        }

        public async Task<ActionResponse<bool>> CreateList(KeyValuePair<Guid, List<Guid>> requests)
        {
            List<Portal.Domain.Entities.MedicalExaminationSchedulePatientRecord> createList = new();
            ActionResponse<bool> result = new();
            var lstPatientServiceInDbs = await _medicalExaminationSchedulePatientRecordRepository.FindAll().ToListAsync();
            try
            {
                foreach (var request in requests.Value)
                {
                    if (lstPatientServiceInDbs != null)
                    {
                        if (lstPatientServiceInDbs.Any(x => x.PatientRecordId == requests.Key && x.MedicalExaminationServiceId == request) == true)
                        {
                            continue;
                        }
                        else
                        {
                            Portal.Domain.Entities.MedicalExaminationSchedulePatientRecord create = new();
                            create.PatientRecordId = requests.Key;
                            create.MedicalExaminationServiceId = request;
                            createList.Add(create);
                        }
                    }
                }
                await _medicalExaminationSchedulePatientRecordRepository.CreateListAsync(createList);
                result.Success = true;
                result.Message = "Tạo thành công";
                result.ErrorCode = 200;
                result.Data = true;
                return result;
            }
            catch (Exception ex)
            {
                result.Success = false;
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
                var patientRecordService = await _medicalExaminationSchedulePatientRecordRepository.FindByCondition(x => x.Id == Id).FirstOrDefaultAsync();
                if (patientRecordService == null)
                {
                    result.Success = false;
                    result.Message = "Không tìm thấy";
                    result.ErrorCode = 404;
                    result.Data = false;
                    return result;
                }
                await _medicalExaminationSchedulePatientRecordRepository.DeleteAsync(patientRecordService);
                result.Success = true;
                result.Message = "Xóa thành công";
                result.ErrorCode = 200;
                result.Data = true;
                return result;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
                result.ErrorCode = ex.GetHashCode();
                result.Data = false;
                return result;
            }
        }

        public async Task<ActionResponse<bool>> DeleteList(List<Guid> Ids)
        {
            ActionResponse<bool> result = new();
            var lstPatientRecordServices = await _medicalExaminationSchedulePatientRecordRepository.FindAll().ToListAsync();
            try
            {
                List<Portal.Domain.Entities.MedicalExaminationSchedulePatientRecord> lstDelete = new();
                foreach (var id in Ids)
                {
                    var item = lstPatientRecordServices.Where(x => x.Id == id).FirstOrDefault();
                    if (item != null)
                    {
                        lstDelete.Add(item);
                    }
                }
                await _medicalExaminationSchedulePatientRecordRepository.DeleteListAsync(lstDelete);
                result.Success = true;
                result.Message = "Xóa thành công";
                result.Data = true;
                result.ErrorCode = 200;
                return result;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
                result.ErrorCode = 200;
                result.Data = false;
                return result;
            }
        }

        public async Task<ActionResponse<List<MedicalExaminationSchedulePatientRecordDto>>> GetAll()
        {
            ActionResponse<List<MedicalExaminationSchedulePatientRecordDto>> result = new();
            MedicalExaminationScheduleDto medicalExaminationScheduleDto = new();
            ProvinceDto province = new();
            WardDto ward = new();
            UserDto userDto = new();
            DistrictDto districtDto = new();
            var userInDbs = await _userManager.Users.ToListAsync();
            try
            {
                var lstPatientRecord = await _medicalExaminationSchedulePatientRecordRepository.FindAll().ToListAsync();
                if (lstPatientRecord == null || lstPatientRecord.Count() == 0)
                {
                    lstPatientRecord = new List<Domain.Entities.MedicalExaminationSchedulePatientRecord>();
                }
                var lstPatientRecordDtos = _mapper.Map<List<Domain.Entities.MedicalExaminationSchedulePatientRecord>, List<MedicalExaminationSchedulePatientRecordDto>>(lstPatientRecord);
                if (lstPatientRecordDtos != null)
                {
                    foreach (var lstPatientRecordDto in lstPatientRecordDtos)
                    {
                        var patientRecord = _patientRecordRepository.FindByCondition(x => x.Id == lstPatientRecordDto.PatientRecordId).FirstOrDefault();
                        var medicalExaminationService = _medicalExaminationServiceRepository.FindByCondition(x => x.Id == lstPatientRecordDto.MedicalExaminationServiceId).FirstOrDefault();
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
                            patientRecordDto.MedicalExaminationSchedule = medicalExaminationScheduleDto;
                            patientRecordDto.User = userDto;
                            lstPatientRecordDto.PatientRecord= patientRecordDto;
                        }
                        if(medicalExaminationService != null)
                        {
                            var serviceDto = _mapper.Map<Portal.Domain.Entities.MedicalExaminationService, MedicalExaminationServiceDto>(medicalExaminationService);
                            var departmentDto = new DepartmentDto();
                            var department = _departmentRepository.FindByCondition(x => x.Id == medicalExaminationService.DepartmentId).FirstOrDefault();
                            if (department != null)
                            {
                                departmentDto = _mapper.Map<Portal.Domain.Entities.Department, DepartmentDto>(department);
                                if (departmentDto.AppUserId != null)
                                {
                                    var userInDb = await _userManager.FindByIdAsync(department.AppUserId);
                                    userDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(userInDb);
                                    departmentDto.User = userDto;
                                }
                                else
                                {
                                    departmentDto.User = new UserDto();
                                }
                            }
                            serviceDto.Department = departmentDto;
                            lstPatientRecordDto.MedicalExaminationService = serviceDto;
                        }
                    }
                    result.Success = true;
                    result.Data = lstPatientRecordDtos;
                    result.ErrorCode = 200;
                    return result;
                }
                return result;
            }
                
      catch (Exception ex)
            {
                result.Success = false;
                result.Data = new List<MedicalExaminationSchedulePatientRecordDto>();
                result.ErrorCode = ex.GetHashCode();
                return result;
            }
        }

        public async Task<ActionResponse<PagedList<MedicalExaminationSchedulePatientRecordDto>>> GetAllPaging(RequestParameters request)
        {
            ActionResponse<PagedList<MedicalExaminationSchedulePatientRecordDto>> result = new();
            MedicalExaminationScheduleDto medicalExaminationScheduleDto = new();
            ProvinceDto province = new();
            WardDto ward = new();
            UserDto userDto = new();
            DistrictDto districtDto = new();
            var userInDbs = await _userManager.Users.ToListAsync();
            try
            {
                var lstPatientRecord = _medicalExaminationSchedulePatientRecordRepository.FindAll();
                if (lstPatientRecord != null && lstPatientRecord.Count() == 0)
                {
                    result.Data = new PagedList<MedicalExaminationSchedulePatientRecordDto>();
                    result.Success = true;
                    result.ErrorCode = 200;
                    return result;
                }
                var lstPatientRecordPaging = await lstPatientRecord.PageBy(x => x.Id, request.PageIndex, request.PageSize)
                 .ToListAsync();
                var lstPatientRecordDtos = _mapper.Map<List<Portal.Domain.Entities.MedicalExaminationSchedulePatientRecord>, List<MedicalExaminationSchedulePatientRecordDto>>(lstPatientRecordPaging);
                if (lstPatientRecordDtos != null)
                {
                    foreach (var lstPatientRecordDto in lstPatientRecordDtos)
                    {
                        var patientRecord = _patientRecordRepository.FindByCondition(x => x.Id == lstPatientRecordDto.PatientRecordId).FirstOrDefault();
                        var medicalExaminationService = _medicalExaminationServiceRepository.FindByCondition(x => x.Id == lstPatientRecordDto.MedicalExaminationServiceId).FirstOrDefault();
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
                            patientRecordDto.MedicalExaminationSchedule = medicalExaminationScheduleDto;
                            patientRecordDto.User = userDto;
                            lstPatientRecordDto.PatientRecord = patientRecordDto;
                        }
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
                                    var userInDb = await _userManager.FindByIdAsync(department.AppUserId);
                                    userDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(userInDb);
                                    departmentDto.User = userDto;
                                }
                                else
                                {
                                    departmentDto.User = new UserDto();
                                }
                            }
                            serviceDto.Department = departmentDto;
                            lstPatientRecordDto.MedicalExaminationService = serviceDto;
                        }
                    }
                    var pageList = new PagedList<MedicalExaminationSchedulePatientRecordDto>(lstPatientRecordDtos, lstPatientRecord.Count(), request.PageIndex, request.PageSize);
                    result.Success = true;
                    result.Data = pageList;
                    result.ErrorCode = 200;
                    return result;
                }
                result.Success = true;
                result.Data = new PagedList<MedicalExaminationSchedulePatientRecordDto>();
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new PagedList<MedicalExaminationSchedulePatientRecordDto>();
                result.Success = false;
                result.ErrorCode = ex.GetHashCode();
                return result;
            }
        }

        public async Task<ActionResponse<MedicalExaminationSchedulePatientRecordDto>> Detail(Guid Id)
        {
            ActionResponse<MedicalExaminationSchedulePatientRecordDto> result = new();
            MedicalExaminationScheduleDto medicalExaminationScheduleDto = new();
            ProvinceDto province = new();
            WardDto ward = new();
            UserDto userDto = new();
            DistrictDto districtDto = new();
            var userInDbs = await _userManager.Users.ToListAsync();
            try
            {
                var lstPatientRecord = _medicalExaminationSchedulePatientRecordRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
                var lstPatientRecordDtos = _mapper.Map<Domain.Entities.MedicalExaminationSchedulePatientRecord, MedicalExaminationSchedulePatientRecordDto>(lstPatientRecord);
                if (lstPatientRecord == null)
                {
                    result.Data = new MedicalExaminationSchedulePatientRecordDto();
                    result.Success = true;
                    result.ErrorCode = 404;
                    result.Message = "Không tìm thấy hồ sơ";
                    return result;
                } else
                {
                    var patientRecord = _patientRecordRepository.FindByCondition(x => x.Id == lstPatientRecord.PatientRecordId).FirstOrDefault();
                    var medicalExaminationService = _medicalExaminationServiceRepository.FindByCondition(x => x.Id == lstPatientRecord.MedicalExaminationServiceId).FirstOrDefault();
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
                        patientRecordDto.MedicalExaminationSchedule = medicalExaminationScheduleDto;
                        patientRecordDto.User = userDto;
                        lstPatientRecordDtos.PatientRecord = patientRecordDto;
                    }
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
                                var userInDb = await _userManager.FindByIdAsync(department.AppUserId);
                                userDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(userInDb);
                                departmentDto.User = userDto;
                            }
                            else
                            {
                                departmentDto.User = new UserDto();
                            }
                        }
                        serviceDto.Department = departmentDto;
                        lstPatientRecordDtos.MedicalExaminationService = serviceDto;
                    }
                    result.Success = true;
                    result.Data = lstPatientRecordDtos;
                    result.ErrorCode = 200;
                    return result;
                }
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Data = new MedicalExaminationSchedulePatientRecordDto();
                result.ErrorCode = 500;
                return result;
            }
        }

        public async Task<ActionResponse<MedicalExaminationSchedulePatientRecordDto>> UpdateStatus(Guid Id, PatientServiceEnum PatientServiceStatus)
        {
            ActionResponse<MedicalExaminationSchedulePatientRecordDto> result = new();
            try
            {
                var medicalExaminationSchedulePatientRecord = _medicalExaminationSchedulePatientRecordRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
                if (medicalExaminationSchedulePatientRecord == null)
                {
                    result.Message = "Không tìm thấy medicalExaminationSchedule";
                    result.ErrorCode = 404;
                    result.Success = false;
                    return result;
                }
                medicalExaminationSchedulePatientRecord.PatientServiceStatus = PatientServiceStatus;
                await _medicalExaminationSchedulePatientRecordRepository.UpdateAsync(medicalExaminationSchedulePatientRecord);
                result.Message = "Cập nhập thành công";
                result.ErrorCode = 200;
                result.Success = true;
                return result;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.ErrorCode = ex.GetHashCode();
                result.Success = false;
                return result;
            }
        }
    }
}
