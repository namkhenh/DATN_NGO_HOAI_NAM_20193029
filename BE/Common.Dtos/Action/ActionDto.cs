﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.Action
{
  public class ActionDto
  {
    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public Guid MenuId { get; set; }
    public string Path { get; set; }
  }
}
