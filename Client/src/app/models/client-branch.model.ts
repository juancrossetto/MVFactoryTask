import { Weather } from './weather.model';

export class ClientBranch {

    // Identificador de la sucursal
    ClientBranchID: number;

    // Nombre de la Sucursal
    ClientBranchName:string;

    // Nombre de la Ciudad
    City: string;

    // Nombre del pais
    Country: string;

    // Latitud
    Latitude: number;

    // Longitud
    Longitude: number;

    // Altitud
    Altitude: number;

    // Fecha Creación
    CreatedAt:Date;

    // Fecha Actualización
    UpdatedAt:Date;
    
    // El Tiempo de la sucursal
    Weather:Weather;
}
