import { Weather } from './weather.model';

export class ClientBranch {

    // Identificador de la sucursal
    Id: number;

    // Nombre de la Sucursal
    Name:string;

    //Descripcion de la sucursal
    Description:string;

    //Dirección de la sucursal
    Address:string;

    // Nombre de la Ciudad
    City: string;

    // Nombre del pais
    Country: string;

    // // Latitud
    // Latitude: number;

    // // Longitud
    // Longitude: number;

    // // Altitud
    // Altitude: number;

    //Imagen
    Image: string;

    
    // Fecha Creación
    CreatedAt:Date;

    // Fecha Actualización
    UpdatedAt:Date;
    
    // El Tiempo de la sucursal
    Weather:Weather;
}
