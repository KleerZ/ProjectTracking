using Microsoft.EntityFrameworkCore;
using ProjectTracking.Entities;

namespace ProjectTracking;

public class ApplicationContext : DbContext, IApplicationContext
{
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<ProjectTask> ProjectTasks { get; set; }

    public ApplicationContext(DbContextOptions<ApplicationContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }
}