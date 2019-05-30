import { Component, OnInit } from '@angular/core';
import { ClientBranchService } from 'src/app/services/client-branch.service';
import { NgForm, FormsModule } from '@angular/forms';
import { Weather } from 'src/app/models/weather.model';
import { ToastrService } from 'ngx-toastr';

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
    this.intellisenseCountries();
    this.intellisenseCities();
    
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
    debugger;
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

  intellisenseCountries(){
    const search = document.getElementById('searchCountry');
    const matchList = document.getElementById('match-list-countries');
    const searchStates = async searchText => {
      const res = await fetch('../../../assets/js/countries.json');
      const states = await res.json();

      //Get matches to current text input
      let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.code.match(regex);
      });
      if(searchText.length === 0){
        matches = [];
        matchList.innerHTML = '';
      }

      outputHtml(matches);
    };

    //Show results in HTML 
    const outputHtml = matches => {
      if(matches.length > 0){
        const html = matches.map(match => `
          <div class="card card-body mb-1">
            <h5> ${match.name}: <span class="text-primary">${match.code}</span></h5>
          </div>
        `).join('');

        matchList.innerHTML = html;
      }
    }

    search.addEventListener('input', () => searchStates(search.value));
  }

  intellisenseCities(){
    const search = document.getElementById('searchCity');
    const matchList = document.getElementById('match-list-cities');
    const searchStates = async searchText => {
      const res = await fetch('../../../assets/js/cities.min.json');
      const states = await res.json();

      //Get matches to current text input
      let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex);
      });
      if(searchText.length === 0){
        matches = [];
        matchList.innerHTML = '';
      }

      outputHtml(matches);
    };

    //Show results in HTML 
    const outputHtml = matches => {
      if(matches.length > 0){
        const html = matches.map(match => `
          <div class="card card-body mb-1">
            <h5> ${match.country}: <span class="text-primary">${match.name}</span></h5>
          </div>
        `).join('');

        matchList.innerHTML = html;
      }
    }

    search.addEventListener('input', () => searchStates(search.value));
  }
  
}
