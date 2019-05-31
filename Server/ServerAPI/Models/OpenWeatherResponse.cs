using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerAPI.Models
{
    public class OpenWeatherResponse
    {
        public string Name { get; set; }

        public string Cod { get; set; }

        public string Id { get; set; }
        public string Visibility { get; set; }

        public IEnumerable<WeatherDescription> Weather { get; set; }

        public Main Main { get; set; }

        public Coordinates Coord { get; set; }

        public Wind Wind { get; set; }

        public System Sys { get; set; }
    }

    public class WeatherDescription
    {
        public string Main { get; set; }
        public string Description { get; set; }
    }

    public class Main
    {
        public string Temp { get; set; }
        public string Pressure { get; set; }
        public string Humidity { get; set; }
        public string Temp_Min { get; set; }
        public string Temp_Max { get; set; }
    }

    public class Coordinates
    {
        public string Lon { get; set; }

        public string Lat { get; set; }
    }

    public class System
    {
        public string Country { get; set; }
    }

    public class Wind
    {
        public string Speed { get; set; }
        public string Deg { get; set; }
    }
}
