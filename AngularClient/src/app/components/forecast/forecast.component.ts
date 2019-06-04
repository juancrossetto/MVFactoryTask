import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { Forecast } from '../../models/forecast';

@Component({
  selector: 'wp-forecast',
  templateUrl: './forecast.component.html'
})
export class ForecastComponent implements OnInit {
  cityName: string = "www";
  constructor(private weatherSer:WeatherService,
              private _route: ActivatedRoute,
              private _router : Router) { }

  forecastForm:FormGroup;
  forecast:Forecast[]=[];

  ngOnInit() {

    this._route.params.subscribe(params => {
      
      let cityName = params.cityName;
      this.cityName = cityName;
      this.loadData(cityName);
    });

    this.forecastForm = new FormGroup({
      forecastCity: new FormControl('')
    });
  }

  loadData(cityName:string){
    this.forecast.splice(0, this.forecast.length);
    this.weatherSer.otherForecast(cityName).subscribe(
      (data) =>{
        for(let i=0; i<data.list.length;i= i+8){
          
          const forecastWeather = new Forecast(data.city.name,
                                                data.list[i].weather[0].description,
                                                data.list[i].main.temp,
                                                data.list[i].dt_txt,
                                                data.list[i].weather[0].icon,
                                                data.list[i].main.humidity,
                                                data.list[i].main.pressure,
                                                data.list[i].main.temp_min,
                                                data.list[i].main.temp_max);
         
          this.forecast.push(forecastWeather);
        }
        return this.forecast;
      }
    )
  }
}
