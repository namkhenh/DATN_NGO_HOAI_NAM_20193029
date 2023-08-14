using Common.Dtos.Outh2;
using Common.Dtos.Role;
using Common.Dtos.User;
using Common.Share.SeedWorks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.API.Rpc.menu;
using Portal.Application.Interfaces.Outh2;
using Portal.Application.Interfaces.User;

namespace Portal.API.Rpc.user
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IOuth2Service _outh2Service;
        public UserController(IOuth2Service outh2Service, IUserService userService)
        {
            _userService = userService;
            _outh2Service = outh2Service;
        }
        [Route(UserRoot.Authentication), HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Authentication([FromBody] AuthenticationRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var auth = await _outh2Service.Authenication(request);
            return Ok(auth);
        }
        [Route(UserRoot.Register), HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var auth = await _userService.Register(request);
            return Ok(auth);
        }
        [Route(UserRoot.GetUserById), HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserById(string Id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _userService.GetUserById(Id);
            return Ok(user);
        }
        [Route(UserRoot.Delete), HttpDelete]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteUser(string Id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _userService.DeleteUserAsync(Id);
            return Ok(user);
        }
        [Route(UserRoot.DeleteList), HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteListUser([FromBody] List<string> Ids)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _userService.DeleteListUsers(Ids);
            return Ok(user);
        }
        [Route(UserRoot.Update), HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateUser([FromBody] CreateUpdateUser request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _userService.UpdateUser(request);
            return Ok(user);
        }
        [Route(UserRoot.GetUserPaging), HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserPaging([FromBody] RequestParameters request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _userService.GetAllUserPaging(request);
            return Ok(user);
        }
        [Route(UserRoot.Detail), HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Detail(string Id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _userService.UserDetailDto(Id);
            return Ok(user);
        }
        [Route(UserRoot.ChangePassword), HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ChangePassword([FromBody] ChangeUserPassword request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _userService.ChangePassword(request);
            return Ok(user);
        }
        [Route(UserRoot.ResetPassword), HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordUser request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _userService.ResetPassword(request);
            return Ok(user);
        }
        [Route(UserRoot.CheckUserByUserId), HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> CheckUserByUserId(string userId)
        {
            var user = await _userService.CheckUserByUserId(userId);
            return Ok(user);
        }
        [Route(UserRoot.LockUser), HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Lock(string userId)
        {
            var user = await _userService.LockUser(userId);
            return Ok(user);
        }
        [Route(UserRoot.FindByCode), HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserByCode(string code)
        {
            var user = await _userService.GetUserByCode(code);
            return Ok(user);
        }
    }
}
