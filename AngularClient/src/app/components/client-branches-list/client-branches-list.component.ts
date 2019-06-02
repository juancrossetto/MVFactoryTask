import { Component, OnInit } from '@angular/core';
import { ClientBranch } from '../../models/client-branch.model';
import { ClientBranchService } from '../../services/client-branch.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-client-branches-list',
  templateUrl: './client-branches-list.component.html',
  styles: [],
  providers: [ClientBranchService]
})
export class ClientBranchesListComponent implements OnInit {
  public clientBranches: ClientBranch[];
  public url: string;

    constructor(
    private _clientBranchService: ClientBranchService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.url = Global.url;
  }

  ngOnInit() {
    // this._route.params.subscribe(params => {
    //   let id = params.id;
    //   this.getClientBranches();
    // })
    this.getClientBranches();
  }

  getClientBranches() {
    this._clientBranchService.getClientBranches().subscribe(
      response => {
        if(response){
          
          this.clientBranches = response;
        };
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
