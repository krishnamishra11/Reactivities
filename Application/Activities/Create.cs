using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Percistent;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest { 
             public Guid Id { get; set; }    
            public string  Title { get; set; }
            public string  Description { get; set; }
            public string  Category { get; set; }
            public DateTime  Date { get; set; }
            public string  City { get; set; }
            public string  Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            public DataContext _dataContext { get; }
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;

            }

            async Task<Unit> IRequestHandler<Command, Unit>.Handle(Command request, CancellationToken cancellationToken)
            {
                var activity=new Activity{
                    Id =request.Id,
                    Title =request.Title,
                    Description =request.Description,
                    Category =request.Category,
                    Date =request.Date,
                    City =request.City,
                    Venue =request.Venue
                }   ;

                  _dataContext.Activities.Add(activity);
                  var sucsess= await _dataContext.SaveChangesAsync()>0;
                  if(sucsess) return Unit.Value;

                throw new  Exception("Problem while saving data");
            }
        }
    }
}

