namespace ProjectTracking.Entities;

public class Project
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Status { get; set; }
    public DateTime DeliveryDate { get; set; }
    public DateTime? FinishDate { get; set; }

    public List<Employee>? Employees { get; set; } = new();
    public List<ProjectTask>? ProjectTasks { get; set; } = new();
    public Customer? Customer { get; set; }
}