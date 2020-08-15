using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Percistent;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity> { 
            public Guid Id {get;set;}
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            public DataContext _dataContext { get; }
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;

            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity= await  _dataContext.Activities.FindAsync(request.Id);
                return activity;
            }
        }
    }
}

