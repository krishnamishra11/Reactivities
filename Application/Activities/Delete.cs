using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Percistent;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest { 
           public Guid Id {get;set;}
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
                var activity= await _dataContext.Activities.FindAsync(request.Id);

                if(activity==null)
                    throw new RestException(HttpStatusCode.NotFound,new {activity="Not Found"}) ;

                  _dataContext.Activities.Remove(activity);

                  var sucsess= await _dataContext.SaveChangesAsync()>0;
                  if(sucsess) return Unit.Value;

                throw new  Exception("Problem while delete data");
            }
        }
    }
}

