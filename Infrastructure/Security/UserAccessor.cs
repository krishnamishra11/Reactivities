using System.Linq;
using System.Security.Claims;
using Application.Interface;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        public readonly IHttpContextAccessor _httpContextAccessor;
        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;

        }
        public string GetCurrentUserName()
        {
           return _httpContextAccessor
           .HttpContext
           .User?
           .Claims?
           .FirstOrDefault(q =>q.Type==ClaimTypes.NameIdentifier)?
           .Value;
        }
    }
}