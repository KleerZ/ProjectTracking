using AutoMapper;
using ProjectTracking.Common.Mapping;
using ProjectTracking.Entities;

namespace ProjectTracking.ClientApp.Dto;

public class EmployeeDto : IMapWith<Employee>
{
  public int Id { get; set; }
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public string Project { get; set; }
  public int TasksCount { get; set; }

  public void Mapping(Profile profile)
  {
      profile.CreateMap<Employee, EmployeeDto>()
          .ForMember(u => u.Id,
              o => o.MapFrom(u => u.Id))
          .ForMember(u => u.FirstName,
              o => o.MapFrom(u => u.FirstName))
          .ForMember(u => u.LastName,
              o => o.MapFrom(u => u.LastName))
          .ForMember(u => u.Project,
              o => o.MapFrom(u => u.Projects.Select(c => c.Name)))
          .ForMember(u => u.TasksCount,
              o => o.MapFrom(u => u.ProjectTasks.Count));
  }
}
