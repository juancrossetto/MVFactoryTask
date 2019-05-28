using System;

namespace ServerAPI.Models
{
    
    public class ClientBranch
    {
        /// <summary>
        /// Identificador de la sucursal
        /// </summary>
        public int ClientBranchID { get; set; }

        /// <summary>
        /// Nombre de la Sucursal
        /// </summary>
        public string ClientBranchName { get; set; }

        /// <summary>
        /// Latitud
        /// </summary>
        public decimal Latitude { get; set; }

        /// <summary>
        /// Longitud
        /// </summary>
        public decimal Longitude { get; set; }

        /// <summary>
        /// Altitud
        /// </summary>
        public decimal Altitude { get; set; }

        /// <summary>
        /// El Tiempo de la sucursal
        /// </summary>
        public Weather Weather { get; set; }

        #region Audit Fields

        /// <summary>
        /// Fecha Creación
        /// </summary>
        public DateTime CreatedAt { get; set; }


        /// <summary>
        /// Fecha Actualización
        /// </summary>
        public DateTime UpdatedAt { get; set; }
        #endregion
    }
}
