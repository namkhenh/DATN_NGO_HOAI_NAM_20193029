using AutoMapper;
using Common.Common.ActionResponse;
using Common.Dtos.Department;
using Common.Dtos.MedicalExaminationSchedule;
using Common.Dtos.MedicalExaminationService;
using Common.Dtos.User;
using Common.Share.Common;
using Common.Share.SeedWorks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Portal.Application.Interfaces.MedicalExaminationService;
using Portal.Application.Repositories.Interfaces.Department;
using Portal.Application.Repositories.Interfaces.MedicalExaminationService;
using Portal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Implements.MedicalExaminationService
{
    public class MedicalExaminationServiceService : IMedicalExaminationServiceService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IMedicalExaminationServiceRepository _medicalExaminationServiceRepository;
        public MedicalExaminationServiceService(IMedicalExaminationServiceRepository medicalExaminationServiceRepository
          , IDepartmentRepository departmentRepository, IMapper mapper, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _departmentRepository = departmentRepository;
            _medicalExaminationServiceRepository = medicalExaminationServiceRepository;
        }

        public async Task<ActionResponse<MedicalExaminationServiceDto>> Create(CreateUpdateMedicalExaminationService request)
        {
            ActionResponse<MedicalExaminationServiceDto> result = new();
            try
            {
                var medicalExaminationServiceInDb = _medicalExaminationServiceRepository.FindByCondition(x => x.Code == request.Code).FirstOrDefault();
                if (medicalExaminationServiceInDb != null)
                {
                    result.Message = "Đã tồn tại hãy thử lại";
                    result.ErrorCode = 500;
                    result.Success = false;
                    return result;
                }
                if (request.DepartmentId == null)
                    throw new Exception();

                var departmentInDb = _departmentRepository.FindByCondition(x => x.Id == request.DepartmentId).FirstOrDefault();
                if (departmentInDb == null)
                {
                    result.Message = "Không tồn tại department";
                    result.ErrorCode = 500;
                    result.Success = false;
                    return result;
                }
                var medicalExaminationService = new Portal.Domain.Entities.MedicalExaminationService()
                {
                    Code = request.Code,
                    Name = request.Name,
                    DepartmentId = request.DepartmentId,
                    AmountOfMoney = request.AmountOfMoney,
                };
                var id = await _medicalExaminationServiceRepository.CreateAsync(medicalExaminationService);
                if (id is Guid)
                {
                    var medicalExaminationServiceDto = _mapper.Map<Portal.Domain.Entities.MedicalExaminationService, MedicalExaminationServiceDto>(medicalExaminationService);
                    result.Message = "Tạo thành công";
                    result.ErrorCode = 200;
                    result.Success = true;
                    result.Data = medicalExaminationServiceDto;
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
                var medicalExaminationService = _medicalExaminationServiceRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
                if (medicalExaminationService == null)
                {
                    result.Message = "Không tìm thấy medicalExaminationService";
                    result.ErrorCode = 404;
                    result.Success = false;
                    return result;
                }
                await _medicalExaminationServiceRepository.DeleteAsync(medicalExaminationService);
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
                List<Portal.Domain.Entities.MedicalExaminationService> medicalExaminationServices = new();
                foreach (var Id in Ids)
                {
                    var medicalExaminationService = _medicalExaminationServiceRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
                    if (medicalExaminationService == null)
                    {
                        result.Message = "Không tìm thấy medicalExaminationService";
                        result.ErrorCode = 404;
                        result.Success = false;
                        return result;
                    }
                    medicalExaminationServices.Add(medicalExaminationService);
                }
                await _medicalExaminationServiceRepository.DeleteListAsync(medicalExaminationServices);
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

        public async Task<ActionResponse<List<MedicalExaminationServiceDto>>> GetAll()
        {
            ActionResponse<List<MedicalExaminationServiceDto>> result = new();
            try
            {
                var medicalExaminationServices = await _medicalExaminationServiceRepository.FindAll().ToListAsync();
                if (medicalExaminationServices != null && medicalExaminationServices.Count() > 0)
                {
                    var medicalExaminationScheduleDtos = _mapper.Map<List<Portal.Domain.Entities.MedicalExaminationService>, List<MedicalExaminationServiceDto>>(medicalExaminationServices);
                    foreach (var medicalExaminationScheduleDto in medicalExaminationScheduleDtos)
                    {
                        var departmentDto = new DepartmentDto();
                        var department = _departmentRepository.FindByCondition(x => x.Id == medicalExaminationScheduleDto.DepartmentId).FirstOrDefault();
                        if (department != null)
                        {
                            UserDto userDto = new();
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

                        medicalExaminationScheduleDto.Department = departmentDto;
                    }
                    result.Success = true;
                    result.ErrorCode = 200;
                    result.Data = medicalExaminationScheduleDtos;
                    return result;
                }
                else
                {
                    result.Success = true;
                    result.ErrorCode = 200;
                    result.Data = new List<MedicalExaminationServiceDto>();
                    return result;
                }

            }
            catch (Exception ex)
            {
                result.Success = false;
                result.ErrorCode = ex.GetHashCode();
                result.Message = ex.Message;
                return result;
            }
        }

        public async Task<ActionResponse<PagedList<MedicalExaminationServiceDto>>> GetPaging(RequestParameters request)
        {
            ActionResponse<PagedList<MedicalExaminationServiceDto>> result = new();
            try
            {
                var medicalExaminationServices = _medicalExaminationServiceRepository.FindAll();
                if (medicalExaminationServices != null && medicalExaminationServices.Count() > 0)
                {
                    var medicalExaminationServicesLists = await medicalExaminationServices.PageBy(x => x.Id, request.PageIndex, request.PageSize)
                    .ToListAsync();
                    var medicalExaminationServiceListDtos = _mapper.Map<List<Portal.Domain.Entities.MedicalExaminationService>, List<MedicalExaminationServiceDto>>(medicalExaminationServicesLists);
                    foreach (var medicalExaminationScheduleDto in medicalExaminationServiceListDtos)
                    {
                        var userDto = new UserDto();
                        var departmentDto = new DepartmentDto();
                        var department = _departmentRepository.FindByCondition(x => x.Id == medicalExaminationScheduleDto.DepartmentId).FirstOrDefault();
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
                       
                        medicalExaminationScheduleDto.Department = departmentDto;
                    }
                    var pageList = new PagedList<MedicalExaminationServiceDto>(medicalExaminationServiceListDtos, medicalExaminationServices.Count(), request.PageIndex, request.PageSize);
                    result.Success = true;
                    result.ErrorCode = 200;
                    result.Data = pageList;
                    return result;

                }
                else
                {
                    result.Success = true;
                    result.ErrorCode = 200;
                    result.Data = new PagedList<MedicalExaminationServiceDto>();
                    return result;
                }
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.ErrorCode = ex.GetHashCode();
                result.Message = ex.Message;
                return result;
            }
        }

        public async Task<ActionResponse<MedicalExaminationServiceDto>> Update(CreateUpdateMedicalExaminationService request)
        {
            ActionResponse<MedicalExaminationServiceDto> result = new();
            try
            {
                var medicalExaminationService = _medicalExaminationServiceRepository.FindByCondition(x => x.Id == request.Id).FirstOrDefault();
                if (medicalExaminationService == null)
                {
                    result.Message = "Không tìm thấy medicalExaminationService";
                    result.ErrorCode = 404;
                    result.Success = false;
                    return result;
                }
                var departmentInDb = _departmentRepository.FindByCondition(x => x.Id == request.DepartmentId).FirstOrDefault();
                if (departmentInDb == null)
                {
                    result.Message = "Không tồn tại department";
                    result.ErrorCode = 500;
                    result.Success = false;
                    return result;
                }
                medicalExaminationService.Name = request.Name;
                medicalExaminationService.AmountOfMoney = request.AmountOfMoney;
                medicalExaminationService.DepartmentId = request.DepartmentId;

                await _medicalExaminationServiceRepository.UpdateAsync(medicalExaminationService);
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
