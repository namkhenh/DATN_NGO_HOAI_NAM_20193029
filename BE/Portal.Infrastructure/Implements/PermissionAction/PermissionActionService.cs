using Common.Common.ActionResponse;
using Common.Dtos.PermissionAction;
using DnsClient;
using Microsoft.EntityFrameworkCore;
using Portal.Application.Interfaces.PermissionAction;
using Portal.Application.Repositories.Interfaces.Action;
using Portal.Application.Repositories.Interfaces.Menu;
using Portal.Application.Repositories.Interfaces.Permission;
using Portal.Application.Repositories.Interfaces.PermissionAction;
using Portal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Implements.PermissionAction
{
  public class PermissionActionService : IPermissionActionService
  {
    private readonly IMenuRepository _menuRepository;
    private readonly IActionRepository _actionRepository;
    private readonly IPermissionActionRepository _permissionActionRepository;
    private readonly IPermissionRepository _permissionRepository;
    public PermissionActionService(IActionRepository actionRepository, IPermissionRepository permissionRepository
      , IPermissionActionRepository permissionActionRepository, IMenuRepository menuRepository)
    {
      _menuRepository = menuRepository;
      _permissionActionRepository = permissionActionRepository;
      _permissionRepository = permissionRepository;
      _actionRepository = actionRepository;
    }
    public async Task<ActionResponse<bool>> Create(CreateUpdatePermissionAction request)
    {
      List<Portal.Domain.Entities.PermissionAction> permissionActionsCreate = new();
      var permissionActionIbDbs = await _permissionActionRepository.FindAll().ToListAsync();
      var permissionInDbs = await _permissionRepository.FindAll().ToListAsync();
      var actionIbDbs = await _actionRepository.FindAll().ToListAsync();
      ActionResponse<bool> result = new();
      try
      {
        if (permissionInDbs != null && permissionInDbs.Count > 0 && actionIbDbs != null && actionIbDbs.Count() > 0)
        {
          var permission = permissionInDbs.Where(x => x.Id == request.PermissionActions.Key).FirstOrDefault();
          if (permission == null)
          {
            result.Success = false;
            result.Message = "Không thấy permission";
            result.ErrorCode = 500;
            return result;
          }
          var menu = _menuRepository.FindByCondition(x => x.Id == permission.MenuId).FirstOrDefault();
          var actionInMenu = await _actionRepository.FindByCondition(x => x.MenuId == menu.Id).ToListAsync();
          actionIbDbs = actionIbDbs.Where(x => x.MenuId == menu.Id).ToList();
          if (request.PermissionActions.Value != null && request.PermissionActions.Value.Count() > 0)
          {
            foreach (var action in request.PermissionActions.Value)
            {
              var actionInDb = actionIbDbs.Where(x => x.Id == action).FirstOrDefault();
              if (actionInDb != null)
              {
                if (permissionActionIbDbs.Where(x => x.PermissionId == permission.Id && x.ActionId == actionInDb.Id).Any() == false)
                {
                  permissionActionsCreate.Add(new Domain.Entities.PermissionAction()
                  {
                    PermissionId = permission.Id,
                    ActionId = actionInDb.Id,
                  });
                }
              }
            }
            if (permissionActionsCreate.Count() > 0)
            {
              await _permissionActionRepository.CreateListAsync(permissionActionsCreate);
            }
          }

        }
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
        return result;
      }
    }

    public async Task<ActionResponse<bool>> Delete(Guid Id)
    {
      ActionResponse<bool> result = new();
      try
      {
        var permissionAction = _permissionActionRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
        if (permissionAction == null)
        {
          result.Success = false;
          result.Message = "Xóa thất bại";
          result.ErrorCode = 500;
          return result;
        }
        await _permissionActionRepository.DeleteAsync(permissionAction);
        result.Success = true;
        result.Message = "Xóa thành công";
        result.ErrorCode = 200;
        return result;
      }
      catch (Exception ex)
      {
        result.Success = false;
        result.Message = ex.Message;
        result.ErrorCode = ex.GetHashCode();
        return result;
      }
    }

    public async Task<ActionResponse<bool>> Update(CreateUpdatePermissionAction request)
    {
      var permissionInDbs = await _permissionRepository.FindAll().ToListAsync();
      var actionInDbs = await _actionRepository.FindAll().ToListAsync();
      ActionResponse<bool> result = new();
      try
      {
        if (permissionInDbs != null && actionInDbs != null && permissionInDbs.Count > 0 && actionInDbs.Count() > 0)
        {
          var permissionCheckKey = _permissionRepository.FindByCondition(x => x.Id == request.PermissionActions.Key).FirstOrDefault();
          if (permissionCheckKey == null)
          {
            result.Success = false;
            result.Message = "Không thấy permission";
            result.ErrorCode = 500;
            return result;
          }
          foreach (var actionCheck in request.PermissionActions.Value)
          {
            var actionCheckInDb = actionInDbs.Where(x => x.Id == actionCheck).FirstOrDefault();
            if (actionCheckInDb == null)
            {
              result.Success = false;
              result.Message = $"Không có action với id = {actionCheck}";
              result.Data = false;
              result.ErrorCode = 404;
              return result;
            }
          }
          var permissionActionDelete = await _permissionActionRepository.FindByCondition(x => x.PermissionId == request.PermissionActions.Key).ToListAsync();
          if (permissionActionDelete.Count > 0)
          {
            await _permissionActionRepository.DeleteListAsync(permissionActionDelete);
          }
          List<Portal.Domain.Entities.PermissionAction> permissionActionsCreate = new();
          var permissionActionInDbs = await _permissionActionRepository.FindAll().ToListAsync();
          foreach (var action in request.PermissionActions.Value)
          {
            var actionInDb = actionInDbs.Where(x => x.Id == action).FirstOrDefault();
            if(permissionActionInDbs.Where(x=>x.ActionId==actionInDb.Id && x.PermissionId == permissionCheckKey.Id).Any()==false)
            {
              permissionActionsCreate.Add(new Domain.Entities.PermissionAction()
              {
                PermissionId = permissionCheckKey.Id,
                ActionId = actionInDb.Id,
              });
            }
          }
          await _permissionActionRepository.CreateListAsync(permissionActionsCreate);
          result.Success = true;
          result.Message = " Cập nhập thành công";
          result.ErrorCode = 200;
          result.Data = true;
          return result;
        }
        result.Success = false;
        result.Message = " Cập nhập không thành công";
        result.ErrorCode = 404;
        result.Data = false;
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
  }
}
