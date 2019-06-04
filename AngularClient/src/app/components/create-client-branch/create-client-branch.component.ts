import { Component, OnInit } from '@angular/core';
import { ClientBranchService } from 'src/app/services/client-branch.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Weather } from 'src/app/models/weather.model';
import { ToastrService } from 'ngx-toastr';
import { WeatherService } from 'src/app/services/weather.service.js';
import { ClientBranch } from 'src/app/models/client-branch.model.js';
import {HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-create-client-branch',
  templateUrl: './create-client-branch.component.html',
  styles: [],
  providers: [ClientBranchService, WeatherService]
})

export class CreateClientBranchComponent implements OnInit {
  public clientBranch: ClientBranch;
  public weather: Weather;
  public fileToUpload: File = null;
  public _service: ClientBranchService;
  public defaultImageValue: string =  '/assets/img/default-image.png';
  public loading: boolean;
  constructor(public service: ClientBranchService,
              private weatherService: WeatherService,
              private toastr: ToastrService,
              private _router : Router) { 

      this._service = service;
    }

  ngOnInit() {
    this.resetForm();
    this.loadAutoCompleteOptions('searchCountry', "../../../../assets/js/countries.json");
    this.loadAutoCompleteOptions('searchCity', "../../../../assets/js/cities.min.json");
    
  }

  handleFileInput(file: FileList){
    
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      
      this._service.formData.Image = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);

  }

  resetForm(form?:NgForm){
    if(form != null)
      form.resetForm();

    this._service.formData = {
      Id: 0,
      Name: '',
      Description: '',
      Address: '',
      Image: this.defaultImageValue,
      City: '',
      Country: '',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      Weather: null
    }
  }
  
  onSubmit(form){
    this.loading = true;
    if(this._service.formData.Image == this.defaultImageValue)
      this._service.formData.Image = null;

    this._service.saveClientBranch().subscribe(
      res => {
        this.loading = false;
        // this.resetForm(form);
        this._router.navigate(['/branches']);
        this.toastr.success('Creación exitosa', 'Sucursal registrada');
      },
      (error) => {
        debugger;
        this.loading = false;
        this.toastr.error(error);
      }
    )
    
  }

  loadAutoCompleteOptions(controlId, JSONPath){
    var options = {
      url: JSONPath,
    
      getValue: "name",
    
      list: {
        match: {
          enabled: true
        },
        maxNumberOfElements: 6,
    
        showAnimation: {
          type: "slide",
          time: 300
        },
        hideAnimation: {
          type: "slide",
          time: 300
        }
      },
    
      theme: "round"
    
    };
    $("#" + controlId).easyAutocomplete(options);
  }

  isValidCountry(formData:NgForm){
    
    var countryValue = $('#searchCountry').val().toUpperCase();
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", '../../../../assets/js/countries.json', false);
    xhReq.send(null);
    
    var CountriesJSON = JSON.parse(xhReq.responseText);
    // var CountriesJSON = JSON.stringify(jsonObject);
    for (var index = 0; index < CountriesJSON.length; ++index) {
      var animal = CountriesJSON[index];

      if(animal.name.toUpperCase() == countryValue){
        //if value matched with some json value
        formData.form.controls['Country'].setErrors(null);
        break;
      }
    }

    if(formData.form.controls['Country'] !== undefined){
      formData.form.controls['Country'].setErrors({'incorrect': true});
    }
  }

  // getWeatherByCity(city:string){
  //   this.weatherService.getWeatherByCity(city).subscribe(  
  //     response => {
       
  //       this.weather = response;
  //     },
  //     error => {
        
  //       console.log(<any>error);
  //     }
  // )
  // }
  
}
