using AutoMapper;
using ProjectTracking.Common.Mapping;
using ProjectTracking.Entities;

namespace ProjectTracking.ClientApp.Dto;

public class CustomerDto : IMapWith<Customer>
{
    public int Id { get; set; }
    public string Name { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<Customer, CustomerDto>()
            .ForMember(u => u.Id,
                o => o.MapFrom(u => u.Id))
            .ForMember(u => u.Name,
                o => o.MapFrom(u => u.Name));
    }
}
