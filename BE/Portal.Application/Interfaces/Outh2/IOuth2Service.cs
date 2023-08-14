using Common.Common.ActionResponse;
using Common.Dtos.Outh2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.Outh2
{
    public interface IOuth2Service
    {
        Task<ActionResponse<UserLoginDto>> Authenication(AuthenticationRequest request);        
    }
}
