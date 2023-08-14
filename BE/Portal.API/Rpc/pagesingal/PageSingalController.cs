using Common.Dtos.PageSingal;
using Common.Share.SeedWorks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.API.Rpc.role;
using Portal.Application.Interfaces.PageSingal;

namespace Portal.API.Rpc.pagesingal
{
  [Route("api/[controller]")]
  [ApiController]
  public class PageSingalController : ControllerBase
  {
    private readonly IPageSingalService _pageSingalService;
    public PageSingalController(IPageSingalService pageSingalService)
    {
      _pageSingalService = pageSingalService;
    }
    [Route(PageSingalRoot.Create), HttpPost]
    public async Task<IActionResult> Create([FromBody]CreateUpdatePageSingal request)
    {
      if(!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var create = await _pageSingalService.CreatePageSingal(request);
      return Ok(create);
    }
    [Route(PageSingalRoot.Update), HttpPost]
    public async Task<IActionResult> Update([FromBody] CreateUpdatePageSingal request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var update = await _pageSingalService.UpdatePageSingal(request);
      return Ok(update);
    }
    [Route(PageSingalRoot.Delete), HttpDelete]
    public async Task<IActionResult> Delete(Guid Id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var delete = await _pageSingalService.DeletePageSingal(Id);
      return Ok(delete);
    }
    [Route(PageSingalRoot.GetPageSingalById), HttpGet]
    public async Task<IActionResult> GetPageSingalById(Guid Id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var pageSingal = await _pageSingalService.GetPageSingalById(Id);
      return Ok(pageSingal);
    }
    [Route(PageSingalRoot.DeleteListPageSingal), HttpPost]
    public async Task<IActionResult> DeleteList(List<Guid> Ids)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var pageSingal = await _pageSingalService.DeleteListPageSingal(Ids);
      return Ok(pageSingal);
    }
    [Route(PageSingalRoot.GetAllPaging), HttpPost]
    public async Task<IActionResult> GetAllPaging([FromBody]RequestParameters request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var pageSingals = await _pageSingalService.GetAllPaging(request);
      return Ok(pageSingals);
    }
    [Route(PageSingalRoot.Get), HttpGet]
    public async Task<IActionResult> GetAll()
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var pageSingals = await _pageSingalService.GetAll();
      return Ok(pageSingals);
    }
  }
}
