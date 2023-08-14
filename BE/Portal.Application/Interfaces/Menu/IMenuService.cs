using Common.Common.ActionResponse;
using Common.Dtos.Menu;
using Common.Share.SeedWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.Menu
{
    public interface IMenuService
    {
        Task<ActionResponse<MenuDto>> GetMenuById(Guid Id);
        Task<ActionResponse<MenuDto>> GetMenuByCode(string code);
        Task<ActionResponse<MenuDto>> DeleteMenu(CreateUpdateMenu request);
        Task<ActionResponse<MenuDto>> CreateMenu(CreateUpdateMenu request);
        Task<ActionResponse<List<MenuDto>>> GetAllMenu();
        Task<ActionResponse<PagedList<MenuDto>>> GetAllPagingMenu(RequestParameters request);
        Task<ActionResponse<List<MenuDto>>> CreateList(List<CreateUpdateMenu> menus);
    }
}
