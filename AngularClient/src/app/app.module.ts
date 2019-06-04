/*Modules*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";


/*Services*/
import { Routing, AppRoutingProviders } from './app.routing';
import { ClientBranchService } from './services/client-branch.service';
import { UploadService } from './services/upload.service';
import { ResolveLocationService } from './services/resolve-location.service';
import { WeatherService } from './services/weather.service';

/*Components*/
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { AboutComponent } from './components/about/about.component';
import { CreateClientBranchComponent } from './components/create-client-branch/create-client-branch.component';
import { DetailClientBranchComponent } from './components/detail-client-branch/detail-client-branch.component';
import { EditClientBranchComponent } from './components/edit-client-branch/edit-client-branch.component';
import { ClientBranchComponent } from './components/client-branch/client-branch.component';
import { ClientBranchesListComponent } from './components/client-branches-list/client-branches-list.component';
import { ForecastComponent } from './components/forecast/forecast.component';


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
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Routing,
    ToastrModule.forRoot(),
    
    
  ],
  providers: [ ClientBranchService,
    WeatherService,
    UploadService,
    AppRoutingProviders,
    ResolveLocationService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
