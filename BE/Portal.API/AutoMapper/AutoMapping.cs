using AutoMapper;
using Common.Dtos.Action;
using Common.Dtos.ActionPage;
using Common.Dtos.CaringInfo;
using Common.Dtos.CaringInfoDetail;
using Common.Dtos.Department;
using Common.Dtos.District;
using Common.Dtos.MedicalExaminationSchedule;
using Common.Dtos.MedicalExaminationSchedulePatientRecord;
using Common.Dtos.MedicalExaminationService;
using Common.Dtos.Menu;
using Common.Dtos.Page;
using Common.Dtos.PageSingal;
using Common.Dtos.PatientRecord;
using Common.Dtos.Permission;
using Common.Dtos.PermissionAction;
using Common.Dtos.Province;
using Common.Dtos.Role;
using Common.Dtos.Sex;
using Common.Dtos.Site;
using Common.Dtos.User;
using Common.Dtos.Ward;
using Portal.Domain.Entities;

namespace Portal.API.AutoMapper
{
  public class AutoMapping : Profile
  {
    public AutoMapping()
    {
      CreateMap<PermissionAction, PermissionActionDto>().ReverseMap();

      CreateMap<MedicalExaminationService, MedicalExaminationServiceDto>().ReverseMap();
      CreateMap<MedicalExaminationSchedule, MedicalExaminationScheduleDto>().ReverseMap();
      CreateMap<Department, DepartmentDto>().ReverseMap();
      CreateMap<PageSingal, PageSingalDto>().ReverseMap();
      CreateMap<Menu, MenuDto>().ReverseMap();
      CreateMap<Permission, PermissionDto>().ReverseMap();
      CreateMap<AppUser, UserDto>().ReverseMap();
      CreateMap<AppRole, RoleDto>().ReverseMap();
      CreateMap<Portal.Domain.Entities.Action, ActionDto>();
      CreateMap<Portal.Domain.Entities.Page, PageDto>();
      CreateMap<Portal.Domain.Entities.ActionPage, ActionPageDto>();

      CreateMap<Portal.Domain.Entities.Province, ProvinceDto>().ReverseMap();
      CreateMap<Portal.Domain.Entities.District, DistrictDto>().ReverseMap();
      CreateMap<Portal.Domain.Entities.Ward, WardDto>().ReverseMap();
      CreateMap<Portal.Domain.Entities.PatientRecord, PatientRecordDto>().ReverseMap();
      CreateMap<Portal.Domain.Entities.MedicalExaminationSchedulePatientRecord, MedicalExaminationSchedulePatientRecordDto>().ReverseMap();
      CreateMap<Portal.Domain.Entities.CaringInfo, CaringInfoDto>().ReverseMap();
      CreateMap<Portal.Domain.Entities.CaringInfoDetail, CaringInfoDetailDto>().ReverseMap();
    }
  }
}
