using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.API.Rpc.menu;
using Portal.Application.Interfaces.Action;
using Portal.Application.Repositories.Interfaces.Action;

namespace Portal.API.Rpc.action
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionController : ControllerBase
    {
        private readonly IActionService _actionService;
        public ActionController(IActionService actionService)
        {
            _actionService = actionService;
        }

        [Route(ActionRoot.GetAllActionByMenuId), HttpGet]
        public async Task<IActionResult> GetMenuById(Guid Id)
        {
            var menu = await _actionService.GetAllActionByMenuId(Id);
            return Ok(menu);
        }
        [Route(MenuRoot.Get), HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var menus = await _actionService.GetAllAction();
            return Ok(menus);
        }
    }
}
