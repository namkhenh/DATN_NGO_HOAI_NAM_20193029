using Common.Dtos.Role;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Validate
{
  public class RoleAddValidator:AbstractValidator<CreateUpdateRole>
  {
    public RoleAddValidator()
    {
      RuleFor(x => x.Name)
          .Must((x, c) => !(string.IsNullOrEmpty(c) && string.IsNullOrEmpty(x.Name)))
          .WithMessage("Cần truyền thông tin name");

      RuleFor(x => x.Code)
          .Must((x, c) => !(string.IsNullOrEmpty(c) && string.IsNullOrEmpty(x.Code)))
          .WithMessage("Cần truyền thông tin code");

      RuleFor(x => x.Status).Must((x, c) => !(x.Status == null))
        .WithMessage("Cần truyền thông tin Status");

      RuleFor(x => x.StartDate).Must((x, c) => (x.StartDate is DateTime && x.StartDate>=DateTime.Now))
       .WithMessage("Cần truyền thông tin StartDate");


      RuleFor(x => x.EndDate).Must((x, c) => (x.EndDate is DateTime && x.EndDate>DateTime.Now))
      .WithMessage("Cần truyền thông tin EndDate");
    }
  }
  public class RoleChangeValidator : AbstractValidator<CreateUpdateRole>
  {
    public RoleChangeValidator()
    {
      RuleFor(x => x.Id)
              .NotNull()
              .NotEmpty()
              .WithMessage("Cần truyền thông tin Id");

      RuleFor(x => x.Name)
          .Must((x, c) => !(string.IsNullOrEmpty(c) && string.IsNullOrEmpty(x.Name)))
          .WithMessage("Cần truyền thông tin name");

      RuleFor(x => x.Code)
          .Must((x, c) => !(string.IsNullOrEmpty(c) && string.IsNullOrEmpty(x.Code)))
          .WithMessage("Cần truyền thông tin code");

      RuleFor(x => x.Status).Must((x, c) => !(x.Status == null))
        .WithMessage("Cần truyền thông tin Status");

      RuleFor(x => x.StartDate).Must((x, c) => (x.StartDate is DateTime && x.StartDate >= DateTime.Now))
       .WithMessage("Cần truyền thông tin StartDate");


      RuleFor(x => x.EndDate).Must((x, c) => (x.EndDate is DateTime && x.EndDate > DateTime.Now))
      .WithMessage("Cần truyền thông tin EndDate");
    }
  }
}
