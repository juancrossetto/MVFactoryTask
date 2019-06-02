import { Component, OnInit } from '@angular/core';
import { ClientBranchService } from 'src/app/services/client-branch.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Weather } from 'src/app/models/weather.model';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import CitiesJSON from '../../../assets/js/cities.min.json';
import CountriesJSON from '../../../assets/js/countries.json';
import { WeatherService } from 'src/app/services/weather.service.js';
import { UploadService } from '../../services/upload.service';
import { ClientBranch } from 'src/app/models/client-branch.model.js';
import { Global } from 'src/app/services/global.js';

declare var $: any;

@Component({
  selector: 'app-create-client-branch',
  templateUrl: './create-client-branch.component.html',
  styles: [],
  providers: [ClientBranchService, WeatherService, UploadService]
})

export class CreateClientBranchComponent implements OnInit {
  public clientBranch: ClientBranch;
  public weather: Weather;
  public filesToUpload: Array<File>;
  public fileToUpload: File = null;
  public save_ClientBranch;
  public status:string;
  public _service: ClientBranchService;
  public imageUrl: string = "assets/img/default-image.png";

  constructor(public service: ClientBranchService,
              private weatherService: WeatherService,
              private toastr: ToastrService,
              private _uploadService: UploadService) { 

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
      debugger;
      // this._service.formData.Image = event.target.result;
      this.imageUrl = event.target.result;
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
      Image: '/assets/img/default-image.png',
      City: '',
      Country: '',
      // Latitude: null,
      // Longitude: null,
      // Altitude: null,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      Weather: new Weather()
    }
  }

  // onSubmit(form: NgForm) {
  //   if (this.service.formData.Id == 0)
  //     this.insertRecord(form);
  //   else
  //     this.updateRecord(form);
  // }

  // insertRecord(form:NgForm){
  //   form.value.Id = 0;
  //   form.value.CreatedAt = new Date();
  //   form.value.UpdatedAt = new Date();
  //   form.value.Weather = new Weather();
    
  //   this.service.saveClientBranch().subscribe(
  //     res => {
        
  //       this.resetForm(form);
  //       this.toastr.success('Submit Successfully', 'Client Branch Register');
  //       this.service.refreshList();
  //     },
  //     err => {
        
  //       console.log(err);
  //     }
  //   )
  // }

  // updateRecord(form: NgForm) {
  //   this.service.updateClientBranch().subscribe(
  //     res => {
  //       this.resetForm(form);
  //       this.toastr.info('Submitted successfully', 'Client Branch Register');
  //       this.service.refreshList();
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }
  
  onSubmit(form){
    
    this.service.formData.Image = this.imageUrl;

    
    this.service.saveClientBranch().subscribe(
      res => {
        
        this.resetForm(form);
        this.toastr.success('Submit Successfully', 'Client Branch Register');
        this.service.refreshList();
      },
      err => {
        
        console.log(err);
      }
    )
    // //Guardar datos basicos
    // this._service.saveClientBranch().subscribe(
    //   response => {
    //     if(response){ 
    //       //Subir la imagen..
    //       debugger;
    //       if(this.filesToUpload){
    //         this._uploadService.makeFileRequest(Global.url + "/upload-image/" +
    //         response.id, [], this.filesToUpload, 'image')
    //         .then((result:any) => {
              
    //           this.save_ClientBranch = result.project;
    //           this.status = "success";
    //           this.toastr.success('Submit Successfully', 'Client Branch Register');
    //           form.reset();
    //         });
    //       } else {
    //         this.save_ClientBranch = response;
    //           this.status = "success";
    //           form.reset();
    //       }
    //     }
    //     else{
    //       this.status = "failed";
    //     }
    //   },
    //   error => {
    //     console.log(<any>error);
    //   }
    // )
  }

  // fileChangeEvent(fileInput:any){
  //   debugger;
  //   // this.filesToUpload = <Array<File>>fileInput.target.files; //Castie el fileInput
  //   this.filesToUpload = fileInput.target.files; 
  // }

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
       debugger;
        this.weather = response;
      },
      error => {
        debugger;
        console.log(<any>error);
      }
  )
  }
  
}
