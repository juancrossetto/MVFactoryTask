import { Component, OnInit } from '@angular/core';
import { ClientBranch } from '../../models/client-branch.model';
import { ClientBranchService } from '../../services/client-branch.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-edit-client-branch',
  templateUrl: '../create-client-branch/create-client-branch.component.html',
  styles: [],
  providers: [ClientBranchService, UploadService]
})
export class EditClientBranchComponent implements OnInit {
  public title:string;
  public clientBranch: ClientBranch;
  public status:string;
  public filesToUpload: Array<File>;
  public save_clientBranch;
  public url: string;
  public _service: ClientBranchService;
  public fileToUpload: File = null;
  public imageUrl: string = "assets/img/imagesBranches/default-image.png";

  constructor(public service: ClientBranchService,
              public _uploadService: UploadService,
              private _route: ActivatedRoute,
              private _router : Router) {
    this.title = "Edit Client Branch";
    this.url = Global.url;
    this._service = service;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getClientBranch(id);
    })
  }

  getClientBranch(id){
    this._service.getClientBranch(id).subscribe(  //Subscribe recibe 2 funciones de callback por param.
        response => {
          this.clientBranch = response.clientBranch;
        },
        error => {
          console.log(<any>error);
        }
    );
  }

  //onSubmit(){
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
    //}

    onSubmit(){
      this._service.updateClientBranch().subscribe(
        response => {
          
          if(response.project){ 
            //Subir la imagen..
            if(this.filesToUpload){
                this._uploadService.makeFileRequest(Global.url + "upload-image/" +
                response.project._id, [], this.filesToUpload, 'image')
              .then((result:any) => {
                
                this.save_clientBranch = result;
                this.status = "success";
              });
            } else{
              this.save_clientBranch = response;
              this.status = "success";
            }
          }
          else{
            this.status = "failed";
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }

    handleFileInput(file: FileList){
    
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      // this._service.formData.Image = event.target.result;
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);

  }

}
