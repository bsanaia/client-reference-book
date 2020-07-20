import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {AccountComponent} from './account.component';


@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [],
  entryComponents: [
  ]
})
export class ClientModule { }
