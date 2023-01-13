namespace ProjectTracking.Entities;

public class ProjectTask
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Status { get; set; }
    public DateTime DeliveryDate { get; set; }
    public DateTime? FinishDate { get; set; }

    public Employee? Employee { get; set; }
    public Project? Project { get; set; }
}