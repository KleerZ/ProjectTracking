using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectTracking.Entities;

namespace ProjectTracking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectTaskController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public ProjectTaskController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/ProjectTask
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectTask>>> GetProjectTasks()
        {
            if (_context.ProjectTasks == null)
            {
                return NotFound();
            }

            return await _context.ProjectTasks
                .Include(p => p.Employee)
                .Include(p => p.Project)
                .ToListAsync();
        }

        // GET: api/ProjectTask/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectTask>> GetProjectTask(int id)
        {
            if (_context.ProjectTasks == null)
            {
                return NotFound();
            }

            var projectTask = await _context.ProjectTasks
                .Include(p => p.Employee)
                .Include(p => p.Project)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (projectTask == null)
            {
                return NotFound();
            }

            return projectTask;
        }

        // PUT: api/ProjectTask/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}/{employeeId}/{projectId}")]
        public async Task<IActionResult> PutProjectTask(int id, int employeeId, int projectId,
            ProjectTask projectTask)
        {
            if (id != projectTask.Id)
            {
                return BadRequest();
            }

            _context.Entry(projectTask).State = EntityState.Modified;
            projectTask.DeliveryDate = projectTask.DeliveryDate.ToUniversalTime();
            projectTask.Employee = await _context.Employees.FirstOrDefaultAsync(c => c.Id == employeeId);
            projectTask.Project = await _context.Projects.FirstOrDefaultAsync(c => c.Id == projectId);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectTaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProjectTask
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{employeeId:int}/{projectId:int}")]
        public async Task<ActionResult<ProjectTask>> PostProjectTask(int employeeId, int projectId,
            ProjectTask projectTask)
        {
            if (_context.ProjectTasks == null)
            {
                return Problem("Entity set 'ApplicationContext.ProjectTasks'  is null.");
            }
            projectTask.Employee = await _context.Employees.FirstOrDefaultAsync(e => e.Id == employeeId);
            projectTask.Project = await _context.Projects.FirstOrDefaultAsync(e => e.Id == projectId);
            projectTask.DeliveryDate = projectTask.DeliveryDate.ToUniversalTime();

            var project = await _context.Projects
                .FirstOrDefaultAsync(p => p.Id == projectId);
            project.Status = "Not finished";

            _context.Projects.Update(project);
            _context.ProjectTasks.Add(projectTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectTask", new { id = projectTask.Id }, projectTask);
        }

        [HttpPost("finish/{id}")]
        public async Task<ActionResult> Finish(int id)
        {
            var task = await _context.ProjectTasks
                .Include(p => p.Project)
                .FirstOrDefaultAsync(p => p.Id == id);
            task.Status = "Finished";
            task.FinishDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == task.Project.Id);
            if (project != null && !_context.ProjectTasks.Any(t=> t.Project.Id == project.Id && t.Status != "Finished"))
            {
                project.Status = "Finished";
                project.FinishDate = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        // DELETE: api/ProjectTask/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectTask(int id)
        {
            if (_context.ProjectTasks == null)
            {
                return NotFound();
            }
            
            var projectTask = await _context.ProjectTasks.FindAsync(id);
            if (projectTask == null)
            {
                return NotFound();
            }

            _context.ProjectTasks.Remove(projectTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectTaskExists(int id)
        {
            return (_context.ProjectTasks?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}