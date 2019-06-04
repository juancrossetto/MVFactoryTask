import { Component, OnInit, Input } from '@angular/core';
import { ClientBranchService } from 'src/app/services/client-branch.service';
import { Global } from '../../services/global';
import { ClientBranch } from 'src/app/models/client-branch.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
              private toastr: ToastrService) {
    this.url = Global.url;
   }

  ngOnInit() {
    //this.getClientBranches();

    this._route.params.subscribe(params => {
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
          if(response.Image == null){
            response.Image =  "/assets/img/noImage.png";
          }
          else if(!response.Image.includes('data:image')){
            response.Image = 'data:image/jpeg;base64,' + response.Image;
          }
          
          if(response.Description.length > 30)
            response.Description = response.Description.substring(0,26) + "...";
          this.clientBranch = response;
        },
        error => {
          console.log(<any>error);
          this.toastr.error(error);
        }
    )
  }

}
