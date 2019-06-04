using System;

namespace ServerAPI.Models
{
    
    public class ClientBranch
    {
        /// <summary>
        /// Identificador de la sucursal
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre de la Sucursal
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Descripcion breve de la Sucursal
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Dirección
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// Nombre de la Ciudad
        /// </summary>
        public string City { get; set; }
        
        /// <summary>
        /// Nombre del pais
        /// </summary>
        public string Country { get; set; }


        /// <summary>
        /// Path de la imagen
        /// </summary>
        public string Image { get; set; }

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
