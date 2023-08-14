using Common.Contract.Domain;
using Common.Contract.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Domain.Entities
{
    public class PageSingal:EntityAuditBase<Guid>, IEntityBase<Guid>
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
