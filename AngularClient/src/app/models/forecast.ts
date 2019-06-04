export class Forecast {
  constructor(public cityName:string,
              public description:string,
              public temp:string,
              public date:string,
              public img:string,
              public humidity:string,
              public pressure: string,
              public temp_min: string,
              public temp_max: string){}
}
