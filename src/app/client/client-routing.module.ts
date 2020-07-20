import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {ClientComponent} from './client.component';
import {AddClientComponent} from './components/add-client/add-client.component';


const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'client/:id', component: ClientComponent },
  { path: 'add-client', component: AddClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
