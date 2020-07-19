import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientComponent} from './client.component';
import {AddClientComponent} from './add-client/add-client.component';


const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'client/:id', component: ClientComponent },
  { path: 'add-client', component: AddClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ClientRoutingModule {}
