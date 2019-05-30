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
  list : ClientBranch[];

  constructor(private http:HttpClient) { 
    this.url = Global.url;
  }

  saveClientBranch(){
    
    // let params = JSON.stringify(formData);
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // return this.http.post(this.url + 'ClientBranches', params /*Datos a guardar en BackEnd*/, {headers: headers});
    // return this.http.post(this.url + 'ClientBranches', formData);
    return this.http.post(this.url + '/ClientBranches', this.formData);
  }

  updateClientBranch():Observable<any>{
    // let params = JSON.stringify(clientBranch);
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // return this.http.put(this.url + "clientBranches/" + clientBranch.ClientBranchId, params, {headers:headers});
    return this.http.put(this.url + '/ClientBranches/'+ this.formData.ClientBranchID, this.formData);
  }

  deleteClientBranch(id) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url + '/ClientBranches/'+ id, {headers:headers});
  }

  getClientBranches(): Observable<any> {
    debugger;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.get(this.url + "/ClientBranches");
  }

  getClientBranch(id): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this.http.get(this.url + "/ClientBranches/" + id, {headers:headers});
  }

  refreshList(){
    
    this.http.get(this.url + '/ClientBranches')
    .toPromise()
    .then(res => this.list = res as ClientBranch[]);
  }
}
