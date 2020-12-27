


using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Interface;
using Domain;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Security
{

    public class JwtGenerator : IJwtGenerator
    {
        private readonly SymmetricSecurityKey _key;
        public JwtGenerator(IConfiguration config)
        {
           
             _key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
        public string CreateToken(AppUser user)
        {
            var claims= new List<Claim>{
                new Claim (JwtRegisteredClaimNames.NameId,user.UserName)
            };
           
            var cred= new SigningCredentials(_key,SecurityAlgorithms.HmacSha256Signature);
            var tokendiscripter= new SecurityTokenDescriptor(){
                Subject=new ClaimsIdentity(claims),
                Expires= DateTime.Now.AddDays(7),
                SigningCredentials=cred
            };
            var tokenhandler=new JwtSecurityTokenHandler();
            var token =tokenhandler.CreateToken(tokendiscripter);
            return tokenhandler.WriteToken(token);
            
        }
    }
}