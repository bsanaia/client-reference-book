import {NgModule} from '@angular/core';
import {ClientComponent} from './client.component';
import {AddClientComponent} from './components/add-client/add-client.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ClientRoutingModule} from './client-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {SharedModule} from '../shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';

@NgModule({
  declarations: [
    ClientComponent,
    AddClientComponent,
    ClientProfileComponent,
  ],
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    ClientRoutingModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  entryComponents: [
  ]
})
export class ClientModule { }
