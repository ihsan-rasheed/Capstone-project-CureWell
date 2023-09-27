using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CurewellAPI.Models;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace CurewellAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurgeriesController : ControllerBase
    {
        private readonly CureWellDbContext _context;

        public SurgeriesController(CureWellDbContext context)
        {
            _context = context;
        }

        // GET: api/Surgeries
        [HttpGet("GetAllSurgeries")]
        public async Task<ActionResult<IEnumerable<Surgery>>> GetAllSurgeries()
        {
            try
            {
                if (_context.Surgeries == null)
                {
                    return NotFound();
                }
                return await _context.Surgeries.ToListAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

            // GET: api/sugeries-today
            [HttpGet]
        public async Task<ActionResult<IEnumerable<Surgery>>> GetSurgeries()
        {
            try
            {
                // Get today's date
                DateTime today = DateTime.Now.Date;
            // Query the surgeries where the surgery date is today
            var surgeries = await _context.Surgeries
                .Where(s => s.SurgeryDate.Date == today)
                .ToListAsync();
            if (surgeries == null)
            {
                return NotFound();
            }
            return surgeries;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        // GET: api/Surgeries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Surgery>> GetSurgery(int id)
        {
            try
            {
                if (_context.Surgeries == null)
            {
                return NotFound();
            }
            var surgery = await _context.Surgeries.FindAsync(id);

            if (surgery == null)
            {
                return NotFound();
            }

            return surgery;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        // PUT: api/Surgeries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSurgery(int id, Surgery surgery)
        {
            if (id != surgery.SurgeryId)
            {
                return BadRequest();
            }

            _context.Entry(surgery).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SurgeryExists(id))
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

        // POST: api/Surgeries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Surgery>> PostSurgery(Surgery surgery)
        {
            try
            {
                if (_context.Surgeries == null)
          {
              return Problem("Entity set 'CureWellDbContext.Surgeries'  is null.");
          }
            _context.Surgeries.Add(surgery);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSurgery", new { id = surgery.SurgeryId }, surgery);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // DELETE: api/Surgeries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSurgery(int id)
        {
            try
            {
                if (_context.Surgeries == null)
            {
                return NotFound();
            }
            var surgery = await _context.Surgeries.FindAsync(id);
            if (surgery == null)
            {
                return NotFound();
            }

            _context.Surgeries.Remove(surgery);
            await _context.SaveChangesAsync();

            return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        private bool SurgeryExists(int id)
        {
            return (_context.Surgeries?.Any(e => e.SurgeryId == id)).GetValueOrDefault();
        }
    }
}
