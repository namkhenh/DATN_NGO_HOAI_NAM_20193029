using AutoMapper;
using Common.Common.ActionResponse;
using Common.Dtos.Department;
using Common.Dtos.PageSingal;
using Common.Dtos.User;
using Common.Share.Common;
using Common.Share.SeedWorks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Portal.Application.Interfaces.Department;
using Portal.Application.Repositories.Interfaces.Department;
using Portal.Application.Repositories.Interfaces.PageSingal;
using Portal.Domain.Entities;
using Portal.Infrastructure.Repositories.Implements.PageSingal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Implements.Department
{
    public class DepartmentService : IDepartmentService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IDepartmentRepository _departmentRepository;
        public DepartmentService(IDepartmentRepository departmentRepository, IMapper mapper, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _departmentRepository = departmentRepository;
        }
        public async Task<ActionResponse<DepartmentDto>> CreateDepartment(CreateUpdateDepartment request)
        {
            ActionResponse<DepartmentDto> result = new();
            try
            {
                var departmentInDb = _departmentRepository.FindByCondition(x => x.Code == request.Code).FirstOrDefault();
                if (departmentInDb != null)
                {
                    result.Message = "Đã tồn tại hãy thử lại";
                    result.ErrorCode = 500;
                    result.Success = false;
                    return result;
                }
                var department = new Portal.Domain.Entities.Department()
                {
                    Code = request.Code,
                    Name = request.Name,
                    AppUserId = request.AppUserId
                };
                var id = await _departmentRepository.CreateAsync(department);
                if (id is Guid)
                {
                    var departmentDto = _mapper.Map<Portal.Domain.Entities.Department, DepartmentDto>(department);
                    result.Message = "Tạo thành công";
                    result.ErrorCode = 200;
                    result.Success = true;
                    result.Data = departmentDto;
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

        public async Task<ActionResponse<bool>> DeleteListDepartment(List<Guid> Ids)
        {
            ActionResponse<bool> result = new();
            try
            {
                List<Portal.Domain.Entities.Department> departments = new();
                foreach (var Id in Ids)
                {
                    var department = _departmentRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
                    if (department == null)
                    {
                        result.Message = "Không tìm thấy department";
                        result.ErrorCode = 404;
                        result.Success = false;
                        return result;
                    }
                    departments.Add(department);
                }
                await _departmentRepository.DeleteListAsync(departments);
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

        public async Task<ActionResponse<bool>> DeleteDepartment(Guid Id)
        {
            ActionResponse<bool> result = new();
            try
            {
                var department = _departmentRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
                if (department == null)
                {
                    result.Message = "Không tìm thấy department";
                    result.ErrorCode = 404;
                    result.Success = false;
                    return result;
                }
                await _departmentRepository.DeleteAsync(department);
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

        public async Task<ActionResponse<List<DepartmentDto>>> GetAll()
        {
            ActionResponse<List<DepartmentDto>> result = new();
            try
            {
                var departments = await _departmentRepository.FindAll().ToListAsync();
                if(departments!=null && departments.Count() > 0)
                {
                    var departmentsListDtos = _mapper.Map<List<Portal.Domain.Entities.Department>, List<DepartmentDto>>(departments);
                    foreach (var departmentsListDto in departmentsListDtos)
                    {
                        var user = await _userManager.FindByIdAsync(departmentsListDto.AppUserId);
                        if (user != null)
                        {
                            var userDto = _mapper.Map<AppUser, UserDto>(user);
                            departmentsListDto.User = userDto;
                        }

                    }
                    result.Success = true;
                    result.ErrorCode = 200;
                    result.Data = departmentsListDtos;
                    return result;
                }
                else
                {
                    result.Success = true;
                    result.ErrorCode = 200;
                    result.Data = new List<DepartmentDto>();
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

        public async Task<ActionResponse<PagedList<DepartmentDto>>> GetAllPaging(RequestParameters request)
        {
            ActionResponse<PagedList<DepartmentDto>> result = new();
            try
            {
                var departments = _departmentRepository.FindAll();
                if(departments!=null && departments.Count() > 0)
                {
                    var departmentLists = await departments.PageBy(x => x.Id, request.PageIndex, request.PageSize)
                   .ToListAsync();
                    var departmentListDtos = _mapper.Map<List<Portal.Domain.Entities.Department>, List<DepartmentDto>>(departmentLists);
                    foreach (var department in departmentListDtos)
                    {
                        var user = await _userManager.FindByIdAsync(department.AppUserId);
                        if (user != null)
                        {
                            var userDto = _mapper.Map<AppUser, UserDto>(user);
                            department.User = userDto;
                        }
                    }
                    var pageList = new PagedList<DepartmentDto>(departmentListDtos, departments.Count(), request.PageIndex, request.PageSize);
                    result.Success = true;
                    result.ErrorCode = 200;
                    result.Data = pageList;
                    return result;
                }
                else
                {
                    result.Success = true;
                    result.ErrorCode = 200;
                    result.Data = new PagedList<DepartmentDto>();
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

        public async Task<ActionResponse<DepartmentDto>> GetDepartmentById(Guid Id)
        {
            ActionResponse<DepartmentDto> result = new();
            try
            {
                var department = _departmentRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
                if (department == null)
                {
                    result.Message = "Không tìm thấy department";
                    result.ErrorCode = 404;
                    result.Success = false;
                    return result;
                }
                var departmentDto = _mapper.Map<Portal.Domain.Entities.Department, DepartmentDto>(department);
                var user = await _userManager.FindByIdAsync(department.AppUserId);
                if (user != null)
                {
                    var userDto = _mapper.Map<AppUser, UserDto>(user);
                    departmentDto.User = userDto;
                }
                result.ErrorCode = 200;
                result.Success = true;
                result.Data = departmentDto;
                return result;
            }
            catch (Exception ex)
            {
                result.ErrorCode = ex.GetHashCode();
                result.Success = true;
                result.Message = ex.Message;
                return result;
            }
        }

        public async Task<ActionResponse<DepartmentDto>> UpdateDepartment(CreateUpdateDepartment request)
        {
            ActionResponse<DepartmentDto> result = new();
            try
            {
                var department = _departmentRepository.FindByCondition(x => x.Id == request.Id).FirstOrDefault();
                if (department == null)
                {
                    result.Message = "Không tìm thấy department";
                    result.ErrorCode = 404;
                    result.Success = false;
                    return result;
                }
                department.Name = request.Name;
                department.Code = request.Code;
                department.AppUserId = request.AppUserId;
                await _departmentRepository.UpdateAsync(department);
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

        public Task<ActionResponse<bool>> DeleteListUserToDepartment(List<string> Ids)
        {
            throw new NotImplementedException();
        }

        public Task<ActionResponse<bool>> DeleteUserToDepartment(string Id)
        {
            throw new NotImplementedException();
        }

        public Task<ActionResponse<bool>> AddListUserToDepartment(List<string> Ids)
        {
            throw new NotImplementedException();
        }

        public Task<ActionResponse<bool>> AddUserToDepartment(string Id)
        {
            throw new NotImplementedException();
        }

        public Task<ActionResponse<List<AppUser>>> GetUserByDepartmentId(Guid Id)
        {
            throw new NotImplementedException();
        }
    }
}
