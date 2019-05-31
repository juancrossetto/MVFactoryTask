import { Component, OnInit, Input } from '@angular/core';
import { ClientBranchService } from 'src/app/services/client-branch.service';
import { Global } from '../../services/global';
import { ClientBranch } from 'src/app/models/client-branch.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {DomSanitizationService} from '@angular/platform-browser';

@Component({
  selector: 'client-branch',
  templateUrl: './client-branch.component.html',
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
              private _route: ActivatedRoute,
              private _DomSanitizationService: DomSanitizationService) {
    this.url = Global.url;
   }

  ngOnInit() {
    //this.getClientBranches();

    this._route.params.subscribe(params => {
      
      console.log(params);
      let id = params.id;
      
      if(this.idBranch){
        id = this.idBranch;
      }
      this.getClientBranch(id);
    })
  }

  getClientBranch(id){
    this._clientBranchService.getClientBranch(id).subscribe(  //Subscribe recibe 2 funciones de callback por param.
        response => {
         
          this.clientBranch = response;
        },
        error => {
          console.log(<any>error);
        }
    )
  }

}
