using AutoMapper;
using Common.Common.ActionResponse;
using Common.Dtos.Action;
using Common.Share.SeedWorks;
using Microsoft.EntityFrameworkCore;
using Portal.Application.Interfaces.Action;
using Portal.Application.Repositories.Interfaces.Action;
using Portal.Application.Repositories.Interfaces.Menu;
using Portal.Domain.Common;
using Portal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace Portal.Infrastructure.Implements.Action
{
    public class ActionService : IActionService
    {
        private readonly IMapper _mapper;
        private readonly IActionRepository _actionRepository;
        private readonly IMenuRepository _menuRepository;
        public ActionService(IActionRepository actionRepository, IMenuRepository menuRepository, IMapper mapper)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _actionRepository = actionRepository;
            _menuRepository = menuRepository;
        }

        public async Task<ActionResponse<ActionDto>> CreateAction(CreateUpdateAction request)
        {
            ActionResponse<ActionDto> result = new();
            try
            {
                var action = new Portal.Domain.Entities.Action()
                {
                    Code = request.Code,
                    Name = request.Name,
                    Path = request.Path,
                    MenuId = request.MenuId
                };
                var id = await _actionRepository.CreateAsync(action);
                if (id is Guid)
                {
                    var actionDto = _mapper.Map<Portal.Domain.Entities.Action, ActionDto>(action);
                    result.Data = actionDto;

                }
                return result;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                return result;
            }


        }

        public async Task<ActionResponse<List<ActionDto>>> CreateListAction(List<CreateUpdateAction> actions)
        {
            ActionResponse<List<ActionDto>> result = new();
            try
            {
                var actionInDbs = await _actionRepository.FindAll().ToListAsync();
                var menus = await _menuRepository.FindAll().ToListAsync();
                List<Portal.Domain.Entities.Action> actionsCreate = new();
                if (menus.Count > 0)
                {
                    foreach (var action in actions)
                    {
                        var menuOfAction = menus.Where(x => x.Id == action.MenuId).FirstOrDefault();
                        var actionOfMenuInDbs = actionInDbs.Where(x => x.MenuId == menuOfAction.Id).ToList();
                        if (actionOfMenuInDbs.Count > 0)
                        {
                            if (menuOfAction != null && actionOfMenuInDbs.Any(x => x.Code == action.Code) == false)
                            {
                                Portal.Domain.Entities.Action actionCreate = new()
                                {
                                    Name = action.Name,
                                    Code = action.Code,
                                    MenuId = menuOfAction.Id,
                                    Path = action.Path
                                };
                                actionsCreate.Add(actionCreate);
                            }
                        }
                        else
                        {
                            Portal.Domain.Entities.Action actionCreate = new()
                            {
                                Name = action.Name,
                                Code = action.Code,
                                MenuId = menuOfAction.Id,
                                Path = action.Path
                            };
                            actionsCreate.Add(actionCreate);
                        }
                    }
                    if (actionsCreate.Count > 0)
                    {
                        var lstId = await _actionRepository.CreateListAsync(actionsCreate);
                        if (lstId.Count > 0)
                        {
                            var actionDtos = _mapper.Map<List<Portal.Domain.Entities.Action>, List<ActionDto>>(actionsCreate);
                            result.Success = true;
                            result.Data = actionDtos;
                        }
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                result.Success = true;
                return result;
            }

        }

        public Task<ActionResponse<ActionDto>> DeleteAction(Guid Id)
        {
            throw new NotImplementedException();
        }

        public async Task<ActionResponse<List<ActionDto>>> GetAllAction()
        {
            ActionResponse<List<ActionDto>> result = new();
            try
            {

                var actions = await _actionRepository.FindAll().ToListAsync();
                if (actions != null && actions.Count() > 0)
                {
                    var actionDtos = _mapper.Map<List<Portal.Domain.Entities.Action>, List<ActionDto>>(actions);
                    result.Success = true;
                    result.Data = actionDtos;
                }
                return result;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
                return result;
            }
        }

        public async Task<ActionResponse<List<ActionDto>>> GetAllActionByMenuId(Guid menuId)
        {
            ActionResponse<List<ActionDto>> result = new();
            try
            {
                var menuInDb = _menuRepository.FindByCondition(x => x.Id == menuId).FirstOrDefault();
                if (menuInDb == null)
                {
                    result.Success = false;
                    return result;
                }
                var actions = await _actionRepository.FindByCondition(x => x.MenuId == menuId).ToListAsync();
                if (actions != null && actions.Count() > 0)
                {
                    var actionDtos = _mapper.Map<List<Portal.Domain.Entities.Action>, List<ActionDto>>(actions);
                    result.Success = true;
                    result.Data = actionDtos;
                }
                return result;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
                return result;
            }
        }

        public Task<ActionResponse<PagedList<ActionDto>>> GetAllActionPaging()
        {
            throw new NotImplementedException();
        }

        public Task<ActionResponse<ActionDto>> UpdateAction(CreateUpdateAction request)
        {
            throw new NotImplementedException();
        }
    }
}
