using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerAPI.Models
{
    public class Weather
    {
        /// <summary>
        /// Identificador del Tiempo
        /// </summary>
        public int WeatherID { get; set; }

        /// <summary>
        /// Ciudad
        /// </summary>
        public string Country { get; set; }

        /// <summary>
        /// Summary
        /// </summary>
        public string Summary { get; set; }

        /// <summary>
        /// Codigo
        /// </summary>
        public int Code { get; set; }

        /// <summary>
        /// Nombre
        /// </summary>
        public string Name { get; set; }


        /// <summary>
        /// Tempartura
        /// </summary>
        public decimal Temperature { get; set; }

        /// <summary>
        /// Tempartura Minima   
        /// </summary>
        public decimal Temp_Min { get; set; }

        /// <summary>
        /// Tempartura Maxima
        /// </summary>
        public decimal Temp_Max { get; set; }

        /// <summary>
        /// Humedad
        /// </summary>
        public string Humidity { get; set; }

        /// <summary>
        /// Nubes
        /// </summary>
        public string Clouds { get; set; }

        /// <summary>
        /// Presión
        /// </summary>
        public string Pressure { get; set; }

        /// <summary>
        /// Dirección del Viento
        /// </summary>
        public string WindDirection { get; set; }

        /// <summary>
        /// Dirección del Viento
        /// </summary>
        public decimal WindSpeed { get; set; }

        /// <summary>
        /// Latitud
        /// </summary>
        public decimal Latitude { get; set; }

        /// <summary>
        /// Longitud
        /// </summary>
        public decimal Longitude { get; set; }
    }

 }
