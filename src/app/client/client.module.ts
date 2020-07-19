import {NgModule} from '@angular/core';
import {ClientComponent} from './client.component';
import {AddClientComponent} from './add-client/add-client.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ClientRoutingModule} from './client-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {SharedModule} from '../shared/shared.module';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    ClientComponent,
    AddClientComponent,
  ],
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    ClientRoutingModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule
  ],
  providers: []
})
export class ClientModule { }
