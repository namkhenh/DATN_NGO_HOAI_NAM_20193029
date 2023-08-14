using AutoMapper;
using Common.Common.ActionResponse;
using Common.Dtos.Action;
using Common.Dtos.Menu;
using Common.Dtos.User;
using Common.Share.Common;
using Common.Share.SeedWorks;
using DnsClient;
using Microsoft.EntityFrameworkCore;
using Portal.Application.Interfaces.Menu;
using Portal.Application.Repositories.Interfaces.Action;
using Portal.Application.Repositories.Interfaces.Menu;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MassTransit.ValidationResultExtensions;

namespace Portal.Infrastructure.Implements.Menu
{
  public class MenuService : IMenuService
  {
    private readonly IActionRepository _actionRepository;
    private readonly IMenuRepository _menuRepository;
    private readonly ILogger _logger;
    private readonly IMapper _mapper;
    public MenuService(IMenuRepository menuRepository, IMapper mapper, ILogger logger
      , IActionRepository actionRepository)
    {
      _actionRepository = actionRepository;
      _logger = logger;
      _mapper = mapper;
      _menuRepository = menuRepository;
    }
    public async Task<ActionResponse<List<MenuDto>>> CreateList(List<CreateUpdateMenu> menus)
    {
      ActionResponse<List<MenuDto>> result = new();
      try
      {
        var menuInDbs = await _menuRepository.FindAll().ToListAsync();
        List<Portal.Domain.Entities.Menu> listMenuCreate = new();
        foreach (var menu in menus)
        {
          var isMenuInDb = menuInDbs.Any(x => x.Code == menu.Code);
          if (menu != null && isMenuInDb == false)
          {
            var menuCreate = new Portal.Domain.Entities.Menu()
            {
              Name = menu.Name,
              Path = menu.Path,
              Code = menu.Code
            };
            listMenuCreate.Add(menuCreate);
          }
        }
        if (listMenuCreate.Count > 0)
        {
          await _menuRepository.CreateListAsync(listMenuCreate);
        }
        var menuDtoRes = _mapper.Map<List<Portal.Domain.Entities.Menu>, List<MenuDto>>(listMenuCreate);
        result.Success = true;
        result.Data = menuDtoRes;
        return result;
      }
      catch (Exception ex)
      {
        _logger.Error(ex.Message);
        result.Success = false;
        return result;
      }
    }

    public async Task<ActionResponse<MenuDto>> CreateMenu(CreateUpdateMenu request)
    {
      ActionResponse<MenuDto> result = new();
      try
      {
        var menu = new Portal.Domain.Entities.Menu()
        {
          Code = request.Code,
          Name = request.Name,
          Path = request.Path
        };
        var id = await _menuRepository.CreateAsync(menu);
        if (id is Guid)
        {
          var menuInDb = await _menuRepository.FindByCondition(x => x.Id == id).FirstOrDefaultAsync();
          var menuDto = _mapper.Map<Portal.Domain.Entities.Menu, MenuDto>(menuInDb);
          result.Data = menuDto;
        }
        return result;
      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        return result;
      }

    }

    public async Task<ActionResponse<MenuDto>> DeleteMenu(CreateUpdateMenu request)
    {
      ActionResponse<MenuDto> result = new();
      try
      {
        var menu = await _menuRepository.FindByCondition(x => x.Id == request.Id).FirstOrDefaultAsync();
        if (menu != null)
        {
          var menuDto = _mapper.Map<Portal.Domain.Entities.Menu, MenuDto>(menu);
          result.Data = menuDto;
        }
        return result;

      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        return result;
      }


    }

    public async Task<ActionResponse<List<MenuDto>>> GetAllMenu()
    {
      ActionResponse<List<MenuDto>> result = new();
      try
      {
        var menus = await _menuRepository.FindAll().ToListAsync();
        if (menus != null)
        {
          result.Success = true;
          var menuDtos = _mapper.Map<List<Portal.Domain.Entities.Menu>, List<MenuDto>>(menus);
          result.Data = menuDtos;
        }
        return result;
      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        return result;
      }
    }

    public async Task<ActionResponse<PagedList<MenuDto>>> GetAllPagingMenu(RequestParameters request)
    {
      ActionResponse<PagedList<MenuDto>> result = new();
      PagedList<Portal.Domain.Entities.Menu> pagedList = new();
      try
      {
        var menus = _menuRepository.FindAll();
        var pageMenus = await menus.PageBy(x => x.Id, request.PageIndex, request.PageSize)
             .ToListAsync();
        var pageMemeuDtos = _mapper.Map<List<Portal.Domain.Entities.Menu>, List<MenuDto>>(pageMenus);
        var pageList = new PagedList<MenuDto>(pageMemeuDtos, pageMemeuDtos.Count(), request.PageIndex, request.PageSize);
        result.Data = pageList;
        return result;
      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        return result;
      }
    }

    public async Task<ActionResponse<MenuDto>> GetMenuByCode(string code)
    {
      ActionResponse<MenuDto> result = new();
      try
      {

        var menu = await _menuRepository.FindByCondition(x => x.Code == code).FirstOrDefaultAsync();
        if (menu != null)
        {
          var menuDto = _mapper.Map<Portal.Domain.Entities.Menu, MenuDto>(menu);
          result.Data = menuDto;
        }
        return result;
      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        return result;
      }


    }

    public async Task<ActionResponse<MenuDto>> GetMenuById(Guid Id)
    {
      ActionResponse<MenuDto> result = new();
      try
      {
        if (Id is Guid)
        {
          var menu = await _menuRepository.FindByCondition(x => x.Id == Id).FirstOrDefaultAsync();
          if (menu != null)
          {
            var menuDto = _mapper.Map<Portal.Domain.Entities.Menu, MenuDto>(menu);
            var actionInMenu = await _actionRepository.FindByCondition(x => x.MenuId == Id).ToListAsync();
            if(actionInMenu!=null && actionInMenu.Count() > 0)
            {
              menuDto.Actions = _mapper.Map<List<Portal.Domain.Entities.Action>, List<ActionDto>>(actionInMenu);
            }  
            result.Data = menuDto;
            result.Success = true;
          }

        }
        return result;
      }
      catch (Exception ex)
      {
        result.Message = ex.Message;
        return result;
      }
    }
  }
}
