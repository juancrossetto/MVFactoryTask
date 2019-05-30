import { Component, OnInit, Input } from '@angular/core';
import { ClientBranchService } from 'src/app/services/client-branch.service';
import { Global } from '../../services/global';
import { ClientBranch } from 'src/app/models/client-branch.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'client-branch',
  templateUrl: './client-branch.component.html',
  styles: [],
  providers: [ ClientBranchService ]
})
export class ClientBranchComponent implements OnInit {
  @Input() idBranch: number;
  public clientBranch: ClientBranch;
  public url: string;
  public confirm: boolean;
  public images:string[];

  constructor(private _clientBranchService: ClientBranchService,
              private _router: Router,
              private _route: ActivatedRoute) {
    this.url = Global.url;
   }

  ngOnInit() {
    //this.getClientBranches();
    this._route.params.subscribe(params => {
      let id = params.id;
      debugger;
      if(this.idBranch){
        id = this.idBranch;
      }
      this.getClientBranch(id);
    })
  }

  getClientBranch(id){
    this._clientBranchService.getClientBranch(id).subscribe(  //Subscribe recibe 2 funciones de callback por param.
        response => {
          debugger;
          this.clientBranch = response.ClientBranch;
        },
        error => {
          console.log(<any>error);
        }
    )
  }

}