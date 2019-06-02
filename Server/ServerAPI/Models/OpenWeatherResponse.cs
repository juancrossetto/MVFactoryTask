using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerAPI.Models
{
    public class OpenWeatherResponse
    {
        public string Name { get; set; }

        public int Cod { get; set; }

        public int Id { get; set; }
        public string Visibility { get; set; }

        public IEnumerable<WeatherDescription> Weather { get; set; }

        public Main Main { get; set; }

        public Coordinates Coord { get; set; }

        public Wind Wind { get; set; }

        public System Sys { get; set; }

        public Cloud Clouds { get; set; }
    }

    public class Cloud
    {
        public string All { get; set; }
    }

    public class WeatherDescription
    {
        public string Main { get; set; }
        public string Description { get; set; }
    }

    public class Main
    {
        public decimal Temp { get; set; }
        public string Pressure { get; set; }
        public string Humidity { get; set; }
        public decimal Temp_Min { get; set; }
        public decimal Temp_Max { get; set; }
    }

    public class Coordinates
    {
        public decimal Lon { get; set; }

        public decimal Lat { get; set; }
    }

    public class System
    {
        public string Country { get; set; }
    }

    public class Wind
    {
        public decimal Speed { get; set; }
        public string Deg { get; set; }
    }
}
