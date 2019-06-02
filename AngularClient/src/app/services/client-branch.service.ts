import { Injectable } from '@angular/core';
import { ClientBranch } from '../models/client-branch.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from './global';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClientBranchService {
  formData:ClientBranch
  public url: string;
  public list : ClientBranch[];
  public controllerName: string;
  constructor(private http:HttpClient) { 
    this.url = Global.url;
    this.controllerName = Global.ControllerNameClientBranch;
  }

  saveClientBranch():Observable<any>{
    
    return this.http.post(this.url + '/ClientBranches', this.formData);
  }

  updateClientBranch():Observable<any>{

    return this.http.put(this.url + '/' + this.controllerName +'/'+ this.formData.Id, this.formData);
  }

  deleteClientBranch(id) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url + '/' + this.controllerName +'/'+ id, {headers:headers});
  }

  getClientBranches(): Observable<any> {

    return this.http.get(this.url + "/" + this.controllerName);
  }

  getClientBranch(id): Observable<any>{

      return this.http.get(this.url + '/' + this.controllerName +'/' + id);
  }

  refreshList(){
    
    this.http.get(this.url + '/ClientBranches')
    .toPromise()
    .then(res => this.list = res as ClientBranch[]);
  }
}
