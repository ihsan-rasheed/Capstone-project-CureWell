
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CurewellAPI.Models;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace CurewellAPI.Controllers
{
    public class DoctorSpecializationInputModel
    {
        [Required]
        public int DoctorId { get; set; }

        [Required]
        [StringLength(3)]
        public string SpecializationCode { get; set; }

        [Required]
        public DateTime Specialization { get; set; }
    }


    [Route("api/[controller]")]
    [ApiController]
    public class DoctorSpecializationsController : ControllerBase
    {
        private readonly CureWellDbContext _context;

        public DoctorSpecializationsController(CureWellDbContext context)
        {
            _context = context;
        }

        // GET: api/DoctorSpecializations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorSpecialization>>> GetDoctorSpecializations()
        {
            try
            {
                var doctorSpecializations = await _context.DoctorSpecializations.ToListAsync();
                if (doctorSpecializations == null || doctorSpecializations.Count == 0)
                {
                    return NotFound();
                }
                return doctorSpecializations;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // GET: api/DoctorSpecializations/5/XYZ
        [HttpGet("{doctorId}/{specializationCode}")]
        public async Task<ActionResult<DoctorSpecialization>> GetDoctorSpecialization(int doctorId, string specializationCode)
        {
            try
            {
                var doctorSpecialization = await _context.DoctorSpecializations.FindAsync(doctorId, specializationCode);

            if (doctorSpecialization == null)
            {
                return NotFound();
            }

            return doctorSpecialization;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        //-------------------------------------------------------------------------------------------
        // GET: api/DoctorSpecializations/5/XYZ



        [HttpGet("GetDoctorsBySpecialization/{specialization}")]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctorsBySpecialization(string specialization)
        {
            try
            {

                // Query the doctors by joining the doctors and doctorspecialization tables
                var doctors = await _context.Doctors
                .Join(
                    _context.DoctorSpecializations,
                    doctor => doctor.DoctorId,
                    specializationEntry => specializationEntry.DoctorId,
                    (doctor, specializationEntry) => new { Doctor = doctor, Specialization = specializationEntry }
                )
                .Where(joinResult => joinResult.Specialization.SpecializationCode == specialization)
                .Select(joinResult => joinResult.Doctor)
                .ToListAsync();



            if (doctors == null)
            {
                return NotFound();
            }



            return doctors;
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }


        }
        // POST: api/DoctorSpecializations
        [HttpPost]
        public async Task<ActionResult<DoctorSpecialization>> PostDoctorSpecialization(DoctorSpecializationInputModel inputModel)
        {
            var doctorSpecialization = new DoctorSpecialization
            {
                DoctorId = inputModel.DoctorId,
                SpecializationCode = inputModel.SpecializationCode,
                Specialization = inputModel.Specialization
            };

            _context.DoctorSpecializations.Add(doctorSpecialization);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DoctorSpecializationExists(inputModel.DoctorId, inputModel.SpecializationCode))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDoctorSpecialization", new { doctorId = inputModel.DoctorId, specializationCode = inputModel.SpecializationCode }, doctorSpecialization);
        }

        // PUT: api/DoctorSpecializations/5/XYZ
        [HttpPut("{doctorId}/{specializationCode}")]
        public async Task<IActionResult> PutDoctorSpecialization(int doctorId, string specializationCode, DoctorSpecializationInputModel inputModel)
        {
            if (doctorId != inputModel.DoctorId || specializationCode != inputModel.SpecializationCode)
            {
                return BadRequest();
            }

            var doctorSpecialization = new DoctorSpecialization
            {
                DoctorId = inputModel.DoctorId,
                SpecializationCode = inputModel.SpecializationCode,
                Specialization = inputModel.Specialization
            };

            _context.Entry(doctorSpecialization).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorSpecializationExists(doctorId, specializationCode))
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

        //----------------------------------------------------------------------------
        // DELETE: api/DoctorSpecializations/5/XYZ
        [HttpDelete("{doctorId}/{specializationCode}")]
        public async Task<IActionResult> DeleteDoctorSpecialization(int doctorId, string specializationCode)
        {
            try
            {
                var doctorSpecialization = await _context.DoctorSpecializations.FindAsync(doctorId, specializationCode);
            if (doctorSpecialization == null)
            {
                return NotFound();
            }

            _context.DoctorSpecializations.Remove(doctorSpecialization);
            await _context.SaveChangesAsync();

            return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        private bool DoctorSpecializationExists(int doctorId, string specializationCode)
        {
            return _context.DoctorSpecializations.Any(e => e.DoctorId == doctorId && e.SpecializationCode == specializationCode);
        }
    }
}