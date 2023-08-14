using AutoMapper;
using Common.Common.ActionResponse;
using Common.Dtos.Action;
using Common.Dtos.Menu;
using Common.Dtos.Permission;
using Common.Share.Common;
using Common.Share.SeedWorks;
using DnsClient;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Portal.Application.Interfaces.Permission;
using Portal.Application.Repositories.Interfaces.Action;
using Portal.Application.Repositories.Interfaces.ActionPage;
using Portal.Application.Repositories.Interfaces.Menu;
using Portal.Application.Repositories.Interfaces.Page;
using Portal.Application.Repositories.Interfaces.Permission;
using Portal.Application.Repositories.Interfaces.PermissionAction;
using Portal.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Implements.Permission
{
  public class PermissionService : IPermissionService
  {
    private readonly IMapper _mapper;
    private readonly UserManager<Portal.Domain.Entities.AppUser> _userManager;
    private readonly RoleManager<Portal.Domain.Entities.AppRole> _roleManager;
    private readonly IMenuRepository _menuRepository;
    private readonly IPermissionRepository _permissionRepository;
    private readonly IPermissionActionRepository _permissionActionRepository;
    private readonly IPageRepository _pageRepository;
    private readonly IActionPageRepository _actionPageRepository;
    private readonly IActionRepository _actionRepository;
    public PermissionService(UserManager<Portal.Domain.Entities.AppUser> userManager, RoleManager<Portal.Domain.Entities.AppRole> roleManager, IMenuRepository menuRepository, IPermissionRepository permissionRepository, IPermissionActionRepository permissionActionRepository, IPageRepository pageRepository, IActionPageRepository actionPageRepository, IActionRepository actionRepository, IMapper mapper)
    {
      _userManager = userManager;
      _roleManager = roleManager;
      _menuRepository = menuRepository;
      _permissionRepository = permissionRepository;
      _permissionActionRepository = permissionActionRepository;
      _pageRepository = pageRepository;
      _actionPageRepository = actionPageRepository;
      _actionRepository = actionRepository;
      _mapper = mapper;
    }

    public async Task<bool> CheckPermissionByUserIdAndUrl(string userId, string url)
    {
      var appUser = await _userManager.FindByIdAsync(userId);
      if (appUser != null)
      {
        List<string> lstRoleId = new();
        var roles = await _roleManager.Roles.ToListAsync();
        var listAppUserRole = await _userManager.GetRolesAsync(appUser);
        var lstRole = await _roleManager.Roles.ToListAsync();
        var permissions = await _permissionRepository.FindAll().ToListAsync();
        var menus = await _menuRepository.FindAll().ToListAsync();
        var actions = await _actionRepository.FindAll().ToListAsync();
        var permissionActions = await _permissionActionRepository.FindAll().ToListAsync();
        var pages = await _pageRepository.FindAll().ToListAsync();
        var actionPages = await _actionPageRepository.FindAll().ToListAsync();
        if(lstRole.Any(x=>x.Code.ToLower()=="Admin".ToLower() || x.Name.ToLower() == "Admin".ToLower()))
        {
          return true;
        }
        foreach (var rolename in listAppUserRole)
        {
          var roleId = roles.Where(x => x.Name == rolename).FirstOrDefault();
          if (roleId != null)
          {
            lstRoleId.Add(roleId.Id);
          }
        }
       
        if (listAppUserRole != null && listAppUserRole.Count() > 0)
        {
          // to do
          var statusAction = (from aurm in lstRoleId
                              join r in lstRole on aurm equals r.Id
                              join per in permissions on r.Id equals per.RoleId
                              join pam in permissionActions on per.Id equals pam.PermissionId
                              join apm in actionPages on pam.ActionId equals apm.ActionId
                              join page in pages on apm.PathId equals page.Id
                              where r.DeleteAt == null && r.StartDate <= DateTime.Now && r.EndDate > DateTime.Now && per.EndDate > DateTime.Now && per.StartDate <= DateTime.Now && per.DeleteAt == null &&
                              page.Path.ToLower() == url
                              select per.Id
                           ).Distinct().ToList();
          if (statusAction != null && statusAction.Count() > 0)
          {
            return true;
          }
        }
      }
      return false;

    }

    public async Task<ActionResponse<PermissionDto>> CreatePermission(CreateUpdatePermission request)
    {
      ActionResponse<PermissionDto> result = new();

      try
      {
        Portal.Domain.Entities.Permission checkPermission = new();
        checkPermission = null;
        var permissionInRole = await _permissionRepository.FindByCondition(x => x.RoleId == request.RoleId).ToListAsync();
        if (permissionInRole != null && permissionInRole.Count() > 0)
        {
          checkPermission = permissionInRole.Where(x => x.Code == request.Code).FirstOrDefault();
        }
        if (checkPermission != null)
        {
          result.ErrorCode = 500;
          result.Message = "Đã tồn tại Permission";
          result.Success = false;
          result.Data = new PermissionDto();
          return result;
        }
        var permission = new Portal.Domain.Entities.Permission()
        {
          Code = request.Code,
          Name = request.Name,
          Path = request.Path,
          Status = request.Status,
          StartDate = request.StartDate,
          EndDate = request.EndDate,
          MenuId = request.MenuId,
          RoleId = request.RoleId
        };
        var id = await _permissionRepository.CreateAsync(permission);
        if (id is Guid)
        {
          var permissionDto = _mapper.Map<Portal.Domain.Entities.Permission, PermissionDto>(permission);
          result.ErrorCode = 200;
          result.Message = "Tạo Permission thành công";
          result.Success = true;
          result.Data = permissionDto;
        }
        return result;
      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        result.Success = false;
        result.ErrorCode = ex.GetHashCode();
        result.Data = new PermissionDto();
        return result;
      }
    }

    public async Task<ActionResponse<PermissionDto>> DeletePermission(Guid Id)
    {
      ActionResponse<PermissionDto> result = new();
      try
      {
        var permission = await _permissionRepository.FindByCondition(x => x.Id == Id).FirstOrDefaultAsync();
        if (permission == null)
        {
          result.Success = false;
          result.ErrorCode = 500;
          result.Message = "Không tìm thấy Permission";
          result.Data = new PermissionDto();
          return result;
        }
        await _permissionRepository.DeleteAsync(permission);
        result.Success = true;
        result.ErrorCode = 200;
        result.Message = "Xóa quyền thành công";
        return result;
      }
      catch (Exception ex)
      {
        result.Success = false;
        result.ErrorCode = ex.GetHashCode();
        result.Message = ex.Message;
        result.Data = new PermissionDto();
        return result;
      }

    }

    public async Task<ActionResponse<PagedList<PermissionDto>>> GetAllPermissionPaging(RequestParameters request)
    {
      ActionResponse<PagedList<PermissionDto>> result = new();
      PagedList<Portal.Domain.Entities.Permission> pagedList = new();
      try
      {
        var permissions = _permissionRepository.FindAll();
        if (permissions == null || permissions.Count()==0)
        {
          result.Success = true;
          result.ErrorCode = 200;
          result.Data = new PagedList<PermissionDto>();
          return result;
        }
        var pageMenus = await permissions.PageBy(x => x.Id, request.PageIndex, request.PageSize)
             .ToListAsync();
        var pageMemeuDtos = _mapper.Map<List<Portal.Domain.Entities.Permission>, List<PermissionDto>>(pageMenus);
        var pageList = new PagedList<PermissionDto>(pageMemeuDtos, permissions.Count(), request.PageIndex, request.PageSize);
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
        result.Data = new PagedList<PermissionDto>();
        return result;
      }
    }

    public async Task<ActionResponse<PermissionDto>> GetPermissionById(Guid Id)
    {
      ActionResponse<PermissionDto> result = new();
      try
      {
        var actionInDbs = await _actionRepository.FindAll().ToListAsync();
        var permission = _permissionRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
        if (permission == null)
        {
          result.Success = false;
          result.ErrorCode = 404;
          result.Message = "Không thấy Permission";
          result.Data = new PermissionDto();
          return result;
        }
        var permissionDto = _mapper.Map<Portal.Domain.Entities.Permission, PermissionDto>(permission);
        var menu = _menuRepository.FindByCondition(x => x.Id == permission.MenuId).FirstOrDefault();
        var menuDto = _mapper.Map<Portal.Domain.Entities.Menu, MenuDto>(menu);
        List<ActionDto> actionDtos = new();
        var actionIdInDbs = await _permissionActionRepository.FindByCondition(x => x.PermissionId == permission.Id).Select(x => x.ActionId).ToListAsync();
        if (actionIdInDbs.Count > 0)
        {
          foreach (var actionId in actionIdInDbs)
          {
            var actionDb = actionInDbs.Where(x => x.Id == actionId).FirstOrDefault();
            actionDtos.Add(_mapper.Map<Portal.Domain.Entities.Action, ActionDto>(actionDb));
          }

        }
        permissionDto.Menu = menuDto;
        permissionDto.Actions = actionDtos;
        result.Data = permissionDto;
        result.Success = true;
        result.ErrorCode = 200;
        return result;
      }
      catch (Exception ex)
      {
        result.Success = false;
        result.ErrorCode = ex.GetHashCode();
        result.Message = ex.Message;
        result.Data = new PermissionDto();
        return result;
      }
    }

    public async Task<ActionResponse<List<PermissionDto>>> GetPermissionByRoleId(string roleId)
    {
      ActionResponse<List<PermissionDto>> result = new();
      try
      {
        var actionInDbs = await _actionRepository.FindAll().ToListAsync();

        var roleInDb = await _roleManager.FindByIdAsync(roleId);
        if (roleInDb == null)
        {
          result.Success = false;
          result.Message = $"Không tìm thấy quyền với roleId = {roleId}";
          result.ErrorCode = 404;
          result.Data = new List<PermissionDto>();
          return result;
        }
        var permissions = await _permissionRepository.FindByCondition(x => x.RoleId == roleId).ToListAsync();
        if (permissions != null && permissions.Count() > 0)
        {
          var permissionDtos = _mapper.Map<List<Portal.Domain.Entities.Permission>, List<PermissionDto>>(permissions);
          foreach (var permissionDto in permissionDtos)
          {
            var menuInDb = _menuRepository.FindByCondition(x => x.Id == permissionDto.MenuId).FirstOrDefault();
            var menuDtoInDb = _mapper.Map<Portal.Domain.Entities.Menu, MenuDto>(menuInDb);
            var actionIdInDbs = await _permissionActionRepository.FindByCondition(x => x.PermissionId == permissionDto.Id).Select(x => x.ActionId).ToListAsync();
            List<ActionDto> actionDtos = new();
            if (actionIdInDbs.Count > 0)
            {
              foreach (var actionId in actionIdInDbs)
              {
                var actionInDb = actionInDbs.Where(x => x.Id == actionId).FirstOrDefault();
                actionDtos.Add(_mapper.Map<Portal.Domain.Entities.Action, ActionDto>(actionInDb));
              }
            }
            permissionDto.Actions = actionDtos.Distinct().ToList();
            permissionDto.Menu = menuDtoInDb;
          }
          result.Success = true;
          result.ErrorCode = 200;
          result.Data = permissionDtos;
        }
        else
        {
          result.Success = true;
          result.ErrorCode = 200;
          result.Data = new List<PermissionDto>();
        }
        return result;
      }
      catch (Exception ex)
      {
        result.Success = false;
        result.ErrorCode = ex.GetHashCode();
        result.Message = ex.Message;
        result.Data = new List<PermissionDto>();
        return result;
      }
    }

    public async Task<ActionResponse<PermissionDto>> UpdatePermission(CreateUpdatePermission request)
    {
      ActionResponse<PermissionDto> result = new();
      try
      {
        var permission = await _permissionRepository.FindByCondition(x => x.Id == request.Id).FirstOrDefaultAsync();
        if (permission == null)
        {
          result.Success = false;
          result.Message = "Quyền đã tồn tại";
          result.ErrorCode = 500;
          result.Data = new PermissionDto();
          return result;
        }
        permission.Name = request.Name;
        permission.Code = request.Code;
        permission.Path = request.Path;
        permission.Status = request.Status;
        permission.StartDate = request.StartDate;
        permission.EndDate = request.EndDate;
        permission.MenuId = request.MenuId;
        permission.RoleId = request.RoleId;
        await _permissionRepository.UpdateAsync(permission);
        var permissionDto = _mapper.Map<Portal.Domain.Entities.Permission, PermissionDto>(permission);
        result.Success = true;
        result.ErrorCode = 200;
        result.Message = "Cập nhập quyền thành công";
        result.Data = permissionDto;
        return result;
      }
      catch (Exception ex)
      {
        result.Success = false;
        result.ErrorCode = ex.GetHashCode();
        result.Message = ex.Message;
        result.Data = new PermissionDto();
        return result;
      }
    }
  }
}
