// export class Weather {

//         // Identificador del Tiempo
//         Id:number;

//         // Código del Tiempo
//         Code:number;

//         // Ciudad
//         Country:string;

//         // Tempartura Minima
//         Temperature:string;

//         // Tempartura Minima
//         Temp_Min:string;

//         // Tempartura Maxima
//         Temp_Max:string;

//         // Humedad
//         Humidity:string;

//         // Nubes
//         Clouds:string;

//         // Presión
//         Pressure:string;

//         // Dirección del Viento
//         WindDirection:string;

//         // Dirección del Viento
//         WindSpeed:number;

//         //Latitud
//         Latitude:string;

//         //Longitud
//         Longitude:string;
// }

export class Weather {
        constructor(public cityName:string,
                    public temp:string,
                    public type:string,
                    public tempMin:string,
                    public tempMax:string,
                    public img:string){}
      }
      