/*Modules*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
// import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';

/*Services*/
import { Routing, AppRoutingProviders } from './app.routing';
import { ClientBranchService } from './services/client-branch.service';
import { WeatherService } from './services/weather.service';
import { UploadService } from './services/upload.service';

/*Components*/
import { ErrorComponent } from './components/error/error.component';
import { AboutComponent } from './components/about/about.component';
import { CreateClientBranchComponent } from './components/create-client-branch/create-client-branch.component';
import { DetailClientBranchComponent } from './components/detail-client-branch/detail-client-branch.component';
import { EditClientBranchComponent } from './components/edit-client-branch/edit-client-branch.component';
import { ClientBranchComponent } from './components/client-branch/client-branch.component';
import { ClientBranchesListComponent } from './components/client-branches-list/client-branches-list.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    AboutComponent,
    CreateClientBranchComponent,
    DetailClientBranchComponent,
    EditClientBranchComponent,
    ClientBranchComponent,
    ClientBranchesListComponent,
    UploadImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Routing
    // MDBBootstrapModule.forRoot()
  ],
  // schemas: [ 
  //   NO_ERRORS_SCHEMA 
  // ],
  providers: [
    ClientBranchService,
    WeatherService,
    UploadService,
    AppRoutingProviders],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
