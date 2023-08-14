﻿using Common.Contract.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Infrastructure.Common.Implements
{
  public class UnitOfWork<TContext> : IUnitOfWork<TContext> where TContext : DbContext
  {
    private readonly TContext _context;

    public UnitOfWork(TContext context)
    {
      _context = context;
    }

    public void Dispose() => _context.Dispose();

    public Task<int> CommitAsync() => _context.SaveChangesAsync();
  }
}
