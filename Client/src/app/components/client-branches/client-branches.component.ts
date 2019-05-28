import { Component, OnInit } from '@angular/core';
import { ClientBranchService } from 'src/app/services/client-branch.service';
import { Global } from '../../services/global';
import { ClientBranch } from 'src/app/models/client-branch.model';

@Component({
  selector: 'client-branches',
  templateUrl: './client-branches.component.html',
  styleUrls: ['./client-branches.component.css'],
  providers: [ ClientBranchService ]
})
export class ClientBranchesComponent implements OnInit {
  public clientBranches: ClientBranch[];
  public url: string;

  constructor(private _clientBranchService: ClientBranchService) {
    this.url = Global.url;
   }

  ngOnInit() {
    this.getClientBranches();
  }

  getClientBranches() {
    this._clientBranchService.getClientBranches().subscribe(
      response => {
        if(response.message){
          
          debugger;
          this.clientBranches = response.message;
          console.log(this.clientBranches);
        };
      },
      error => {
        debugger;
        console.log(<any>error);
      }
    )
  }

}
