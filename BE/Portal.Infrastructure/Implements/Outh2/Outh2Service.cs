using AutoMapper;
using Common.Common.ActionResponse;
using Common.Dtos.Outh2;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using Newtonsoft.Json;
using Portal.Application.Interfaces.Outh2;
using Portal.Domain.Entities;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Implements.Outh2
{
  public class Outh2Service : IOuth2Service
  {
    private readonly IMapper _mapper;
    private readonly UserManager<Portal.Domain.Entities.AppUser> _userManager;
    private readonly SignInManager<Portal.Domain.Entities.AppUser> _signInManager;
    private readonly RoleManager<Portal.Domain.Entities.AppRole> _roleManager;
    private readonly IConfiguration _config;
    private readonly ApplicationDbContext _context;
    public Outh2Service(ApplicationDbContext context, UserManager<Portal.Domain.Entities.AppUser> userManager, SignInManager<Portal.Domain.Entities.AppUser> signInManager, RoleManager<Portal.Domain.Entities.AppRole> roleManager, IConfiguration config, IMapper mapper)
    {
      _mapper = mapper;
      _config = config;
      _userManager = userManager;
      _signInManager = signInManager;
      _roleManager = roleManager;
      _context = context;
    }

    public async Task<ActionResponse<UserLoginDto>> Authenication(AuthenticationRequest request)
    {
      UserLoginDto userLogin = new();
      ActionResponse<UserLoginDto> resultRes = new();
      try
      {
        var user = await _userManager.FindByNameAsync(request.UserName);
        if (user != null)
        {
          var result = await _signInManager.PasswordSignInAsync(user, request.Password, request.RememberMe, true);
          if (!result.Succeeded)
          {
            resultRes.Data = new UserLoginDto();
            resultRes.Message = "Sai tên đăng nhập hoặc mật khẩu";
            resultRes.ErrorCode = 404;
            resultRes.Success = false;
            return resultRes;
          }
          if(user.Status == false)
          {
            resultRes.Data = new UserLoginDto();
            resultRes.Message = "tài khoản đã bị khóa";
            resultRes.ErrorCode = 404;
            resultRes.Success = false;
            return resultRes;
          }
          var roles = await _userManager.GetRolesAsync(user);
          var claims = new[]
          {
              new Claim("userId",user.Id),
                new Claim("email",user.Email??""),
                new Claim("roles", string.Join(";",roles??new List<string>())),
                new Claim("userName", request.UserName),
                new Claim("fullName", user.FullName??""),
                
            };
          var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"] ?? ""));
          var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

          var token = new JwtSecurityToken(_config["Tokens:Issuer"],
              _config["Tokens:Issuer"],
              claims,
              expires: DateTime.Now.AddHours(3),
              signingCredentials: creds);
          var tokenRes = new JwtSecurityTokenHandler().WriteToken(token);
          userLogin.AccessToken = tokenRes;
          resultRes.Success = true;
          resultRes.Data = userLogin;
        }
        else
        {
          resultRes.Data = new UserLoginDto();
          resultRes.Message = "Sai tên đăng nhập hoặc mật khẩu";
          resultRes.ErrorCode = 404;
          resultRes.Success = false;
          return resultRes;
        }
        return resultRes;
      }
      catch (Exception ex)
      {
        resultRes.Success = false;
        resultRes.Message = ex.Message;
        return resultRes;
      }

    }
    //public bool CheckRefeshToken(RefeshToken refeshTokenOldOfUser)
    //{
    //    if(refeshTokenOldOfUser.ExpiresIn < DateTime.Now)
    //    {
    //        return false;
    //    }
    //    return true;
    //}
    public string GetRefeshToken()
    {
      return Guid.NewGuid().ToString().Replace("-", "");
    }
  }
}
