using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Portal.Application.Interfaces.Menu;

namespace Portal.API.Rpc.menu
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menuService;
        public MenuController(IMenuService menuService)
        {
            _menuService = menuService; 
        }
        
        [Route(MenuRoot.GetMenuById), HttpGet]
        public async Task<IActionResult> GetMenuById(Guid Id)
        { 
            var menu = await _menuService.GetMenuById(Id);
            return Ok(menu);
        }
        [Route(MenuRoot.Get), HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var menus = await _menuService.GetAllMenu();
            return Ok(menus);
        }
    }
}
