import { Component, OnInit } from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {ClientFormBuilderService} from '../../forms/client-form-builder.service';
import * as ClientActions from '../../store/client.actions';
import {Store} from '@ngrx/store';
import {slideInAnimation} from '../../animations/client-animations';
import * as alertify from 'alertifyjs';
import {withLatestFrom} from 'rxjs/operators';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
  animations: [slideInAnimation]
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;
  photoName = '';
  sameAsRegisteredAddress = false;
  clients = [];
  accountNums = [];
  isUniqueNumber = true;

  constructor(private clientService: ClientService,
              private clientFormBuilder: ClientFormBuilderService,
              private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ClientActions.GetClients());
    this.store.select('client').subscribe((res: any) => {
      this.clients = res.clients;
      this.clients.forEach(client => {
        client.account.forEach(acc => {
          this.accountNums.push(acc.accountNumber);
        });
      });
    });
    this.clientForm = this.clientFormBuilder.buildForm();
    this.clientForm.get('idNumber').valueChanges.subscribe(() => {
    });
  }

  onPhotoUploaded(imgInfo) {
    this.clientForm.get('photo').setValue(imgInfo.base64Img);
    this.photoName = imgInfo.name;
  }

  addClient() {
    if (this.clientForm.invalid) {
      alertify.error('Form is not valid');
      return;
    }

    this.clientForm.value.account.forEach(acc => {
      if (this.accountNums.includes(acc.accountNumber)) {
        alertify.error('Account number already exists');
        this.isUniqueNumber = false;
        return;
      }
    });

    if (this.sameAsRegisteredAddress) {
      this.markActualSameAsRegisteredAddress();
    }
    if (this.isUniqueNumber) {
      this.store.dispatch(new ClientActions.AddClientStart(this.clientForm.value));
      alertify.success('Client Added');
    } else {
      this.isUniqueNumber = true;
    }
  }

  actualAddressCheckboxClicked(event: MatCheckboxChange) {
    this.sameAsRegisteredAddress = event.checked;
    if (event.checked) {
      this.markActualSameAsRegisteredAddress();
    } else {
      this.clearActualAddressValues();
    }
  }

  markActualSameAsRegisteredAddress() {
    const registeredAddrCountry = this.clientForm.get('registeredAddress').get('country').value;
    const registeredAddrCity = this.clientForm.get('registeredAddress').get('city').value;
    const registeredAddrAddress = this.clientForm.get('registeredAddress').get('address').value;

    const actualAddressCountry = this.clientForm.get('actualAddress').get('country');
    const actualAddressCity = this.clientForm.get('actualAddress').get('city');
    const actualAddressAddress = this.clientForm.get('actualAddress').get('address');

    actualAddressCountry.setValue(registeredAddrCountry);
    actualAddressCity.setValue(registeredAddrCity);
    actualAddressAddress.setValue(registeredAddrAddress);
    document.getElementById('actualAddress').style.opacity = '0.4';
  }

  addAccount() {
    this.clientFormBuilder.addAccounts();
  }

  removeAccount(index) {
    (this.clientForm.get('account') as FormArray).removeAt(index);
  }

  clearActualAddressValues() {
    this.clientForm.get('actualAddress').reset();
    document.getElementById('actualAddress').style.opacity = '1';
  }

}
