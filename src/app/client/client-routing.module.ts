import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {ClientComponent} from './client.component';
import {AddClientComponent} from './components/add-client/add-client.component';
import {ClientResolver} from './resolvers/client.resolver';
import {ClientProfileComponent} from './components/client-profile/client-profile.component';


const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'client/:id', component: ClientProfileComponent, resolve: {client: ClientResolver} },
  { path: 'add-client', component: AddClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
