using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceModel.Interface;
using ServiceModel.Models;
using ShareMarketAPIs.Repository.Interface;

namespace ServiceModel.Service
{
    public class UserService : IUsers
    {
        private readonly IUserRepository _userRepository;

        UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<UserModel> FindByName(string UserName)
        {
            return await _userRepository.FindByName(UserName);
            //return !string.IsNullOrEmpty(UserName) && UserName == "vivek" ?
            //    new UserModel 
            //    { 
            //        UserId = 1, UserName = "vivek", Password = "sharma", UserType = "admin" 
            //    } : null;
        }

        public bool CheckPassword(UserModel model, string password)
        {
            return !string.IsNullOrEmpty(password) && model.Password == password;
        }

        public async Task<UserModel> AddUserAsync(UserModel userModel)
        {
            return await _userRepository.AddUserAsync(userModel);
        }
    }
}
