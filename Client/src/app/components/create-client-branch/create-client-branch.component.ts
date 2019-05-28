import { Component, OnInit } from '@angular/core';
import { ClientBranchService } from 'src/app/services/client-branch.service';
import { NgForm } from '@angular/forms';
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
  }

  resetForm(form?:NgForm){
    if(form != null)
      form.resetForm();

    this.service.formData = {
      ClientBranchID: 0,
      ClientBranchName: '',
      City: '',
      Country: '',
      Latitude: 0,
      Longitude: 0,
      Altitude: 0,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      Weather: new Weather()
    }
  }

  onSubmit(form:NgForm){
    debugger;
    form.value.ClientBranchID = 0;
    form.value.CreatedAt = new Date();
    form.value.UpdatedAt = new Date();
    form.value.Weather = new Weather();
    this.service.saveClientBranch(form.value).subscribe(
      res => {
        debugger;
        this.resetForm(form);
        this.toastr.success('Submit Successfully', 'Client Branch Register');
      },
      err => {
        debugger;
        console.log(err);
      }
    )
  }

}
