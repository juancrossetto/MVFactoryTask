import { Injectable } from '@angular/core';
import { Weather } from '../models/weather.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from './global';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  formData:Weather
  public url: string;
  public list : Weather[];
  public controllerName: string;
  constructor(private http:HttpClient) { 
    this.url = Global.url;
    this.controllerName = Global.ControllerNameWeather;
  }

  
  getWeatherByCity(city): Observable<any>{
    return this.http.get(this.url + '/' + this.controllerName + '/GetWeatherByCity/' + city);
  }


}
