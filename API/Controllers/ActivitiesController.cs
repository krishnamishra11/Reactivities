
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

    public class ActivitiesController : BaseController
    {      
        
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List ()
        {
           return await Mediator.Send(new List.Query());  
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Activity>> Details (Guid Id)
        {
             var details= new Details.Query();
                details.Id=Id;
            return await Mediator.Send(details);  
        }

        [HttpPost()]
        public async Task<ActionResult<Unit>> Create (Create.Command command)
        {

            return await Mediator.Send(command);  
        }
         [HttpPut("{Id}")]
        public async Task<ActionResult<Unit>> Edit (Guid Id,Edit.Command command)
        {
            command.Id=Id;
            return await Mediator.Send(command);  
        }


          [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete (Guid id)
        {
            
            return await Mediator.Send(new Delete.Command {Id=id});  
        }

    }
}