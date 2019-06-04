import { Component, OnInit } from '@angular/core';
import { ClientBranch } from '../../models/client-branch.model';
import { ClientBranchService } from '../../services/client-branch.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-client-branches-list',
  templateUrl: './client-branches-list.component.html',
  styles: [],
  providers: [ClientBranchService]
})


export class ClientBranchesListComponent implements OnInit {
  public clientBranches: ClientBranch[];
  public url: string;
  public allClientBranches: ClientBranch[];
  public loading: boolean;
    constructor(
    private _clientBranchService: ClientBranchService,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService
  ) { 
    this.url = Global.url;
    this.loading = true;
  }

  ngOnInit() {
    this.getClientBranches();
  }

  getClientBranches() {
    this._clientBranchService.getClientBranches().subscribe(
      response => {
        if(response){
          this.allClientBranches = response;
          this.clientBranches = response;
          this.loading = false;
        };
      },
      error => {
        console.log(<any>error);
        this.toastr.error(error);
        this.loading = false;
      }
    )
  }

  getClientBranchesByName(name: string){
    
    if(name == null || name == '' || name === 'undefined'){
      this.clientBranches =  this.allClientBranches;
    } else
    {
      this.clientBranches = this.allClientBranches.filter(branch => branch.Name.toUpperCase().includes(name.toUpperCase()));
    }
    // this._clientBranchService.getClientBranchesByName(name).subscribe( 
    //     response => {

    //       this.clientBranches = response;
    //     },
    //     error => {
          
    //       console.log(<any>error);
    //     }
    // )
  }

}
