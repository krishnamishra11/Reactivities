using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interface;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Percistent;
using Application.Validetors;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Username { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).NotEmpty().Password();
                RuleFor(x => x.Username).NotEmpty();

            }
        }

        public class Handler : IRequestHandler<Command,User>
        {
            public DataContext _dataContext { get; }
            public UserManager<AppUser> _userManager { get; }
            public IJwtGenerator _jwtGenerator { get; }
            public Handler(DataContext dataContext, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _dataContext = dataContext;

            }

            async Task<User> IRequestHandler<Command, User>.Handle(Command request, CancellationToken cancellationToken)
            {
               if(await _dataContext.Users.AnyAsync(x=>x.Email==request.Email))
               {
                   throw new RestException(HttpStatusCode.BadRequest,new {Email="Email Already Exists"});
               }
                if(await _dataContext.Users.AnyAsync(x=>x.UserName==request.Username))
               {
                   throw new RestException(HttpStatusCode.BadRequest,new {UserName="UserName Already Exists"});
               }

               var appuser= new AppUser{
                   DisplayName=request.DisplayName,
                   UserName=request.Username,
                   Email=request.Email

               };

               var result =await _userManager.CreateAsync(appuser,request.Password);


                if (result.Succeeded) 
                return
                 new User {
                     Username=appuser.UserName,
                     DisplayName=appuser.DisplayName,
                     Token=_jwtGenerator.CreateToken(appuser),
                     Image=null
                 };

                throw new Exception("Problem while creating user");
            }
        }
    }
}