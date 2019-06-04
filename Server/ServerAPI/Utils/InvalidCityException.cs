using System;
using System.Runtime.Serialization;

namespace ServerAPI.Utils
{
    /// <summary>
    /// Excepcion ejecutada cuando la ciudad de la sucursal no es válida
    /// </summary>
    public class InvalidCityException : Exception
    {
        /// <summary>
        /// Just create the exception
        /// </summary>
        public InvalidCityException()
          : base()
        {
        }

        /// <summary>
        /// Create the exception with description
        /// </summary>
        /// <param name="message">Exception description</param>
        public InvalidCityException(String message)
          : base(message)
        {
        }

        /// <summary>
        /// Create the exception with description and inner cause
        /// </summary>
        /// <param name="message">Exception description</param>
        /// <param name="innerException">Exception inner cause</param>
        public InvalidCityException(String message, Exception innerException)
          : base(message, innerException)
        {
        }

        /// <summary>
        /// Create the exception from serialized data.
        /// Usual scenario is when exception is occured somewhere on the remote workstation
        /// and we have to re-create/re-throw the exception on the local machine
        /// </summary>
        /// <param name="info">Serialization info</param>
        /// <param name="context">Serialization context</param>
        protected InvalidCityException(SerializationInfo info, StreamingContext context)
          : base(info, context)
        {
        }
    }
}
