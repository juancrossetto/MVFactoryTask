﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
    public class WeathersController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private AppSettings appSettings;

        public WeathersController(DataBaseContext context, IOptions<AppSettings> settings)
        {
            _context = context;
            appSettings = settings.Value;
        }

        // GET: api/Weathers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Weather>>> GetWeathers()
        {
            return await _context.Weathers.ToListAsync();
        }

        // GET: api/Weathers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Weather>> GetWeather(int id)
        {
            var weather = await _context.Weathers.FindAsync(id);

            if (weather == null)
            {
                return NotFound();
            }

            return weather;
        }

        // PUT: api/Weathers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWeather(int id, Weather weather)
        {
            if (id != weather.WeatherID)
            {
                return BadRequest();
            }

            _context.Entry(weather).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GetWeatherByID(id))
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

        // POST: api/Weathers
        [HttpPost]
        public async Task<ActionResult<Weather>> InsertWeather(Weather weather)
        {
            _context.Weathers.Add(weather);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWeather", new { id = weather.WeatherID }, weather);
        }

        // DELETE: api/Weathers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Weather>> DeleteWeather(int id)
        {
            var weather = await _context.Weathers.FindAsync(id);
            if (weather == null)
            {
                return NotFound();
            }

            _context.Weathers.Remove(weather);
            await _context.SaveChangesAsync();

            return weather;
        }

        // GET: api/Weather/GetWeatherByCityName/Buenos%20Aires,ar
        [HttpGet("GetWeatherByCityName")]
        public async Task<ActionResult<double>> GetWeatherByCityName(string cityName, string country)
        {

            var api_url = appSettings.OpenWeatherApiUrl;
            var api_id = appSettings.AppID;
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(api_url);
            var response = await client.GetAsync(string.Format("weather?q={0},{1}&appid={2}",cityName, country, api_id));

            // This line gives me error
            var stringResult = await response.Content.ReadAsStringAsync();

            var obj = JsonConvert.DeserializeObject<dynamic>(stringResult);
            var tmpDegreesF = Math.Round(((float)obj.main.temp * 9 / 5 - 459.67), 2);
            return tmpDegreesF;
        }

        //[HttpGet("[action]/{city}")]
        [HttpGet("GetWeatherByCity")]
        public async Task<IActionResult> GetWeatherByCity(string city)
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
                    return Ok(new
                    {
                        Summary = string.Join(",", rawWeather.Weather.Select(x => x.Main)),
                        //Id = rawWeather.Id,
                        Code = rawWeather.Cod,
                        Country = rawWeather.Sys.Country,
                        Name = rawWeather.Name, 
                        Temperature = rawWeather.Main.Temp,
                        Temp_Min = rawWeather.Main.Temp_Min,
                        Temp_Max = rawWeather.Main.Temp_Max,
                        Humidity = rawWeather.Main.Humidity,
                        Pressure = rawWeather.Main.Pressure,
                        WindDirection = rawWeather.Wind.Deg,
                        WindSpeed = rawWeather.Wind.Speed,
                        Latitude = rawWeather.Coord.Lat,
                        Longitude = rawWeather.Coord.Lon,
                    });
                }
                catch (HttpRequestException httpRequestException)
                {
                    return BadRequest($"Error getting weather from OpenWeather: {httpRequestException.Message}");
                }
            }
        }

        private bool GetWeatherByID(int id)
        {
            return _context.Weathers.Any(e => e.WeatherID == id);
        }
    }
}
