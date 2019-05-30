import { Component, OnInit } from '@angular/core';
import { ClientBranchService } from 'src/app/services/client-branch.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Weather } from 'src/app/models/weather.model';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import CitiesJSON from '../../../assets/js/cities.min.json';
import CountriesJSON from '../../../assets/js/countries.json';

declare var $: any;

@Component({
  selector: 'app-create-client-branch',
  templateUrl: './create-client-branch.component.html',
  styles: []
})

export class CreateClientBranchComponent implements OnInit {
   
  constructor(private service: ClientBranchService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.loadAutoCompleteOptions('searchCountry', "../../../../assets/js/countries.json");
    this.loadAutoCompleteOptions('searchCity', "../../../../assets/js/cities.min.json");
    // this.loadCountriesOptions();
    // this.loadCitiesOptions();
  }

  resetForm(form?:NgForm){
    if(form != null)
      form.resetForm();

    this.service.formData = {
      ClientBranchID: 0,
      ClientBranchName: '',
      City: '',
      Country: '',
      Latitude: null,
      Longitude: null,
      Altitude: null,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      Weather: new Weather()
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.ClientBranchID == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form:NgForm){
    form.value.ClientBranchID = 0;
    form.value.CreatedAt = new Date();
    form.value.UpdatedAt = new Date();
    form.value.Weather = new Weather();
    
    this.service.saveClientBranch().subscribe(
      res => {
        debugger;
        this.resetForm(form);
        this.toastr.success('Submit Successfully', 'Client Branch Register');
        this.service.refreshList();
      },
      err => {
        debugger;
        console.log(err);
      }
    )
  }

  updateRecord(form: NgForm) {
    this.service.updateClientBranch().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Client Branch Register');
        this.service.refreshList();
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
