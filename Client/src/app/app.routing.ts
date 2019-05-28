import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientBranchesComponent } from './components/client-branches/client-branches.component';
import { ErrorComponent } from './components/error/error.component';
import { AboutComponent } from './components/about/about.component';
import { CreateClientBranchComponent } from './components/create-client-branch/create-client-branch.component';
import { DetailClientBranchComponent } from './components/detail-client-branch/detail-client-branch.component';
import { EditClientBranchComponent } from './components/edit-client-branch/edit-client-branch.component';

const appRoutes: Routes = [
     {path: '', component: AboutComponent},
     {path: 'branches', component: ClientBranchesComponent},
     {path: 'create-branch', component: CreateClientBranchComponent},
     {path: 'branch/:id', component: DetailClientBranchComponent},
     {path: 'edit-branch/:id', component: EditClientBranchComponent},
     {path: '**', component: ErrorComponent} /*En caso de error o 404 */
]

export const AppRoutingProviders: any[] = [];
export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); /*Carga nuestras rutas 
en el modulo de Angular*/