
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Domain;
using MediatR;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{

    public class ActivitiesController : BaseController
    {      
        
        [HttpGet]
        public async Task<ActionResult<List<ActivityDto>>> List ()
        {
           return await Mediator.Send(new List.Query());  
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<ActivityDto>> Details (Guid Id)
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
         [Authorize(Policy="IsActivityHost")]
        public async Task<ActionResult<Unit>> Edit (Guid id,Edit.Command command)
        {
            command.Id=id;
            return await Mediator.Send(command);  
        }


          [HttpDelete("{id}")]
          [Authorize(Policy="IsActivityHost")]
        public async Task<ActionResult<Unit>> Delete (Guid id)
        {
            
            return await Mediator.Send(new Delete.Command {Id=id});  
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Attend (Guid id)
        {
            
            return await Mediator.Send(new Attend.Command {Id=id});  
        }

         [HttpDelete("{id}/attend")]
        public async Task<ActionResult<Unit>> Unattend (Guid id)
        {
            
            return await Mediator.Send(new Unattend.Command {Id=id});  
        }
    }
}