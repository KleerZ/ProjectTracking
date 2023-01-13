﻿namespace ProjectTracking.Entities;

public class Employee
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public List<Project> Projects { get; set; } = new();
    public List<ProjectTask> ProjectTasks { get; set; } = new();
}