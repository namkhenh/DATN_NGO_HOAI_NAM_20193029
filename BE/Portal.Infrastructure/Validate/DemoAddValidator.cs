using Common.Dtos.Demo;
using Common.Dtos.Role;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Validate
{
  public class DemoAddValidator : AbstractValidator<CreateDemo>
  {
    public DemoAddValidator()
    {
      RuleFor(x => x.Name)
          .Must((x, c) => !(string.IsNullOrEmpty(c) && string.IsNullOrEmpty(x.Name)))
          .WithMessage("Cần truyền thông tin name");

      RuleFor(x => x.Code)
          .Must((x, c) => !(string.IsNullOrEmpty(c) && string.IsNullOrEmpty(x.Code)))
          .WithMessage("Cần truyền thông tin code");

     
    }
  }
}
