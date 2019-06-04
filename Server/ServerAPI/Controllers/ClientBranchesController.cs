using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using ServerAPI.Models;
using ServerAPI.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

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
            var clientBranch = await _context.ClientBranches.Where(b => b.Id == id)
                                        .Include(b => b.Weather).FirstOrDefaultAsync();
            
            if (clientBranch == null)
            {
                return NotFound();
            }

            return clientBranch;
        }

        [HttpGet("GetClientBranchesByName")]
        public async Task<ActionResult<IEnumerable<ClientBranch>>> GetClientBranchesByName(string name)
        {
            ActionResult<IEnumerable<ClientBranch>> clientBranches;
            if (string.IsNullOrEmpty(name))
            {
                clientBranches = await _context.ClientBranches.Include(b => b.Weather).ToListAsync();
            }
            else
            {
                clientBranches = await _context.ClientBranches.Where(b => b.Name.ToUpper().Contains(name))
                                           .Include(b => b.Weather).ToListAsync();
            }
            

            if (clientBranches == null)
            {
                return NotFound();
            }

            return clientBranches;
        }

        // PUT: api/ClientBranches/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClientBranch(int id, ClientBranch clientBranch)
        {
            try
            {
                if (id != clientBranch.Id)
                {
                    return BadRequest();
                }

                if (!string.IsNullOrEmpty(clientBranch.Image))
                    clientBranch.Image = ValidateImage(clientBranch.Image);

                var weather = this.GetWeatherByCity(clientBranch.City).Result.Value;

                if (weather == null)
                    throw new InvalidCityException("Ciudad no válida");

                _context.Entry(clientBranch).State = EntityState.Modified;


                await _context.SaveChangesAsync();
            }
            catch (InvalidCityException ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
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

        /// <summary>
        /// POST: api/ClientBranches -- Method to Create a Client Branch
        /// </summary>
        /// <param name="clientBranch">object to persist</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<ClientBranch>> PostClientBranch(ClientBranch clientBranch)
        {
            try
            {
                if(clientBranch == null)
                    return StatusCode(StatusCodes.Status204NoContent);
                else
                {
                    if (!string.IsNullOrEmpty(clientBranch.Image))
                        clientBranch.Image = ValidateImage(clientBranch.Image);

                    var weather = this.GetWeatherByCity(clientBranch.City).Result.Value;

                    if (weather == null)
                        throw new InvalidCityException("Ciudad no válida");
                    else
                        clientBranch.Weather = weather;
                    
                    _context.ClientBranches.Add(clientBranch);
                    await _context.SaveChangesAsync();
                }
            }
            catch (InvalidCityException ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }

            catch (Exception ex )
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

            return CreatedAtAction("GetClientBranch", new { id = clientBranch.Id }, clientBranch);
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
        
        [HttpGet("GetWeatherByCity")]
        public async Task<ActionResult<Weather>> GetWeatherByCity(string city)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    var api_url = appSettings.OpenWeatherApiUrl;
                    var api_id = appSettings.AppID;
                    client.BaseAddress = new Uri(api_url);
                    var response = await client.GetAsync($"/data/2.5/weather?q={city}&appid={api_id}&units=metric");

                    if (response.StatusCode == HttpStatusCode.NotFound)
                        return Ok(new { Error = "La ciudad indicada no es valida" });

                    response.EnsureSuccessStatusCode();

                    var stringResult = await response.Content.ReadAsStringAsync();
                    var rawWeather = JsonConvert.DeserializeObject<OpenWeatherResponse>(stringResult);
                    return new Weather()
                    {
                        Summary = string.Join(",", rawWeather.Weather.Select(x => x.Main)),
                        //WeatherID = rawWeather.Id,
                        Code = rawWeather.Cod,
                        Country = rawWeather.Sys.Country,
                        Name = rawWeather.Name, /**/
                        Temperature = rawWeather.Main.Temp,
                        Temp_Min = rawWeather.Main.Temp_Min,
                        Temp_Max = rawWeather.Main.Temp_Max,
                        Humidity = rawWeather.Main.Humidity,
                        Pressure = rawWeather.Main.Pressure,
                        WindDirection = rawWeather.Wind.Deg,
                        WindSpeed = rawWeather.Wind.Speed,
                        Latitude = rawWeather.Coord.Lat,
                        Longitude = rawWeather.Coord.Lon,
                        Clouds = rawWeather.Clouds.All
                    };
                }
                catch (HttpRequestException httpRequestException)
                {
                    return BadRequest($"Error getting weather from OpenWeather: {httpRequestException.Message}");
                }
            }
        }

        private string ValidateImage(string image)
        {
            image = image.Replace("data:image/png;base64,", "");
            image = image.Replace("data:image/jpeg;base64,", "");
            return image;
        }
        private bool GetClientBranchByID(int id)
        {
            return _context.ClientBranches.Any(e => e.Id == id);
        }
    }
}
