using AutoMapper;
using Common.Common.ActionResponse;
using Common.Dtos.Department;
using Common.Dtos.District;
using Common.Dtos.MedicalExaminationSchedule;
using Common.Dtos.Province;
using Common.Dtos.User;
using Common.Dtos.Ward;
using Common.Share.Common;
using Common.Share.Enum;
using Common.Share.SeedWorks;
using DnsClient;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Portal.Application.Interfaces;
using Portal.Application.Interfaces.MedicalExaminationSchedule;
using Portal.Application.Repositories.Interfaces.District;
using Portal.Application.Repositories.Interfaces.MedicalExaminationSchedule;
using Portal.Application.Repositories.Interfaces.Province;
using Portal.Application.Repositories.Ward;
using Portal.Domain.Common;
using Portal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Implements.MedicalExaminationSchedule
{
    public class MedicalExaminationScheduleService : IMedicalExaminationScheduleService
    {
        private readonly IProvinceRepository _provinceRepository;
        private readonly IWardRepository _wardRepository;
        private readonly IDistrictRepository _districtRepository;
        private readonly ICurrentContext _currentContext;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMedicalExaminationScheduleRepository _medicalExaminationScheduleRepository;
        public MedicalExaminationScheduleService(IMedicalExaminationScheduleRepository medicalExaminationScheduleRepository, UserManager<AppUser> userManager
          , IMapper mapper, ICurrentContext currentContext, IProvinceRepository provinceRepository,
            IWardRepository wardRepository, IDistrictRepository districtRepository)
        {

            _provinceRepository = provinceRepository;
            _wardRepository = wardRepository;
            _districtRepository = districtRepository;
            _currentContext = currentContext;
            _mapper = mapper;
            _userManager = userManager;
            _medicalExaminationScheduleRepository = medicalExaminationScheduleRepository;
        }

        public async Task<ActionResponse<MedicalExaminationScheduleDto>> Create(CreateUpdateMedicalExaminationSchedule request)
        {
            string codeSchedule = GenerateCode.GenerateCodeSchedule();
            ActionResponse<MedicalExaminationScheduleDto> result = new();
            try
            {
                var medicalExaminationScheduleInDb = _medicalExaminationScheduleRepository.FindByCondition(x => x.Code == codeSchedule).FirstOrDefault();
                if (medicalExaminationScheduleInDb != null)
                {
                    result.Message = "Đã tồn tại hãy thử lại";
                    result.ErrorCode = 500;
                    result.Success = false;
                    return result;
                }
                if (request.AppUserId == null)
                    throw new Exception();
                var userInDb = await _userManager.FindByIdAsync(request.AppUserId);
                if (userInDb == null)
                {
                    result.Message = "Không tồn tại User";
                    result.ErrorCode = 500;
                    result.Success = false;
                    return result;
                }
                var medicalExaminationSchedule = new Portal.Domain.Entities.MedicalExaminationSchedule()
                {
                    Code = codeSchedule,
                    Name = codeSchedule,
                    TimeOfExamination = request.TimeOfExamination,
                    Reason = request.Reason,
                    AppUserId = request.AppUserId.ToString(),
                    CreateBy = _currentContext.AppUserId,
                    PatientReceptionStatus = request.PatientReceptionStatus
                };
                var id = await _medicalExaminationScheduleRepository.CreateAsync(medicalExaminationSchedule);
                if (id is Guid)
                {
                    var medicalExaminationScheduleDto = _mapper.Map<Portal.Domain.Entities.MedicalExaminationSchedule, MedicalExaminationScheduleDto>(medicalExaminationSchedule);
                    result.Message = "Tạo thành công";
                    result.ErrorCode = 200;
                    result.Success = true;
                    result.Data = medicalExaminationScheduleDto;
                }
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

        public async Task<ActionResponse<bool>> Delete(Guid Id)
        {
            ActionResponse<bool> result = new();
            try
            {
                var medicalExaminationSchedule = _medicalExaminationScheduleRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
                if (medicalExaminationSchedule == null)
                {
                    result.Message = "Không tìm thấy medicalExaminationSchedule";
                    result.ErrorCode = 404;
                    result.Success = false;
                    return result;
                }
                await _medicalExaminationScheduleRepository.DeleteAsync(medicalExaminationSchedule);
                result.Message = "Xóa thành công";
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

        public async Task<ActionResponse<bool>> DeleteList(List<Guid> Ids)
        {
            ActionResponse<bool> result = new();
            try
            {
                List<Portal.Domain.Entities.MedicalExaminationSchedule> medicalExaminationSchedules = new();
                foreach (var Id in Ids)
                {
                    var medicalExaminationSchedule = _medicalExaminationScheduleRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
                    if (medicalExaminationSchedule == null)
                    {
                        result.Message = "Không tìm thấy medicalExaminationSchedule";
                        result.ErrorCode = 404;
                        result.Success = false;
                        return result;
                    }
                    medicalExaminationSchedules.Add(medicalExaminationSchedule);
                }
                await _medicalExaminationScheduleRepository.DeleteListAsync(medicalExaminationSchedules);
                result.Message = "Xóa thành công";
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

        public async Task<ActionResponse<List<MedicalExaminationScheduleDto>>> GetAll()
        {
            var lstUser = await _userManager.Users.ToListAsync();
            var lstUserId = lstUser.Select(x => x.Id).ToList();
            ActionResponse<List<MedicalExaminationScheduleDto>> result = new();
            try
            {
                var medicalExaminationSchedules = await _medicalExaminationScheduleRepository.FindAll().Where(x => lstUserId.Contains(x.AppUserId)).ToListAsync();
                var medicalExaminationScheduleDtos = _mapper.Map<List<Portal.Domain.Entities.MedicalExaminationSchedule>, List<MedicalExaminationScheduleDto>>(medicalExaminationSchedules);
                foreach (var medicalExaminationScheduleDto in medicalExaminationScheduleDtos)
                {
                    var id = medicalExaminationScheduleDto.AppUserId;
                    var userInDb = await _userManager.FindByIdAsync(medicalExaminationScheduleDto.AppUserId.ToString());
                    if (userInDb != null)
                    {
                        var userDto = _mapper.Map<AppUser, UserDto>(userInDb);
                        medicalExaminationScheduleDto.User = userDto;
                    }
                    else
                    {
                        throw new Exception();
                    }
                }
                result.Success = true;
                result.ErrorCode = 200;
                result.Data = medicalExaminationScheduleDtos;
                return result;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.ErrorCode = ex.GetHashCode();
                result.Message = ex.Message;
                return result;
            }
        }

        public async Task<ActionResponse<List<MedicalExaminationScheduleDto>>> GetByCreateBy(string Id)
        {
            ActionResponse<List<MedicalExaminationScheduleDto>> result = new();
            try
            {
                DistrictDto districtDto = new();
                WardDto wardDto = new();
                ProvinceDto provinceDto = new();
                var schedules = await _medicalExaminationScheduleRepository.FindByCondition(x => x.CreateBy == Id).ToListAsync();
                var medicalExaminationSchedulesListDtos = _mapper.Map<List<Portal.Domain.Entities.MedicalExaminationSchedule>, List<MedicalExaminationScheduleDto>>(schedules);
                if (medicalExaminationSchedulesListDtos != null)
                {
                    foreach (var medicalExaminationSchedulesListDto in medicalExaminationSchedulesListDtos)
                    {
                        var userInDb = await _userManager.FindByIdAsync(medicalExaminationSchedulesListDto.AppUserId);
                        if (userInDb != null)
                        {
                            var userDto = _mapper.Map<AppUser, UserDto>(userInDb);
                            if (userDto.DistrictId != null && userDto.DistrictId is Guid)
                            {
                                var district = _districtRepository.FindByCondition(x => x.Id == userDto.DistrictId).FirstOrDefault();
                                districtDto = _mapper.Map<Portal.Domain.Entities.District, DistrictDto>(district);

                            }
                            if (userDto.WardId != null && userDto.WardId is Guid)
                            {
                                var ward = _wardRepository.FindByCondition(x => x.Id == userDto.WardId).FirstOrDefault();
                                wardDto = _mapper.Map<Portal.Domain.Entities.Ward, WardDto>(ward);

                            }
                            if (userDto.ProvinceId != null && userDto.ProvinceId is Guid)
                            {
                                var privince = _provinceRepository.FindByCondition(x => x.Id == userDto.ProvinceId).FirstOrDefault();
                                provinceDto = _mapper.Map<Portal.Domain.Entities.Province, ProvinceDto>(privince);

                            }
                            userDto.Province = provinceDto;
                            userDto.Ward = wardDto;
                            userDto.District = districtDto;
                            medicalExaminationSchedulesListDto.User = userDto;
                        }
                        else
                        {
                            throw new Exception();
                        }
                        result.Success = true;
                        result.ErrorCode = 200;
                        result.Data = medicalExaminationSchedulesListDtos;
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.ErrorCode = ex.GetHashCode();
                result.Message = ex.Message;
                return result;
            }
        }

        public async Task<ActionResponse<List<MedicalExaminationScheduleDto>>> GetPagingByUserId(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            ActionResponse<List<MedicalExaminationScheduleDto>> result = new();
            DistrictDto districtDto = new();
            ProvinceDto provinceDto = new();
            WardDto wardDto = new();
            try
            {
                if (user == null)
                {
                    result.Success = true;
                    result.ErrorCode = 200;
                    result.Data = new List<MedicalExaminationScheduleDto>();
                    return result;
                }
                var medicalExaminationSchedules = _medicalExaminationScheduleRepository.FindByCondition(x => x.AppUserId == userId);
                var medicalExaminationSchedulesCreate = _medicalExaminationScheduleRepository.FindByCondition(x => x.CreateBy == userId);

                var medicalExaminationSchedulesAll = (medicalExaminationSchedules.Union(medicalExaminationSchedulesCreate)).ToList();

                if (medicalExaminationSchedulesAll == null || medicalExaminationSchedulesAll.Count() == 0)
                {
                    result.Success = true;
                    result.ErrorCode = 200;
                    result.Data = new List<MedicalExaminationScheduleDto>();
                    return result;
                }

                var medicalExaminationSchedulesListDtos = _mapper.Map<List<Portal.Domain.Entities.MedicalExaminationSchedule>, List<MedicalExaminationScheduleDto>>(medicalExaminationSchedulesAll);
                foreach (var medicalExaminationSchedulesListDto in medicalExaminationSchedulesListDtos)
                {
                    var userInDb = await _userManager.FindByIdAsync(medicalExaminationSchedulesListDto.AppUserId);
                    if (userInDb != null)
                    {
                        var userDto = _mapper.Map<AppUser, UserDto>(userInDb);
                        if (userDto.DistrictId != null && userDto.DistrictId is Guid)
                        {
                            var district = _districtRepository.FindByCondition(x => x.Id == userDto.DistrictId).FirstOrDefault();
                            districtDto = _mapper.Map<Portal.Domain.Entities.District, DistrictDto>(district);

                        }
                        if (userDto.WardId != null && userDto.WardId is Guid)
                        {
                            var ward = _wardRepository.FindByCondition(x => x.Id == userDto.WardId).FirstOrDefault();
                            wardDto = _mapper.Map<Portal.Domain.Entities.Ward, WardDto>(ward);

                        }
                        if (userDto.ProvinceId != null && userDto.ProvinceId is Guid)
                        {
                            var privince = _provinceRepository.FindByCondition(x => x.Id == userDto.ProvinceId).FirstOrDefault();
                            provinceDto = _mapper.Map<Portal.Domain.Entities.Province, ProvinceDto>(privince);

                        }
                        userDto.Ward = wardDto;
                        userDto.Province = provinceDto;
                        userDto.District = districtDto;
                        medicalExaminationSchedulesListDto.User = userDto;
                    }
                    else
                    {
                        throw new Exception();
                    }
                }
                //var pageList = new List<MedicalExaminationScheduleDto>(medicalExaminationSchedulesListDtos, medicalExaminationSchedules.Count(), request.PageIndex, request.PageSize);
                result.Success = true;
                result.ErrorCode = 200;
                result.Data = medicalExaminationSchedulesListDtos;
                return result;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.ErrorCode = ex.GetHashCode();
                result.Message = ex.Message;
                return result;
            }
        }

        public async Task<ActionResponse<MedicalExaminationScheduleDto>> GetById(Guid Id)
        {
            ActionResponse<MedicalExaminationScheduleDto> result = new();
            DistrictDto districtDto = new();
            WardDto wardDto = new();
            ProvinceDto provinceDto = new();
            try
            {
                var medicalExaminationSchedule = _medicalExaminationScheduleRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
                if (medicalExaminationSchedule != null)
                {
                    var medicalExaminationSchedulesListDto = _mapper.Map<Portal.Domain.Entities.MedicalExaminationSchedule, MedicalExaminationScheduleDto>(medicalExaminationSchedule);

                    var userInDb = await _userManager.FindByIdAsync(medicalExaminationSchedulesListDto.AppUserId);
                    if (userInDb != null)
                    {
                        var userDto = _mapper.Map<AppUser, UserDto>(userInDb);
                        if (userDto.DistrictId != null && userDto.DistrictId is Guid)
                        {
                            userDto.DistrictId = userDto.DistrictId;
                            var district = _districtRepository.FindByCondition(x => x.Id == userDto.DistrictId).FirstOrDefault();
                            districtDto = _mapper.Map<Portal.Domain.Entities.District, DistrictDto>(district);

                        }
                        if (userDto.WardId != null && userDto.WardId is Guid)
                        {
                            userDto.WardId = userDto.WardId;
                            var ward = _wardRepository.FindByCondition(x => x.Id == userDto.WardId).FirstOrDefault();
                            wardDto = _mapper.Map<Portal.Domain.Entities.Ward, WardDto>(ward);

                        }
                        if (userDto.ProvinceId != null && userDto.ProvinceId is Guid)
                        {
                            userDto.ProvinceId = userDto.ProvinceId;
                            var privince = _provinceRepository.FindByCondition(x => x.Id == userDto.ProvinceId).FirstOrDefault();
                            provinceDto = _mapper.Map<Portal.Domain.Entities.Province, ProvinceDto>(privince);

                        }
                        userDto.Province = provinceDto;
                        userDto.Ward = wardDto;
                        userDto.District = districtDto;
                        medicalExaminationSchedulesListDto.User = userDto;
                    }
                    result.Success = true;
                    result.ErrorCode = 200;
                    result.Data = medicalExaminationSchedulesListDto;
                    return result;
                }
                result.Success = false;
                result.ErrorCode = 404;
                result.Data = new MedicalExaminationScheduleDto();
                return result;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.ErrorCode = ex.GetHashCode();
                result.Message = ex.Message;
                return result;
            }
        }

        public async Task<ActionResponse<PagedList<MedicalExaminationScheduleDto>>> GetPaging(RequestParameters request)
        {
            var lstUser = await _userManager.Users.ToListAsync();
            var lstIsUser = lstUser.Select(x => x.Id).ToList();
            ActionResponse<PagedList<MedicalExaminationScheduleDto>> result = new();
            DistrictDto districtDto = new();
            WardDto wardDto = new();
            ProvinceDto provinceDto = new();
            try
            {
                var medicalExaminationSchedules = _medicalExaminationScheduleRepository.FindAll().Where(x => lstIsUser.Contains(x.AppUserId));
                var medicalExaminationSchedulesLists = await medicalExaminationSchedules.PageBy(x => x.Id, request.PageIndex, request.PageSize)
                     .ToListAsync();
                var medicalExaminationSchedulesListDtos = _mapper.Map<List<Portal.Domain.Entities.MedicalExaminationSchedule>, List<MedicalExaminationScheduleDto>>(medicalExaminationSchedulesLists);
                foreach (var medicalExaminationSchedulesListDto in medicalExaminationSchedulesListDtos)
                {
                    if (medicalExaminationSchedulesListDto.CreateBy != null)
                    {
                        var userCreateBy = await _userManager.FindByIdAsync(medicalExaminationSchedulesListDto.CreateBy);
                        if (userCreateBy != null)
                        {
                            var userCreateByDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(userCreateBy);
                            medicalExaminationSchedulesListDto.UserCreateBy = userCreateByDto;
                        }
                    }
                    var userInDb = await _userManager.FindByIdAsync(medicalExaminationSchedulesListDto.AppUserId);
                    if (userInDb != null)
                    {
                        var userDto = _mapper.Map<AppUser, UserDto>(userInDb);
                        if (userDto.DistrictId != null && userDto.DistrictId is Guid)
                        {
                            var district = _districtRepository.FindByCondition(x => x.Id == userDto.DistrictId).FirstOrDefault();
                            districtDto = _mapper.Map<Portal.Domain.Entities.District, DistrictDto>(district);

                        }
                        if (userDto.WardId != null && userDto.WardId is Guid)
                        {
                            var ward = _wardRepository.FindByCondition(x => x.Id == userDto.WardId).FirstOrDefault();
                            wardDto = _mapper.Map<Portal.Domain.Entities.Ward, WardDto>(ward);

                        }
                        if (userDto.ProvinceId != null && userDto.ProvinceId is Guid)
                        {
                            var privince = _provinceRepository.FindByCondition(x => x.Id == userDto.ProvinceId).FirstOrDefault();
                            provinceDto = _mapper.Map<Portal.Domain.Entities.Province, ProvinceDto>(privince);

                        }
                        userDto.Province = provinceDto;
                        userDto.Ward = wardDto;
                        userDto.District = districtDto;
                        medicalExaminationSchedulesListDto.User = userDto;
                    }
                    else
                    {
                        throw new Exception();
                    }

                }
                if (medicalExaminationSchedulesListDtos != null && medicalExaminationSchedulesListDtos.Count() > 0)
                {
                    medicalExaminationSchedulesListDtos = medicalExaminationSchedulesListDtos.Where(x => x.UserCreateBy.Code.Contains("BN")).ToList();
                }
                var pageList = new PagedList<MedicalExaminationScheduleDto>(medicalExaminationSchedulesListDtos, medicalExaminationSchedules.Count(), request.PageIndex, request.PageSize);
                result.Success = true;
                result.ErrorCode = 200;
                result.Data = pageList;
                return result;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.ErrorCode = ex.GetHashCode();
                result.Message = ex.Message;
                return result;
            }
        }

        public async Task<ActionResponse<MedicalExaminationScheduleDto>> Update(CreateUpdateMedicalExaminationSchedule request)
        {
            ActionResponse<MedicalExaminationScheduleDto> result = new();
            try
            {
                var medicalExaminationSchedule = _medicalExaminationScheduleRepository.FindByCondition(x => x.Id == request.Id).FirstOrDefault();
                if (medicalExaminationSchedule == null)
                {
                    result.Message = "Không tìm thấy medicalExaminationSchedule";
                    result.ErrorCode = 404;
                    result.Success = false;
                    return result;
                }
                medicalExaminationSchedule.TimeOfExamination = request.TimeOfExamination;
                await _medicalExaminationScheduleRepository.UpdateAsync(medicalExaminationSchedule);
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

        public async Task<ActionResponse<MedicalExaminationScheduleDto>> UpdateStatus(Guid Id, PatientReceptionStatusEnum PatientReceptionStatus)
        {
            ActionResponse<MedicalExaminationScheduleDto> result = new();
            try
            {
                var medicalExaminationSchedule = _medicalExaminationScheduleRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
                if (medicalExaminationSchedule == null)
                {
                    result.Message = "Không tìm thấy medicalExaminationSchedule";
                    result.ErrorCode = 404;
                    result.Success = false;
                    return result;
                }
                medicalExaminationSchedule.PatientReceptionStatus = PatientReceptionStatus;
                await _medicalExaminationScheduleRepository.UpdateAsync(medicalExaminationSchedule);
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
