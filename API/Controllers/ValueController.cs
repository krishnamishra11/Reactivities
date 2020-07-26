using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Percistent;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ValueController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<ValueController> _logger;


        public DataContext _dbContext { get; }

        public ValueController(ILogger<ValueController> logger, DataContext dbContext)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Value>>> Get()
        {
            var valslist= await _dbContext.Values.ToListAsync();
            return Ok(valslist);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Value>> Get(int Id)
        {
            var val= await _dbContext.Values.FindAsync(Id);
            return Ok(val);
        }
    }
}
