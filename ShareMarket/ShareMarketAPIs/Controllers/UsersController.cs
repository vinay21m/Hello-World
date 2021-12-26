using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ServiceModel.Interface;
using ServiceModel.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ShareMarketAPIs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<UsersController> _logger;

        private IUsers _userManager;
        private readonly ApplicationSettings _applicationSettings;
        public UsersController(IUsers loginModel, IOptions<ApplicationSettings> options, ILogger<UsersController> logger)
        {
            _logger = logger;
            _userManager = loginModel;
            _applicationSettings = options.Value;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(UserModel model)
        {
            var user = await _userManager.FindByName(model.UserName);
            if (user != null && _userManager.CheckPassword(user, model.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity
                    (
                        new Claim[]
                        {
                            new Claim("UserId", user.UserId.ToString()),
                            new Claim("UserName", user.UserName.ToString()),
                            new Claim("UserType", user.UserType.ToString())
                        }
                    ),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials
                    (
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_applicationSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature
                    )
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Username and password is incorrect." });
        }

        [HttpPost]
        public async Task<IActionResult> AddUserAsync(UserModel userModel)
        {
            var userValidate = await _userManager.FindByName(userModel.UserName);
            if (userValidate != null)
            {
                return BadRequest(new { message = "Username name already exists." });
            }
            else
            {
                var user = await _userManager.AddUserAsync(userModel);
                return Ok(user);
            }
        }
    }
}
