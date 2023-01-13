using Microsoft.EntityFrameworkCore;
using ProjectTracking.Entities;

namespace ProjectTracking;

public interface IApplicationContext
{
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<ProjectTask> ProjectTasks { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}