using Common.Contract.Common.Interfaces;
using Common.Contract.ScheduledJobs;
using Common.Infrastructure.Common.Implements;
using Common.Infrastructure.ScheduledJobs;
using Microsoft.Extensions.ObjectPool;
using Portal.API.AutoMapper;
using Portal.Application.Interfaces.Action;
using Portal.Application.Interfaces.ActionPage;
using Portal.Application.Interfaces.AppUserDepartment;
using Portal.Application.Interfaces.CaringInfo;
using Portal.Application.Interfaces.CaringInfoDetail;
using Portal.Application.Interfaces.Department;
using Portal.Application.Interfaces.MedicalExaminationSchedule;
using Portal.Application.Interfaces.MedicalExaminationSchedulePatientRecord;
using Portal.Application.Interfaces.MedicalExaminationService;
using Portal.Application.Interfaces.Menu;
using Portal.Application.Interfaces.Outh2;
using Portal.Application.Interfaces.Page;
using Portal.Application.Interfaces.PageSingal;
using Portal.Application.Interfaces.PatientRecord;
using Portal.Application.Interfaces.Payment;
using Portal.Application.Interfaces.Permission;
using Portal.Application.Interfaces.PermissionAction;
using Portal.Application.Interfaces.Province;
using Portal.Application.Interfaces.Role;

using Portal.Application.Interfaces.User;
using Portal.Application.Repositories.Interfaces.Action;
using Portal.Application.Repositories.Interfaces.ActionPage;
using Portal.Application.Repositories.Interfaces.AppUserDepartment;
using Portal.Application.Repositories.Interfaces.CaringInfo;
using Portal.Application.Repositories.Interfaces.CaringInfoDetail;
using Portal.Application.Repositories.Interfaces.Department;
using Portal.Application.Repositories.Interfaces.District;
using Portal.Application.Repositories.Interfaces.MedicalExaminationSchedule;
using Portal.Application.Repositories.Interfaces.MedicalExaminationSchedulePatientRecord;
using Portal.Application.Repositories.Interfaces.MedicalExaminationService;
using Portal.Application.Repositories.Interfaces.Menu;
using Portal.Application.Repositories.Interfaces.Page;
using Portal.Application.Repositories.Interfaces.PageSingal;
using Portal.Application.Repositories.Interfaces.PatientRecord;
using Portal.Application.Repositories.Interfaces.Payment;
using Portal.Application.Repositories.Interfaces.Permission;
using Portal.Application.Repositories.Interfaces.PermissionAction;
using Portal.Application.Repositories.Interfaces.Province;
using Portal.Application.Repositories.Interfaces.ReceptionStatus;
using Portal.Application.Repositories.Interfaces.RefeshToken;
using Portal.Application.Repositories.Ward;
using Portal.Infrastructure.Implements.Action;
using Portal.Infrastructure.Implements.ActionPage;
using Portal.Infrastructure.Implements.AppUserDepartment;
using Portal.Infrastructure.Implements.CaringInfo;
using Portal.Infrastructure.Implements.CaringInfoDetail;
using Portal.Infrastructure.Implements.Department;
using Portal.Infrastructure.Implements.MedicalExaminationSchedule;
using Portal.Infrastructure.Implements.MedicalExaminationSchedulePatientRecord;
using Portal.Infrastructure.Implements.MedicalExaminationService;
using Portal.Infrastructure.Implements.Menu;
using Portal.Infrastructure.Implements.Outh2;
using Portal.Infrastructure.Implements.Page;
using Portal.Infrastructure.Implements.PageSingal;
using Portal.Infrastructure.Implements.PatientRecord;
using Portal.Infrastructure.Implements.Payment;
using Portal.Infrastructure.Implements.Permission;
using Portal.Infrastructure.Implements.PermissionAction;
using Portal.Infrastructure.Implements.Province;
using Portal.Infrastructure.Implements.Role;

using Portal.Infrastructure.Implements.User;
using Portal.Infrastructure.Repositories.Implements.Action;
using Portal.Infrastructure.Repositories.Implements.ActionPage;
using Portal.Infrastructure.Repositories.Implements.AppUserDepartment;
using Portal.Infrastructure.Repositories.Implements.CaringInfo;
using Portal.Infrastructure.Repositories.Implements.CaringInfoDetail;
using Portal.Infrastructure.Repositories.Implements.Department;
using Portal.Infrastructure.Repositories.Implements.District;
using Portal.Infrastructure.Repositories.Implements.MedicalExaminationSchedule;
using Portal.Infrastructure.Repositories.Implements.MedicalExaminationSchedulePatientRecord;
using Portal.Infrastructure.Repositories.Implements.MedicalExaminationService;
using Portal.Infrastructure.Repositories.Implements.Menu;
using Portal.Infrastructure.Repositories.Implements.Page;
using Portal.Infrastructure.Repositories.Implements.PageSingal;
using Portal.Infrastructure.Repositories.Implements.PatientRecord;
using Portal.Infrastructure.Repositories.Implements.Payment;
using Portal.Infrastructure.Repositories.Implements.Permission;
using Portal.Infrastructure.Repositories.Implements.PermissionAction;
using Portal.Infrastructure.Repositories.Implements.Province;
using Portal.Infrastructure.Repositories.Implements.ReceptionStatus;
using Portal.Infrastructure.Repositories.Implements.RefeshToken;
using Portal.Infrastructure.Repositories.Implements.Ward;
using RabbitMQ.Client;

