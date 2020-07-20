import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PaginatorComponent} from './paginator/paginator.component';
import {HeaderComponent} from './header/header.component';
import {SharedComponent} from './shared.component';
import { PhotoUploaderComponent } from './photo-uploader/photo-uploader.component';

@NgModule({
  declarations: [
    PaginatorComponent,
    SharedComponent,
    HeaderComponent,
    PhotoUploaderComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  exports: [
    MatPaginatorModule,
    CommonModule,
    ReactiveFormsModule,
    PaginatorComponent,
    MatCheckboxModule,
    PhotoUploaderComponent,
    HeaderComponent
  ],
  providers: []
})
export class SharedModule { }
