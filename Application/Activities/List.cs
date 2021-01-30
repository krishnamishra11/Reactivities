using System.Collections.Generic;
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
    public class List
    {
        public class Query : IRequest<List<ActivityDto>> { }

        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly IMapper _mapper;

            public DataContext _dataContext { get; }
            public Handler(DataContext dataContext,IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities= await  _dataContext
                .Activities
                .ToListAsync();
                

                var activityToReturn=_mapper.Map<List<Activity>,List<ActivityDto>>(activities);

                return activityToReturn;
            }
        }
    }
}