using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Share.SeedWorks
{
    public class RequestParameters
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; } = 10;

        public string SearchTerm { get; set; }
    }
}
