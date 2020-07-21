import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormGroup} from '@angular/forms';
import {ClientFormBuilderService} from '../../forms/client-form-builder.service';
import {slideInAnimation} from '../../animations/client-animations';
import * as alertify from 'alertifyjs';
import {Store} from '@ngrx/store';
import * as ClientActions from '../../store/client.actions';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css'],
  animations: [slideInAnimation]
})
export class ClientProfileComponent implements OnInit {

  clientForm: FormGroup;
  userId: any;

  constructor(private activatedRoute: ActivatedRoute,
              private clientFormBuilder: ClientFormBuilderService,
              private store: Store<any>) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((userData: any) => {
      this.userId = userData.client.id;
      delete userData.client.id;
      this.clientForm = this.clientFormBuilder.buildForm();
      this.clientForm.setValue(userData.client);
      console.log(this.clientForm);
    });

    // this.store.select('client').subscribe(clientData => {
    //   this.clientForm.setValue(clientData);
    // });
  }

  updateInfo() {
    if (this.clientForm.invalid) {
      alertify.error('Form is not valid');
      return;
    }
    const data = {payload: this.clientForm.value, id: this.userId};
    this.store.dispatch(new ClientActions.UpdateClient(data));
  }

  changeAccountStatus(status, accountIndex) {
    console.log((this.clientForm.get('account') as FormArray).at(accountIndex), status);
    (this.clientForm.get('account') as FormArray).at(accountIndex).patchValue({
      accountStatus: status
    });
    const data = {payload: this.clientForm.value, id: this.userId};
    this.store.dispatch(new ClientActions.UpdateClient(data));
  }

}
