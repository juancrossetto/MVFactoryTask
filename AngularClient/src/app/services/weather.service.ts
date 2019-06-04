import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { Weather } from './../models/weather.model';

const GEOLOCATION_ERRORS = {
	'errors.location.unsupportedBrowser': 'Browser does not support location services',
	'errors.location.permissionDenied': 'You have rejected access to your location',
	'errors.location.positionUnavailable': 'Unable to determine your location',
	'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable()
export class WeatherService {
  private weather:Weather[] = [] ;
  weatherClass:Weather;
  location;
  
  constructor(private http:HttpClient) { }

  currentLocation() : Observable<any> {
    //create promise to resolve later
    //
    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.location = pos.coords;
          const lat = this.location.latitude;
          const lon = this.location.longitude;
          console.log(`lat ${lat} and lon ${lon}`);
          return this.http.get(`http://api.openweathermap.org/data/2.5/weather?appid=0f3fb9fa31ad3d41f1bb2bd0841c3f2f&lat=${lat}&lon=${lon}&units=imperial`);
        });
      }
			else {
				observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
			}
    })
  }

  otherForecast(city:string) : Observable<any>{
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=0f3fb9fa31ad3d41f1bb2bd0841c3f2f&units=imperial`);
  }

}
