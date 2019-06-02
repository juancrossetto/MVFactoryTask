import { Component, OnInit } from '@angular/core';
import { ClientBranchService } from 'src/app/services/client-branch.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Weather } from 'src/app/models/weather.model';
import { ToastrService } from 'ngx-toastr';
// import * as $ from 'jquery';
// import CitiesJSON from '../../../../assets/js/cities.min.json';
// import CountriesJSON from '../../../../assets/js/countries.json';
import { WeatherService } from 'src/app/services/weather.service.js';
import { ClientBranch } from 'src/app/models/client-branch.model.js';
import { Global } from 'src/app/services/global.js';

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
  public filesToUpload: Array<File>;
  public fileToUpload: File = null;
  public save_ClientBranch;
  public status:string;
  public _service: ClientBranchService;

  constructor(public service: ClientBranchService,
              private weatherService: WeatherService,
              private toastr: ToastrService) { 

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
      Image: '/assets/img/default-image.png',
      City: '',
      Country: '',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      Weather: new Weather()
    }
  }
  
  onSubmit(form){

    this._service.saveClientBranch().subscribe(
      res => {
        
        this.resetForm(form);
        this.toastr.success('Submit Successfully', 'Client Branch Register');
        this._service.refreshList();
      },
      err => {
        
        console.log(err);
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

  getWeatherByCity(city:string){
    this.weatherService.getWeatherByCity(city).subscribe(  
      response => {
       
        this.weather = response;
      },
      error => {
        
        console.log(<any>error);
      }
  )
  }
  
}
