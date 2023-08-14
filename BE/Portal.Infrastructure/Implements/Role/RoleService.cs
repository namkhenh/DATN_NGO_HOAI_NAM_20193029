using AutoMapper;
using Common.Common.ActionResponse;
using Common.Dtos.Menu;
using Common.Dtos.Role;
using Common.Dtos.User;
using Common.Share.Common;
using Common.Share.SeedWorks;
using MassTransit.Transactions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Portal.Application.Interfaces.Role;
using Portal.Application.Repositories.Interfaces.Permission;
using Portal.Domain.Common;
using Portal.Domain.Entities;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Implements.Role
{
  public class RoleService : IRoleService
  {
    private readonly IPermissionRepository _permissionRepository;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<AppUser> _userManager;
    private readonly IMapper _mapper;
    private readonly RoleManager<AppRole> _roleManager;
    public RoleService(RoleManager<AppRole> roleManager, IMapper mapper, UserManager<AppUser> userManager
      , ApplicationDbContext context, IPermissionRepository permissionRepository)
    {
      _permissionRepository = permissionRepository;
      _context = context;
      _userManager = userManager;
      _mapper = mapper;
      _roleManager = roleManager;
    }

    public async Task<ActionResponse<bool>> AssignRolesToUser(string userId, List<string> roleIds)
    {
      ActionResponse<bool> result = new();
      try
      {
        var roleInDbs = await _roleManager.Roles.ToListAsync();
        var user = await _userManager.FindByIdAsync(userId);

        if (user != null)
        {
          var roleRemove = await _userManager.GetRolesAsync(user);
          if (roleIds.Any())
          {
            await _userManager.RemoveFromRolesAsync(user, roleRemove);
          }
          List<string> rolesName = new();
          foreach (var role in roleIds)
          {
            if (roleInDbs.Any(x => x.Id == role) == true)
            {
              var roleInDb = roleInDbs.Where(x => x.Id == role).FirstOrDefault();
              var checkRole = await _userManager.IsInRoleAsync(user, roleInDb.Name);
              if (checkRole == false)
              {
                rolesName.Add(roleInDb.Name);
              }
            }
          }
          await _userManager.AddToRolesAsync(user, rolesName);
          var roleInUser = await _userManager.GetRolesAsync(user);
          if (roleInUser == null || roleInUser.Count() == 0)
          {
            user.Code = GenerateCode.GenerateCodeDefault();
          }
          else
          {
            if (roleInUser.Any(x => x.ToLower() == "Admin".ToLower()))
            {
              user.Code = GenerateCode.GenerateCodeAdmin();
            }
            else
            {
              user.Code = GenerateCode.GenerateCodeDoctor();
            }
          }
          await _userManager.UpdateAsync(user);
          result.Success = true;
          result.ErrorCode = 200;
          result.Message = "Gán quyền thành công";
          result.Data = true;
          return result;
        }
        else
        {
          result.Success = false;
          result.ErrorCode = 500;
          result.Message = "Gán quyền thất bại";
          result.Data = false;
          return result;
        }
      
      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        result.ErrorCode = ex.GetHashCode();
        result.Success = false;
        return result;
      }

    }

    public async Task<ActionResponse<bool>> AssignUsersToRole(string roleId, List<string> userIds)
    {
      ActionResponse<bool> result = new();
      try
      {
        var userInDbs = await _userManager.Users.ToListAsync();
        var roleInDb = await _roleManager.FindByIdAsync(roleId);
        if (userInDbs != null && roleInDb != null && userInDbs.Count() > 0)
        {
          var userRoleInDbRemoves = await _context.UserRoles.Where(x => x.RoleId == roleId).ToListAsync();
          if(userRoleInDbRemoves!=null && userRoleInDbRemoves.Count() > 0)
          {
            _context.RemoveRange(userRoleInDbRemoves);
            await _context.SaveChangesAsync();
          }
          foreach (var user in userIds)
          {
            var userInDb = userInDbs.Where(x => x.Id == user).FirstOrDefault();
            if (userInDb != null)
            {
              var checkRole = await _userManager.IsInRoleAsync(userInDb, roleInDb.Name);
              if (checkRole == false)
              {
                await _userManager.AddToRoleAsync(userInDb, roleInDb.Name);
                var roleInUser = await _userManager.GetRolesAsync(userInDb);
                if(roleInUser!=null && roleInUser.Count() == 0)
                {
                  userInDb.Code = GenerateCode.GenerateCodeDefault();
                }
                else
                {
                  if (roleInUser.Any(x => x.ToLower() == "Admin".ToLower()))
                  {
                    userInDb.Code = GenerateCode.GenerateCodeAdmin();
                  }
                  else
                  {
                    userInDb.Code = GenerateCode.GenerateCodeDoctor();
                  }
                }
                await _userManager.UpdateAsync(userInDb);
              }
            }
          }
          result.Success = true;
          result.ErrorCode = 200;
          result.Message = "Gán quyền thành công";
          result.Data = true;
        }
        else
        {
          result.Success = false;
          result.ErrorCode = 500;
          result.Message = "Gán quyền thất bại";
          result.Data = false;
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

    public async Task<ActionResponse<RoleDto>> CreateRole(CreateUpdateRole request)
    {
      ActionResponse<RoleDto> result = new();
      try
      {
        var roleInDb = _roleManager.Roles.Where(x => x.Name == request.Name || x.Code == request.Code).FirstOrDefault();
        if (roleInDb != null)
        {
          result.Success = false;
          result.ErrorCode = 500;
          result.Message = "Role đã tồn tại";
          return result;
        }
        var role = new Portal.Domain.Entities.AppRole()
        {
          Code = request.Code,
          Name = request.Name,
          StartDate = request.StartDate,
          EndDate = request.EndDate,
          Status = request.Status,
          Description = request.Description,
        };
        var res = await _roleManager.CreateAsync(role);
        var roleDto = _mapper.Map<Portal.Domain.Entities.AppRole, RoleDto>(role);
        result.Success = true;
        result.ErrorCode = 200;
        result.Message = "Tạo vai trò thành công";
        result.Data = roleDto;
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

    public async Task<ActionResponse<bool>> DeleteListRole(List<string> Ids)
    {
      var permissionInDbs = await _permissionRepository.FindAll().ToListAsync();
      var roles = await _roleManager.Roles.ToListAsync();
      ActionResponse<bool> result = new();
      try
      {
        foreach (var Id in Ids)
        {
          var roleInDb = roles.Where(x => x.Id == Id).FirstOrDefault();
          if (roleInDb == null)
          {
            result.Message = "Không tìm thấy role";
            result.ErrorCode = 404;
            result.Success = false;
            return result;
          }
          var resultDelete = await _roleManager.DeleteAsync(roleInDb);
          if (resultDelete.Succeeded == true)
          {
            var permissionsInRole = permissionInDbs.Where(x => x.RoleId == roleInDb.Id).ToList();
            if (permissionsInRole != null && permissionsInRole.Count > 0)
            {
              await _permissionRepository.DeleteListAsync(permissionsInRole);
            }
          }
        }

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

    public async Task<ActionResponse<RoleDto>> DeleteRole(string Id)
    {
      ActionResponse<RoleDto> result = new();
      try
      {
        var roleInDb = await _roleManager.FindByIdAsync(Id);
        if (roleInDb != null)
        {
          var res = await _roleManager.DeleteAsync(roleInDb);
          if (res.Succeeded)
          {
            var permissions = await _permissionRepository.FindByCondition(x => x.RoleId == Id).ToListAsync();
            if (permissions != null && permissions.Count() > 0)
            {
              await _permissionRepository.DeleteListAsync(permissions);
            }
            var roleDto = _mapper.Map<Portal.Domain.Entities.AppRole, RoleDto>(roleInDb);
            result.Success = true;
            result.ErrorCode = 200;
            result.Message = "Xóa vai trò thành công";
            result.Data = roleDto;
          }
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

    public async Task<ActionResponse<List<RoleDto>>> GetAllRole()
    {
      ActionResponse<List<RoleDto>> result = new();
      try
      {
        var roles = await _roleManager.Roles.ToListAsync();
        if (roles.Count() == 0)
        {
          result.Success = true;
          result.ErrorCode = 200;
          result.Data = new List<RoleDto>();
          return result;
        }
        var pageRoleDtos = _mapper.Map<List<Portal.Domain.Entities.AppRole>, List<RoleDto>>(roles);
        result.Success = true;
        result.ErrorCode = 200;
        result.Data = pageRoleDtos;
        return result;
      }
      catch (Exception ex)
      {
        result.Success = false;
        result.Message = ex.Message;
        result.Data = new List<RoleDto>();
        result.ErrorCode = ex.GetHashCode();
        return result;
      }
    }

    public async Task<ActionResponse<PagedList<RoleDto>>> GetAllRolePaging(RequestParameters request)
    {
      ActionResponse<PagedList<RoleDto>> result = new();
      try
      {
        var roles = _roleManager.Roles;
        if (roles.Count() == 0)
        {
          result.Success = true;
          result.ErrorCode = 200;
          result.Data = new PagedList<RoleDto>();
          return result;
        }

        var pageRoles = await roles.PageBy(x => x.Id, request.PageIndex, request.PageSize)
             .ToListAsync();
        var pageRoleDtos = _mapper.Map<List<Portal.Domain.Entities.AppRole>, List<RoleDto>>(pageRoles);
        var pageList = new PagedList<RoleDto>(pageRoleDtos, roles.Count(), request.PageIndex, request.PageSize);
        result.Success = true;
        result.ErrorCode = 200;
        result.Data = pageList;
        return result;
      }
      catch (Exception ex)
      {
        result.Success = false;
        result.Message = ex.Message;
        result.ErrorCode = ex.GetHashCode();
        result.Data = new PagedList<RoleDto>();
        return result;
      }
    }

    public async Task<ActionResponse<RoleDto>> GetRoleById(string Id)
    {
      ActionResponse<RoleDto> result = new();
      try
      {
        var role = await _roleManager.FindByIdAsync(Id);
        if (role != null)
        {
          var roleDto = _mapper.Map<Portal.Domain.Entities.AppRole, RoleDto>(role);
          result.Data = roleDto;
          result.ErrorCode = 200;
          result.Success = true;
          return result;
        }
        else
        {
          result.Data = new RoleDto();
          result.ErrorCode = 200;
          result.Success = true;
          return result;
        }
      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        result.Success = false;
        result.ErrorCode = ex.GetHashCode();
        return result;
      }
    }

    public async Task<ActionResponse<RoleDetailDto>> RoleDetail(string Id)
    {

      ActionResponse<RoleDetailDto> result = new();
      RoleDetailDto roleResDto = new();
      List<UserDto> userReses = new();
      try
      {
        var rolesIbDb = await _roleManager.Roles.ToListAsync();
        var usersIbDb = await _userManager.Users.ToListAsync(); 
        if (rolesIbDb.Count > 0)
        {
          var roleInDb = _roleManager.Roles.Where(x => x.Id == Id).FirstOrDefault();
          if (roleInDb == null)
          {
            result.ErrorCode = 500;
            result.Success = false;
            result.Data = new RoleDetailDto();
            result.Message = "Không tìm thấy vai trò";
            return result;
          }
          roleResDto.Code = roleInDb.Code;
          roleResDto.Id = roleInDb.Id;
          roleResDto.Description = roleInDb.Description;
          roleResDto.Name = roleInDb.Name;
          roleResDto.StartDate = roleInDb.StartDate;
          roleResDto.EndDate = roleInDb.EndDate;
          roleResDto.Status = roleInDb.Status;
          var userRoles = await _context.UserRoles.ToListAsync();
          if (userRoles != null && userRoles.Count() > 0)
          {
            var userIds = userRoles.Where(x => x.RoleId == Id).Select(x => x.UserId).ToList();
            foreach (var userId in userIds)
            {
              if(usersIbDb!=null && usersIbDb.Count() > 0)
              {
                var userRes = usersIbDb.Where(x => x.Id == userId).FirstOrDefault();
                var userDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(userRes);
                userReses.Add(userDto);
              }
            }
            roleResDto.Users = userReses;
          }
          else
          {
            roleResDto.Users = new List<UserDto>();
          }
          result.Success = true;
          result.ErrorCode = 200;
          result.Data = roleResDto;
          return result;
        }
        else
        {
          result.Success = true;
          result.ErrorCode = 200;
          result.Data = new RoleDetailDto();
          return result;
        }
      }
      catch (Exception ex)
      {
        result.Success = true;
        result.ErrorCode = ex.GetHashCode();
        result.Message = ex.Message;
        result.Data = new RoleDetailDto();
        return result;
      }
    }

    public async Task<ActionResponse<RoleDto>> UpdateRole(CreateUpdateRole request)
    {
      ActionResponse<RoleDto> result = new();
      try
      {
        var roleInDb = await _roleManager.FindByIdAsync(request.Id);
        if (roleInDb == null)
        {
          result.Success = false;
          result.ErrorCode = 404;
          result.Message = "Không tìm thấy vai trò";
          return result;
        }
        roleInDb.Name = request.Name;
        roleInDb.Code = request.Code;
        roleInDb.Status = request.Status;
        roleInDb.StartDate = request.StartDate;
        roleInDb.EndDate = request.EndDate;
        roleInDb.Description = request.Description;
        var res = await _roleManager.UpdateAsync(roleInDb);
        if (res.Succeeded)
        {
          var roleDto = _mapper.Map<Portal.Domain.Entities.AppRole, RoleDto>(roleInDb);
          result.Success = true;
          result.Data = roleDto;
          result.ErrorCode = 200;
        }
        return result;
      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        result.Success = false;
        result.ErrorCode = ex.GetHashCode();
        return result;
      }
    }
  }
}
