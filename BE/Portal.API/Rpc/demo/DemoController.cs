using Common.Common.ActionResponse;
using Common.Dtos.Demo;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.Infrastructure.Validate;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Portal.API.Rpc.demo
{
  [Route("api/[controller]")]
  [ApiController]
  public class DemoController : ControllerBase
  {
    [HttpPost("Demo")]
    public async Task<IActionResult> Create(CreateDemo request)
    {
      var validator = new DemoAddValidator();
      var validationResult = await validator.ValidateAsync(request);
      if (!validationResult.IsValid)
      {
        return Ok(ActionResponse.CreateErrorResponse(validationResult.Errors));
      }
      return Ok();
    }
  }
}
