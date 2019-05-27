using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using ServerAPI.Models;

namespace ServerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientBranchesController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private AppSettings appSettings;

        public ClientBranchesController(DataBaseContext context, IOptions<AppSettings> settings)
        {
            _context = context;
            appSettings = settings.Value;
        }

        // GET: api/ClientBranches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientBranch>>> GetClientBranches()
        {

            return await _context.ClientBranches.ToListAsync();
        }

        // GET: api/ClientBranches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientBranch>> GetClientBranch(int id)
        {
            var clientBranch = await _context.ClientBranches.FindAsync(id);

            if (clientBranch == null)
            {
                return NotFound();
            }

            return clientBranch;
        }

        // PUT: api/ClientBranches/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClientBranch(int id, ClientBranch clientBranch)
        {
            if (id != clientBranch.ClientBranchID)
            {
                return BadRequest();
            }

            _context.Entry(clientBranch).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GetClientBranchByID(id))
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

        // POST: api/ClientBranches
        [HttpPost]
        public async Task<ActionResult<ClientBranch>> CreateClientBranch(ClientBranch clientBranch)
        {
            _context.ClientBranches.Add(clientBranch);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClientBranch", new { id = clientBranch.ClientBranchID }, clientBranch);
        }

        // DELETE: api/ClientBranches/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ClientBranch>> DeleteClientBranch(int id)
        {
            var clientBranch = await _context.ClientBranches.FindAsync(id);
            if (clientBranch == null)
            {
                return NotFound();
            }

            _context.ClientBranches.Remove(clientBranch);
            await _context.SaveChangesAsync();

            return clientBranch;
        }

        private bool GetClientBranchByID(int id)
        {
            return _context.ClientBranches.Any(e => e.ClientBranchID == id);
        }
    }
}
