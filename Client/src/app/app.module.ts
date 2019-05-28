import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { Routing, AppRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { ClientBranchesComponent } from './components/client-branches/client-branches.component';
import { ErrorComponent } from './components/error/error.component';
import { ClientBranchDetailComponent } from './components/client-branch-detail/client-branch-detail.component';

import { ClientBranchService } from './services/client-branch.service';
import { AboutComponent } from './components/about/about.component';
import { CreateClientBranchComponent } from './components/create-client-branch/create-client-branch.component';
import { DetailClientBranchComponent } from './components/detail-client-branch/detail-client-branch.component';
import { EditClientBranchComponent } from './components/edit-client-branch/edit-client-branch.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientBranchesComponent,
    ErrorComponent,
    ClientBranchDetailComponent,
    AboutComponent,
    CreateClientBranchComponent,
    DetailClientBranchComponent,
    EditClientBranchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Routing
  ],
  providers: [
    ClientBranchService,
    AppRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
