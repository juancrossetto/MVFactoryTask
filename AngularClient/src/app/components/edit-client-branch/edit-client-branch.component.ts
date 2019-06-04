import { Component, OnInit } from '@angular/core';
import { ClientBranch } from '../../models/client-branch.model';
import { ClientBranchService } from '../../services/client-branch.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormsModule } from '@angular/forms';
import { Weather } from 'src/app/models/weather.model';
declare var $: any;

@Component({
  selector: 'app-edit-client-branch',
  templateUrl: '../create-client-branch/create-client-branch.component.html',
  styles: [],
  providers: [ClientBranchService]
})
export class EditClientBranchComponent implements OnInit {
  public title:string;
  public status:string;
  public filesToUpload: Array<File>;
  public save_clientBranch;
  public url: string;
  public _service: ClientBranchService;
  public fileToUpload: File = null;

  constructor(public service: ClientBranchService,
              private _route: ActivatedRoute,
              private toastr: ToastrService,
              private _router : Router) {
    this.title = "Edit Client Branch";
    this.url = Global.url;
    this._service = service;
  }

  ngOnInit() {

    this.resetForm();
    this.loadAutoCompleteOptions('searchCountry', "../../../../assets/js/countries.json");
    this.loadAutoCompleteOptions('searchCity', "../../../../assets/js/cities.min.json");
    
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getClientBranch(id);
    });
  }

  getClientBranch(id){
    this._service.getClientBranch(id).subscribe(  //Subscribe recibe 2 funciones de callback por param.
        response => {
          if(!response.Image)
            response.Image = "assets/img/default-image.png";
          else
            response.Image = 'data:image/jpeg;base64,' + response.Image;

          this._service.formData = response;
        },
        error => {
          console.log(<any>error);
        }
    );
  }
  onSubmit(form:NgForm){
    this._service.updateClientBranch().subscribe(
      res => {
        debugger;
        this.toastr.success('Submit Successfully', 'Client Branch Register');
        this._router.navigate(['/branches']);
      },
      err => {
        
        console.log(err);
      }
    );
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
      Weather: null
    }
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

}
