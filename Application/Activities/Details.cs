using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Percistent;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<ActivityDto> { 
            public Guid Id {get;set;}
        }

        public class Handler : IRequestHandler<Query, ActivityDto>
        {
            private readonly IMapper _mapper;

            public DataContext _dataContext { get; }
            public Handler(DataContext dataContext,IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<ActivityDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity= await  _dataContext.Activities
                            .FindAsync(request.Id);

                  if(activity==null)
                    throw new RestException(HttpStatusCode.NotFound,new {activity="Not Found"}) ;

                    var returnObject=_mapper.Map<Activity,ActivityDto>(activity);
                return returnObject;
            }
        }
    }
}

