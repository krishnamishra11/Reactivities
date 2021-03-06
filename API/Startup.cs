using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.MiddleWare;
using Application.Activities;
using Application.Interface;
using AutoMapper;
using Domain;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Percistent;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt=> {
                opt.UseLazyLoadingProxies();
                opt.UseSqlite(Configuration.GetConnectionString("Default"));
                });
            services.AddControllers(opt=>
            {
                var policy=new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
                
            }
            )
            .AddFluentValidation(cfg=> {cfg.RegisterValidatorsFromAssemblyContaining<Create>();});
            
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(List.Handler));

            services.AddCors(
                ops=> ops.AddPolicy("CorsPolicy",
                   cops=>cops.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000")
                )
            );
            var builder=services.AddIdentityCore<AppUser>();
            var identityBuilder=new IdentityBuilder(builder.UserType,builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();
            services.AddAuthorization(opts=>
            {
                opts.AddPolicy("IsActivityHost",policy=>{
                    policy.Requirements.Add(new IsHostRequirment());
                }

                );
            });
            services.AddTransient<IAuthorizationHandler,IsHostRequirmentHandler>();
            services.AddAuthentication();
            services.AddScoped<IJwtGenerator,JwtGenerator>();
            services.AddScoped<IUserAccessor,UserAccessor>();

            var key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt=>
             opt.TokenValidationParameters=new TokenValidationParameters{
                 ValidateIssuerSigningKey=true,
                 IssuerSigningKey=key,
                 ValidateAudience=false,
                 ValidateIssuer=false
             });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandelingMiddleware>();

            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
            }
            app.UseRouting();

            // app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");
            
            app.UseAuthentication();
            app.UseAuthorization();
            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
