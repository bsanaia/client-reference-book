import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
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
      let i = 0;
      while (i < userData.client.account.length - 1) {
        (this.clientForm.get('account') as FormArray).push(
          new FormGroup({
            accountNumber: new FormControl('', [Validators.required]),
            accountType: new FormControl('', [Validators.required]),
            currency: new FormControl('', [Validators.required]),
            accountStatus: new FormControl('', [Validators.required]),
        }));
        i++;
      }
      this.clientForm.setValue(userData.client);
    });

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
    (this.clientForm.get('account') as FormArray).at(accountIndex).patchValue({
      accountStatus: status
    });
    const data = {payload: this.clientForm.value, id: this.userId};
    this.store.dispatch(new ClientActions.UpdateClient(data));
  }

}
