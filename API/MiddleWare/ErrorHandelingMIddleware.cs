using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace API.MiddleWare
{
    public class ErrorHandelingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandelingMiddleware> _logger;

        public ErrorHandelingMiddleware(RequestDelegate next,ILogger<ErrorHandelingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try{
                await _next(context);
            }
            catch(Exception ex)
            {
                await HandleExceptionAsync(context ,ex, _logger);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex, ILogger<ErrorHandelingMiddleware> logger)
        {
            Object errors=null;
            switch(ex){
                case RestException re:
                    logger.LogError(ex, "REST ERROR");
                    errors=re.Error;
                    context.Response.StatusCode=(int)re.Code;
                    break;

                case Exception e:
                   logger.LogError(ex,"SERVER ERR");
                   errors=string.IsNullOrWhiteSpace(e.Message)?"Error":e.Message;
                   context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;    
                   break;  
            }
            context.Response.ContentType="application/json";
            if(errors!=null)
            {
                var result=JsonSerializer.Serialize(new {errors});
                await context.Response.WriteAsync(result);
            }
            
        }
    }
}