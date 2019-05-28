import { Component, OnInit } from '@angular/core';
import { ClientBranch } from '../../models/client-branch.model';
import { ClientBranchService } from '../../services/client-branch.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit-client-branch',
  templateUrl: '../create-client-branch/create-client-branch.component.html',
  styles: [],
  providers: [ClientBranchService]
})
export class EditClientBranchComponent implements OnInit {
  public title:string;
  public clientBranch: ClientBranch;
  public status:string;
  // public filesToUpload: Array<File>;
  public save_clientBranch;
  public url: string;

  constructor(private _clientBranchService: ClientBranchService,
              private _route: ActivatedRoute,
              private _router : Router) {
                this.title = "Edit Client Branch";
                this.url = Global.url;
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
    );
  }

  onSubmit(){
      // this._clientBranchService.updateClientBranch(this.clientBranch).subscribe(
      //   response => {
      //     if(response.clientBranch){ 
      //       if(this.filesToUpload){
      //           this._uploadService.makeFileRequest(Global.url + "upload-image/" +
      //           response.clientBranch._id, [], this.filesToUpload, 'image')
      //         .then((result:any) => {
                
      //           this.save_clientBranch = result.clientBranch;
      //           this.status = "success";
      //         });
      //       } else{
      //         this.save_clientBranch = response.clientBranch;
      //         this.status = "success";
      //       }
      //     }
      //     else{
      //       this.status = "failed";
      //     }
      //   },
      //   error => {
      //     console.log(<any>error);
      //   }
      // );
    }

}
