using AutoMapper;
using Common.Common.ActionResponse;
using Common.Dtos.PageSingal;
using Common.Dtos.Role;
using Common.Share.Common;
using Common.Share.SeedWorks;
using DnsClient;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Portal.Application.Interfaces.PageSingal;
using Portal.Application.Repositories.Interfaces.PageSingal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MassTransit.ValidationResultExtensions;

namespace Portal.Infrastructure.Implements.PageSingal
{
  public class PageSingalService : IPageSingalService
  {
    private readonly IMapper _mapper;
    private readonly IPageSingalRepository _pageSingalRepository;
    public PageSingalService(IPageSingalRepository pageSingalRepository, IMapper mapper)
    {
      _mapper = mapper;
      _pageSingalRepository= pageSingalRepository;
    }
    public async Task<ActionResponse<PageSingalDto>> CreatePageSingal(CreateUpdatePageSingal request)
    {
      ActionResponse<PageSingalDto> result = new();
      try
      {
        var pageSingalInDb = _pageSingalRepository.FindByCondition(x => x.Code == request.Code).FirstOrDefault();
        if (pageSingalInDb != null)
        {
          result.Message = "Đã tồn tại hãy thử lại";
          result.ErrorCode = 500;
          result.Success = false;
          return result;
        }
        var pageSingal = new Portal.Domain.Entities.PageSingal()
        {
          Code = request.Code,
          Name = request.Name,
          Title = request.Title,
          Content = request.Content,
        };
        var id = await _pageSingalRepository.CreateAsync(pageSingal);
        if (id is Guid)
        {
          var pageSingalDto = _mapper.Map<Portal.Domain.Entities.PageSingal, PageSingalDto>(pageSingal);
          result.Message = "Tạo thành công";
          result.ErrorCode = 200;
          result.Success = true;
          result.Data = pageSingalDto;
        }
        return result;
      }
      catch(Exception ex)
      {
        result.Message = ex.Message;
        result.ErrorCode = ex.GetHashCode();
        result.Success = false;
        return result;
      }
     
    }

    public async Task<ActionResponse<bool>> DeleteListPageSingal(List<Guid> Ids)
    {
      ActionResponse<bool> result = new();
      try
      {
        List<Portal.Domain.Entities.PageSingal> pageSingals = new();
        foreach(var Id in Ids)
        {
          var pageSingal = _pageSingalRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
          if (pageSingal == null)
          {
            result.Message = "Không tìm thấy pageSingal";
            result.ErrorCode = 404;
            result.Success = false;
            return result;
          }
          pageSingals.Add(pageSingal);
        }
        await _pageSingalRepository.DeleteListAsync(pageSingals);
        result.Message = "Xóa thành công";
        result.ErrorCode = 200;
        result.Success = true;
        return result;
      }
      catch(Exception ex)
      {
        result.Message = ex.Message;
        result.ErrorCode = ex.GetHashCode();
        result.Success = false;
        return result;
      }
    }

    public async Task<ActionResponse<bool>> DeletePageSingal(Guid Id)
    {
      ActionResponse<bool> result = new();
      try
      {
        var pageSingal = _pageSingalRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
        if(pageSingal == null)
        {
          result.Message = "Không tìm thấy pageSingal";
          result.ErrorCode = 404;
          result.Success = false;
          return result;
        }
        await _pageSingalRepository.DeleteAsync(pageSingal);
        result.Message = "Xóa thành công";
        result.ErrorCode = 200;
        result.Success = true;
        return result;
      }
      catch(Exception ex)
      {
        result.Message = ex.Message;
        result.ErrorCode = ex.GetHashCode();
        result.Success = false;
        return result;
      }
    }

    public async Task<ActionResponse<List<PageSingalDto>>> GetAll()
    {
      ActionResponse<List<PageSingalDto>> result = new();
      try
      {
        var pageSingals = await _pageSingalRepository.FindAll().ToListAsync();
        if (pageSingals.Count() == 0)
        {
          result.Success = true;
          result.ErrorCode = 200;
          return result;
        }
        var pageSingalListDtos = _mapper.Map<List<Portal.Domain.Entities.PageSingal>, List<PageSingalDto>>(pageSingals);
        result.Success = true;
        result.ErrorCode = 200;
        result.Data = pageSingalListDtos;
        return result;
      }
      catch (Exception ex)
      {
        result.Success = false;
        result.ErrorCode = ex.GetHashCode();
        result.Message = ex.Message;
        return result;
      }
    }

    public async Task<ActionResponse<PagedList<PageSingalDto>>> GetAllPaging(RequestParameters request)
    {
      ActionResponse<PagedList<PageSingalDto>> result = new();
      try
      {
        var pageSingals =  _pageSingalRepository.FindAll();
        if (pageSingals.Count() == 0)
        {
          result.Success = true;
          result.ErrorCode = 200;
          return result;
        }

        var pageListSingals = await pageSingals.PageBy(x => x.Id, request.PageIndex, request.PageSize)
             .ToListAsync();
        var pageListRoleDtos = _mapper.Map<List<Portal.Domain.Entities.PageSingal>, List<PageSingalDto>>(pageListSingals);
        var pageList = new PagedList<PageSingalDto>(pageListRoleDtos, pageSingals.Count(), request.PageIndex, request.PageSize);
        result.Success = true;
        result.ErrorCode = 200;
        result.Data = pageList;
        return result;
      }
      catch(Exception ex)
      {
        result.Success = false;
        result.ErrorCode = ex.GetHashCode();
        result.Message = ex.Message;
        return result;
      }
    }

    public async Task<ActionResponse<PageSingalDto>> GetPageSingalById(Guid Id)
    {
      ActionResponse<PageSingalDto> result = new();
      try
      {
        var pageSingal = _pageSingalRepository.FindByCondition(x => x.Id == Id).FirstOrDefault();
        if (pageSingal == null)
        {
          result.Message = "Không tìm thấy pageSingal";
          result.ErrorCode = 404;
          result.Success = false;
          return result;
        }
        var pageSingalDto = _mapper.Map<Portal.Domain.Entities.PageSingal, PageSingalDto>(pageSingal);
        result.ErrorCode = 200;
        result.Success = true;
        result.Data = pageSingalDto;
        return result;
      }
      catch (Exception ex)
      {
        result.ErrorCode = ex.GetHashCode();
        result.Success = true;
        result.Message = ex.Message;
        return result;
      }
    }

    public async Task<ActionResponse<PageSingalDto>> UpdatePageSingal(CreateUpdatePageSingal request)
    {
      ActionResponse<PageSingalDto> result = new();
      try
      {
        var pageSingal = _pageSingalRepository.FindByCondition(x=>x.Id== request.Id).FirstOrDefault();
        if (pageSingal == null)
        {
          result.Message = "Không tìm thấy pageSingal";
          result.ErrorCode = 404;
          result.Success = false;
          return result;
        }
        pageSingal.Title = request.Title;
        pageSingal.Name = request.Name;
        pageSingal.Content = request.Content;
        await _pageSingalRepository.UpdateAsync(pageSingal);
        result.Message = "Cập nhập thành công";
        result.ErrorCode = 200;
        result.Success = true;
        return result;
      }
      catch(Exception ex)
      {
        result.Message = ex.Message;
        result.ErrorCode = ex.GetHashCode();
        result.Success = false;
        return result;
      }
    }
  }
}
