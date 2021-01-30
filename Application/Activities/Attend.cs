using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Percistent;

namespace Application.Activities
{
    public class Attend
    {
           public class Command : IRequest
        {
            public Guid Id { get; set; }
         
        }

       

        public class Handler : IRequestHandler<Command>
        {
            public DataContext _dataContext { get; }
            public IUserAccessor _userAccessor { get; }
            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _dataContext = dataContext;

            }

            async Task<Unit> IRequestHandler<Command, Unit>.Handle(Command request, CancellationToken cancellationToken)
            {


                var activity=await _dataContext.Activities.FindAsync(request.Id);

               if(activity==null)
                  throw new RestException(HttpStatusCode.NotFound,new {ActivityDto="Could not found Activity"});
                  
                var user = await _dataContext.Users.SingleOrDefaultAsync(x=>x.UserName==_userAccessor.GetCurrentUserName());
               
                var attendance= await _dataContext.UserActivities
                        .SingleOrDefaultAsync(x=>x.ActivityId==activity.Id && 
                            x.AppUserId==user.Id);

                if(attendance!=null)
                {
                    throw new RestException(HttpStatusCode.BadRequest,
                         new {AttendeeDto="User already attending this Activity"});
                }

                attendance= new UserActivity(){
                     Activity=activity,
                     AppUser=user,
                     IsHost=false,
                     DateJoined=DateTime.Now
                };
                _dataContext.UserActivities.Add(attendance);

                var sucsess = await _dataContext.SaveChangesAsync() > 0;
                if (sucsess) return Unit.Value;

                throw new Exception("Problem while saving data");
            }
        }
    }
}