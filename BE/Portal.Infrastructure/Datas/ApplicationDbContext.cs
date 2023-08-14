using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using Portal.Domain.Entities;
using Portal.Infrastructure.Configurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Datas
{
  public class ApplicationDbContext : IdentityDbContext<Portal.Domain.Entities.AppUser, Portal.Domain.Entities.AppRole, string>
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder builder)
    {
      builder.ApplyConfiguration(new PatientRecordConfiguration());
      builder.ApplyConfiguration(new ActionConfiguration());
      builder.ApplyConfiguration(new ActionPageConfiguration());
      builder.ApplyConfiguration(new AppRoleConfiguration());
      builder.ApplyConfiguration(new AppUserConfiguration());
      builder.ApplyConfiguration(new AppUserDepartmentConfiguration());
      builder.ApplyConfiguration(new DepartmentConfiguration());
      builder.ApplyConfiguration(new DistrictConfiguration());
      builder.ApplyConfiguration(new MedicalExaminationInformationConfiguration());
      builder.ApplyConfiguration(new MedicalExaminationScheduleConfiguration());
      builder.ApplyConfiguration(new MedicalExaminationServiceConfiguration());
      builder.ApplyConfiguration(new MedicalExaminationStatusConfiguration());
      builder.ApplyConfiguration(new MedicalExaminationSchedulePatientRecordConfiguration());
      builder.ApplyConfiguration(new MenuConfiguration());
      builder.ApplyConfiguration(new PageConfiguration());
      builder.ApplyConfiguration(new PageSingalConfiguration());
      builder.ApplyConfiguration(new PaymentConfiguration());
      builder.ApplyConfiguration(new PermissionConfiguration());
      builder.ApplyConfiguration(new PermissionActionConfiguration());
      builder.ApplyConfiguration(new ProvinceConfiguration());
      builder.ApplyConfiguration(new RefeshTokenConfiguration());
      builder.ApplyConfiguration(new WardConfiguration());
      builder.ApplyConfiguration(new CaringInfoConfiguration());
      builder.ApplyConfiguration(new CaringInfoDetailConfiguration());
      base.OnModelCreating(builder);
    }

    public DbSet<Portal.Domain.Entities.PatientRecord> PatientRecords { get; set; }
    public DbSet<Portal.Domain.Entities.MedicalExaminationSchedulePatientRecord> MedicalExaminationSchedulePatientRecords { get; set; }
    public DbSet<Portal.Domain.Entities.Action> Actions { get; set; }
    public DbSet<Portal.Domain.Entities.ActionPage> ActionPages { get; set; }
    public DbSet<Portal.Domain.Entities.AppRole> AppRoles { get; set; }
    public DbSet<Portal.Domain.Entities.AppUser> AppUsers { get; set; }
    public DbSet<Portal.Domain.Entities.AppUserDepartment> AppUserDepartments { get; set; }
    public DbSet<Portal.Domain.Entities.Department> Departments { get; set; }
    public DbSet<Portal.Domain.Entities.District> Districts { get; set; }
    public DbSet<Portal.Domain.Entities.MedicalExaminationInformation> MedicalExaminationInformations { get; set; }
    public DbSet<Portal.Domain.Entities.MedicalExaminationSchedule> MedicalExaminationSchedules { get; set; }
    public DbSet<Portal.Domain.Entities.MedicalExaminationService> MedicalExaminationServices { get; set; }
    public DbSet<Portal.Domain.Entities.MedicalExaminationStatus> MedicalExaminationStatuses { get; set; }
    public DbSet<Portal.Domain.Entities.Menu> Menus { get; set; }

    public DbSet<Portal.Domain.Entities.Page> Pages { get; set; }
    public DbSet<Portal.Domain.Entities.PageSingal> PageSingals { get; set; }
    public DbSet<Portal.Domain.Entities.Payment> Payments { get; set; }

    public DbSet<Portal.Domain.Entities.Permission> Permissions { get; set; }
    public DbSet<Portal.Domain.Entities.PermissionAction> PermissionActions { get; set; }
    public DbSet<Portal.Domain.Entities.Province> Provinces { get; set; }
    public DbSet<Portal.Domain.Entities.RefeshToken> RefeshTokens { get; set; }
    public DbSet<Portal.Domain.Entities.Ward> Wards { get; set; }
    public DbSet<Portal.Domain.Entities.CaringInfo> CaringInfos { get; set; }
    public DbSet<Portal.Domain.Entities.CaringInfoDetail> CaringInfoDetails { get; set; }

  }
}
