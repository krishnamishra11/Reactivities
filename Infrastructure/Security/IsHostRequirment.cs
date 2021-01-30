using System;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Percistent;

namespace Infrastructure.Security
{
    public class IsHostRequirment : IAuthorizationRequirement
    {

    }

    public class IsHostRequirmentHandler : AuthorizationHandler<IsHostRequirment>
    {

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _dataContext;
        public IsHostRequirmentHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _dataContext=context;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirment requirement)
        {
            var currentUserName=_httpContextAccessor.HttpContext.User?.Claims?
            .SingleOrDefault(q=>q.Type==ClaimTypes.NameIdentifier)?.Value;
            Debug.Write(currentUserName);
            var activityId=Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues
            .SingleOrDefault(q=>q.Key.ToLower()=="id").Value.ToString());
            var activity=_dataContext.Activities.FindAsync(activityId).Result;
            var host=activity.UserActivities.FirstOrDefault(x=>x.IsHost);
            if(host?.AppUser?.UserName==currentUserName)
            {
                    context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}