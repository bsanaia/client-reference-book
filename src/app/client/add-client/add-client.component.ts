import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ClientService} from '../services/client.service';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {ClientFormBuilderService} from '../forms/client-form-builder.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;
  photoName = '';
  sameAsRegisteredAddress = false;

  constructor(private clientService: ClientService, private clientFormBuilder: ClientFormBuilderService) {
  }

  ngOnInit(): void {
    this.clientForm = this.clientFormBuilder.buildForm();
    this.clientForm.get('idNumber').valueChanges.subscribe(() => {
      console.log(this.clientForm.get('idNumber'));
    });
  }

  onPhotoUploaded(imgInfo) {
    this.clientForm.get('photo').setValue(imgInfo.base64Img);
    this.photoName = imgInfo.name;
  }

  addClient() {
    if (this.clientForm) {
      this.markActualSameAsRegisteredAddress();
    }
    console.log(this.clientForm.value);
    // this.clientService.addClient(this.clientForm.value).subscribe();
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
    actualAddressCountry.disable();
    actualAddressCity.disable();
    actualAddressAddress.disable();
    document.getElementById('actualAddress').style.opacity = '0.7';
  }

  clearActualAddressValues() {
    const actualAddressCountry = this.clientForm.get('actualAddress').get('country');
    const actualAddressCity = this.clientForm.get('actualAddress').get('city');
    const actualAddressAddress = this.clientForm.get('actualAddress').get('address');

    actualAddressCountry.setValue('');
    actualAddressCity.setValue('');
    actualAddressAddress.setValue('');
    actualAddressCountry.enable();
    actualAddressCity.enable();
    actualAddressAddress.enable();
    document.getElementById('actualAddress').style.opacity = '1';
  }

}
