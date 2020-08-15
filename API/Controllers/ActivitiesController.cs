
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Domain;
using MediatR;
using Application.Activities;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivitiesController : ControllerBase
    {
        public IMediator _mediator { get; }
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List ()
        {
           return await _mediator.Send(new List.Query());  
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Activity>> Details (Guid Id)
        {
             var details= new Details.Query();
                details.Id=Id;
            return await _mediator.Send(details);  
        }

        [HttpPost()]
        public async Task<ActionResult<Unit>> Create (Create.Command command)
        {

            return await _mediator.Send(command);  
        }
         [HttpPut("{Id}")]
        public async Task<ActionResult<Unit>> Edit (Guid Id,Edit.Command command)
        {
            command.Id=Id;
            return await _mediator.Send(command);  
        }


          [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete (Guid id)
        {
            
            return await _mediator.Send(new Delete.Command {Id=id});  
        }

    }
}