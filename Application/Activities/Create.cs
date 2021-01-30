using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Interface;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Percistent;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();
            }
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
                var activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };

                _dataContext.Activities.Add(activity);
                var user= await _dataContext.Users.SingleOrDefaultAsync(x=>x.UserName==_userAccessor.GetCurrentUserName());
                var attendee =new UserActivity {
                    AppUser=user,
                    Activity=activity,
                    IsHost=true,
                    DateJoined=DateTime.Now
                };
                
                _dataContext.UserActivities.Add(attendee);

                var sucsess = await _dataContext.SaveChangesAsync() > 0;
                if (sucsess) return Unit.Value;

                throw new Exception("Problem while saving data");
            }
        }
    }
}

