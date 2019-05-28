import { Component, OnInit } from '@angular/core';
import { ClientBranch } from '../../models/client-branch.model';
import { ClientBranchService } from '../../services/client-branch.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail-client-branch',
  templateUrl: './detail-client-branch.component.html',
  styles: [],
  providers: [ClientBranchService]
})

export class DetailClientBranchComponent implements OnInit {
  public url: string;
  public clientBranch: ClientBranch;
  public confirm: boolean;

  constructor(
    private _clientBranchService: ClientBranchService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.confirm = false;
   }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getClientBranch(id);
    })
  }

  getClientBranch(id){
    this._clientBranchService.getClientBranch(id).subscribe(  //Subscribe recibe 2 funciones de callback por param.
        response => {
          this.clientBranch = response.clientBranch;
        },
        error => {
          console.log(<any>error);
        }
    )
  }

  deleteClientBranch(id){
    this._clientBranchService.deleteClientBranch(id).subscribe(
      response => {
        this._router.navigate(['branches']); //Si borra bien redigirimos a la vista sucursales
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  setConfirm(confirm){
    this.confirm = confirm;
  }
  
}
