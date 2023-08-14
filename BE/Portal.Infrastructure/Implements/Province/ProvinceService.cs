using AutoMapper;
using Common.Common.ActionResponse;
using Common.Dtos.District;
using Common.Dtos.Province;
using Common.Dtos.Ward;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using Portal.Application.Interfaces.Province;
using Portal.Application.Repositories.Interfaces.District;
using Portal.Application.Repositories.Interfaces.Province;
using Portal.Application.Repositories.Ward;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MassTransit.ValidationResultExtensions;

namespace Portal.Infrastructure.Implements.Province
{
  public class ProvinceService : IProvinceService
  {
    private readonly IMapper _mapper;
    private readonly IProvinceRepository _provinceRepository;
    private readonly IDistrictRepository _districtRepository;
    private readonly IWardRepository _wardRepository;
    public ProvinceService(IProvinceRepository provinceRepository, IDistrictRepository districtRepository, IWardRepository wardRepository
      , IMapper mapper)
    {
      _mapper = mapper;
      _provinceRepository = provinceRepository;
      _districtRepository = districtRepository;
      _wardRepository = wardRepository;
    }

    public async Task<ActionResponse<List<ProvinceDto>>> GetAll()
    {
      ActionResponse<List<ProvinceDto>> result = new();
      try
      {
        var lstProvinceInDb = await _provinceRepository.FindAll().ToListAsync();
        if (lstProvinceInDb == null)
        {
          result.Success = true;
          result.Data = new List<ProvinceDto>();
          result.ErrorCode = 200;
          return result;
        }
        var lstDto = _mapper.Map<List<Portal.Domain.Entities.Province>, List<ProvinceDto>>(lstProvinceInDb);
        result.Success = true;
        result.Data = lstDto;
        result.ErrorCode = 200;
        return result;
      }
      catch (Exception ex)
      {
        result.Success = false;
        result.Data = new List<ProvinceDto>();
        result.ErrorCode = ex.GetHashCode();
        result.Message = ex.Message;
        return result;
      }
    }

    public async Task<ActionResponse<List<DistrictDto>>> GetDistrictByProvinceId(Guid Id)
    {
      ActionResponse<List<DistrictDto>> result = new();
      try
      {
        var lstDistrictInDb = await _districtRepository.FindByCondition(x => x.ProvinceId == Id).ToListAsync();
        if (lstDistrictInDb == null)
        {
          result.Success = true;
          result.Data = new List<DistrictDto>();
          result.ErrorCode = 200;
          return result;
        }
        var lstDto = _mapper.Map<List<Portal.Domain.Entities.District>, List<DistrictDto>>(lstDistrictInDb);
        result.Success = true;
        result.Data = lstDto;
        result.ErrorCode = 200;
        return result;
      }
      catch (Exception ex)
      {
        result.Success = false;
        result.Data = new List<DistrictDto>();
        result.ErrorCode = ex.GetHashCode();
        result.Message = ex.Message;
        return result;
      }
    }

    public async Task<ActionResponse<List<WardDto>>> GetWardByDistrictId(Guid Id)
    {
      ActionResponse<List<WardDto>> result = new();
      try
      {
        var wardsInDb = await _wardRepository.FindByCondition(x => x.DistrictId == Id).ToListAsync();
        if (wardsInDb == null)
        {
          result.Success = true;
          result.Data = new List<WardDto>();
          result.ErrorCode = 200;
          return result;
        }
        var lstDto = _mapper.Map<List<Portal.Domain.Entities.Ward>, List<WardDto>>(wardsInDb);
        result.Success = true;
        result.Data = lstDto;
        result.ErrorCode = 200;
        return result;
      }
      catch (Exception ex)
      {
        result.Success = false;
        result.Data = new List<WardDto>();
        result.ErrorCode = ex.GetHashCode();
        result.Message = ex.Message;
        return result;
      }
    }
    public async Task AddStepByStep(ProvinceModelCreate province, List<Portal.Domain.Entities.Province> provinceInDbs
      , List<Portal.Domain.Entities.District> districtInDbs, List<Portal.Domain.Entities.Ward> wardInDbs)
    {
      if (provinceInDbs.Any(x => x.Code == province.code) == true)
      {

      }
      else
      {
        Portal.Domain.Entities.Province provinceCreate = new();
        provinceCreate.Name = province.name;
        provinceCreate.Code = province.code;
        provinceCreate.CodeName = province.codename;
        provinceCreate.Division_Type = province.division_type;
        provinceCreate.Phone_Code = province.phone_code;
        var id = await _provinceRepository.CreateAsync(provinceCreate);
        if (id is Guid)
        {
          foreach (var district in province.districts)
          {
            var DistrictCreate = new Portal.Domain.Entities.District()
            {
              Name = district.name,
              Code = district.code,
              CodeName = district.codename,
              Division_Type = district.division_type,
              Short_Codename = district.short_codename,
              ProvinceId = id
            };
            var idDistrict = await _districtRepository.CreateAsync(DistrictCreate);
            if (idDistrict is Guid)
            {
              List<Portal.Domain.Entities.Ward> lstWardCreate = new();
              foreach (var ward in district.wards)
              {
                lstWardCreate.Add(new Portal.Domain.Entities.Ward()
                {
                  Name = ward.name,
                  Code = ward.code,
                  CodeName = ward.codename,
                  Division_Type = ward.division_type,
                  Short_Codename = ward.short_codename,
                  DistrictId = idDistrict
                });
              }
              await _wardRepository.CreateListAsync(lstWardCreate);
            }
          }
        }
      }
    }
    public async Task ToolAdd(List<ProvinceModelCreate> provinceList)
    {
      var provinceInDbs = await _provinceRepository.FindAll().ToListAsync();
      var districtInDbs = await _districtRepository.FindAll().ToListAsync();
      var wardInDbs = await _wardRepository.FindAll().ToListAsync();

      foreach (var province in provinceList)
      {
        if (provinceInDbs.Any(x => x.Code == province.code) == true)
        {
          continue;
        }
        else
        {
          Portal.Domain.Entities.Province provinceCreate = new();
          provinceCreate.Name = province.name;
          provinceCreate.Code = province.code;
          provinceCreate.CodeName = province.codename;
          provinceCreate.Division_Type = province.division_type;
          provinceCreate.Phone_Code = province.phone_code;
          var id = await _provinceRepository.CreateAsync(provinceCreate);
          if (id is Guid)
          {
            foreach (var district in province.districts)
            {
              var DistrictCreate = new Portal.Domain.Entities.District()
              {
                Name = district.name,
                Code = district.code,
                CodeName = district.codename,
                Division_Type = district.division_type,
                Short_Codename = district.short_codename,
                ProvinceId = id
              };
              var idDistrict = await _districtRepository.CreateAsync(DistrictCreate);
              if (idDistrict is Guid)
              {
                List<Portal.Domain.Entities.Ward> lstWardCreate = new();
                foreach (var ward in district.wards)
                {
                  lstWardCreate.Add(new Portal.Domain.Entities.Ward()
                  {
                    Name = ward.name,
                    Code = ward.code,
                    CodeName = ward.codename,
                    Division_Type = ward.division_type,
                    Short_Codename = ward.short_codename,
                    DistrictId = idDistrict
                  });
                }
                await _wardRepository.CreateListAsync(lstWardCreate);
              }
            }
          }
        }
      }
    }
  }
}
