using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectTracking;
using ProjectTracking.ClientApp.Dto;
using ProjectTracking.Common.Dto;
using ProjectTracking.Entities;

namespace ProjectTracking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public EmployeeController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }

            return await _context.Employees
                .ToListAsync();
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }

            var employee = await _context.Employees
                .FirstOrDefaultAsync(e => e.Id == id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employee/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, PostEmployeeDto dto)
        {

            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.Id == id);
            _context.Entry(employee).State = EntityState.Modified;
            employee.FirstName = dto.FirstName;
            employee.LastName = dto.LastName;
            employee.Projects = await _context.Projects
                .Where(c => dto.Projects.Contains(c.Id.ToString()))
                .ToListAsync();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
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

        // POST: api/Employee
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(PostEmployeeDto dto)
        {
            if (_context.Employees == null)
            {
                return Problem("Entity set 'ApplicationContext.Employees'  is null.");
            }
            
            var employee = new Employee
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Projects = await _context.Projects
                    .Where(c => dto.Projects.Contains(c.Id.ToString()))
                    .ToListAsync()
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }

            var employee = await _context.Employees
                .Include(e => e.ProjectTasks)
                .FirstOrDefaultAsync(e => e.Id == id);
            var pt =  employee.ProjectTasks;
            if (employee == null)
            {
                return NotFound();
            }

            _context.ProjectTasks.RemoveRange(pt);
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return (_context.Employees?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}