import { Injectable } from '@angular/core';
import { ClientBranch } from '../models/client-branch.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from './global';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientBranchService {
  formData:ClientBranch
  public url: string;
  public list : ClientBranch[];
  public controllerName: string;
  public numberRetriesError: number = 1;
  constructor(private http:HttpClient) { 
    this.url = Global.url;
    this.controllerName = Global.ControllerNameClientBranch;
  }

  saveClientBranch():Observable<any>{
    
    return this.http.post(this.url + '/ClientBranches', this.formData)
        .pipe(
          retry(this.numberRetriesError),
          catchError(this.handleError)
        );
  }

  updateClientBranch():Observable<any>{

    return this.http.put(this.url + '/' + this.controllerName +'/'+ this.formData.Id, this.formData)
        .pipe(
          retry(this.numberRetriesError),
          catchError(this.handleError)
        );
  }

  deleteClientBranch(id) : Observable<any>{
    return this.http.delete(this.url + '/' + this.controllerName +'/'+ id)
        .pipe(
          retry(this.numberRetriesError),
          catchError(this.handleError)
        );
  }

  getClientBranches(): Observable<any> {

    return this.http.get(this.url + "/" + this.controllerName)
        .pipe(
          retry(this.numberRetriesError),
          catchError(this.handleError)
        );
  }

  getClientBranch(id): Observable<any>{

      return this.http.get(this.url + '/' + this.controllerName +'/' + id)
          .pipe(
            retry(this.numberRetriesError),
            catchError(this.handleError)
          );
  }

  getClientBranchesByName(name): Observable<any> {
    if(name === 'undefined' || name == null)
      name = '';
    return this.http.get(this.url + "/" + this.controllerName +'/GetClientBranchesByName/?name=' + name)
        .pipe(
          retry(this.numberRetriesError),
          catchError(this.handleError)
        );
  }

  handleError(error) {
    debugger;
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      if(error.status != 0) //Si es 0 no hubo error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
    }
    return throwError(errorMessage);
  }
}