namespace Portal.API.Extenstions
{
  public static class ServiceExtenstion
  {
    public static IServiceCollection ConfigureServices(this IServiceCollection services)
    {
      services.AddScoped(typeof(IRepositoryBaseAsync<,,>), typeof(RepositoryBaseAsync<,,>))
             .AddScoped(typeof(IUnitOfWork<>), typeof(UnitOfWork<>))
             .AddScoped(typeof(IActionRepository), typeof(ActionRepository))
             .AddScoped(typeof(IActionPageRepository), typeof(ActionPageRepository))
              .AddScoped(typeof(IMenuRepository), typeof(MenuRepository))
              .AddScoped(typeof(IPageRepository), typeof(PageRepository))
              .AddScoped(typeof(IPermissionRepository), typeof(PermissionRepository))
              .AddScoped(typeof(IPermissionActionRepository), typeof(PermissionActionRepository))
              .AddScoped(typeof(IRefeshTokenRepository), typeof(RefeshTokenRepository))
              .AddScoped(typeof(IPageSingalRepository), typeof(PageSingalRepository))
              .AddScoped(typeof(IDepartmentRepository), typeof(DepartmentRepository))
               .AddScoped(typeof(IMedicalExaminationScheduleRepository), typeof(MedicalExaminationScheduleRepository))
              .AddScoped(typeof(IMedicalExaminationServiceRepository), typeof(MedicalExaminationServiceRepository))
              .AddScoped(typeof(IPatientRecordRepository), typeof(PatientRecordRepository))
              .AddScoped(typeof(IAppUserDepartmentRepository), typeof(AppUserDepartmentRepository))
               .AddScoped(typeof(IMedicalExaminationSchedulePatientRecordRepository), typeof(MedicalExaminationSchedulePatientRecordRepository))
                .AddScoped(typeof(IPaymentRepository), typeof(PaymentRepository))
                 .AddScoped(typeof(IProvinceRepository), typeof(ProvinceRepository))
                 .AddScoped(typeof(IDistrictRepository), typeof(DistrictRepository))
                 .AddScoped(typeof(IWardRepository), typeof(WardRepository))
        .AddScoped(typeof(ICaringInfoRepository), typeof(CaringInfoRepository))
                 .AddScoped(typeof(ICaringInfoDetailRepository), typeof(CaringInfoDetailRepository));

      services.AddScoped<IActionService, ActionService>();
      services.AddScoped<IActionPageService, ActionPageService>();
      services.AddScoped<IMenuService, MenuService>();
      services.AddScoped<IOuth2Service, Outh2Service>();
      services.AddScoped<IPageService, PageService>();
      services.AddScoped<IPermissionService, PermissionService>();
      services.AddScoped<IPermissionActionService, PermissionActionService>();
      services.AddScoped<IRoleService, RoleService>();
      services.AddScoped<IPageSingalService, PageSingalService>();
      services.AddScoped<IUserService, UserService>();
      services.AddScoped<IOuth2Service, Outh2Service>();
      services.AddScoped<IDepartmentService, DepartmentService>();
      services.AddScoped<IAppUserDepartmentService, AppUserDepartmentService>();
      services.AddScoped<IPatientRecordService, PatientRecordService>();
      services.AddScoped<IMedicalExaminationScheduleService, MedicalExaminationScheduleService>();
      services.AddScoped<IMedicalExaminationServiceService, MedicalExaminationServiceService>();
      services.AddScoped<IMedicalExaminationSchedulePatientRecordService, MedicalExaminationSchedulePatientRecordService>();
      services.AddScoped<IPaymentService, PaymentService>();
      services.AddScoped<IProvinceService, ProvinceService>();
      services.AddScoped<ICaringInfoService, CaringInfoService>();
      services.AddScoped<ICaringInfoDetailService, CaringInfoDetailService>();
      return services;
    }
    public static IServiceCollection ConfigRabbitMQ(this IServiceCollection services)
    {

      return services;
    }

    public static IServiceCollection ConfigAutoMapper(this IServiceCollection services)
    {
      services.AddAutoMapper(typeof(AutoMapping));
      return services;
    }
    public static IServiceCollection ConfigCORS(this IServiceCollection services)
    {
      services.AddCors(options =>
      {
        options.AddPolicy("CorsPolicy",
            builder => builder
                .SetIsOriginAllowed((host) => true)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
      });
      return services;
    }
  }
}
