using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
      
          public class Query:IRequest<User>{}
        public class Handler : IRequestHandler<Query,User>
        {

        
            public readonly UserManager<AppUser> _userManager;
            public readonly SignInManager<AppUser> _signInManager;
            public readonly IJwtGenerator _jwtGenerator;
            public readonly IUserAccessor _userAccessor;
            public Handler(UserManager<AppUser> userManager, IUserAccessor userAccessor, IJwtGenerator jwtGenerator)
            {
                _userAccessor = userAccessor;
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
               
            }



            public async Task<User> Handle( Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUserName());
                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized);
                }
                return new User
                    {
                        Username = user.UserName,
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreateToken(user),
                        Image = null

                    };
  

            }


        }
    }
}