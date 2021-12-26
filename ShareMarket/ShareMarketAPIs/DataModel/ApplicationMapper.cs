using AutoMapper;
using ServiceModel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareMarketAPIs.DataModel
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<Users, UserModel>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
            .ReverseMap()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.UserId));
        }
    }
}
