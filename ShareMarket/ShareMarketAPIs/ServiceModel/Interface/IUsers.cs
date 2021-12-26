using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceModel.Models;

namespace ServiceModel.Interface
{
    public interface IUsers
    {
        Task<UserModel> FindByName(string UserName);
        bool CheckPassword(UserModel model, string password);

        Task<UserModel> AddUserAsync(UserModel userModel);
    }
}
