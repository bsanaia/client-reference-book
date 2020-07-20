import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidateLanguageChars} from '../validators/lang-character.validator';
import {OnlyNumberValidator} from '../validators/only-number.validator';
import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class ClientFormBuilderService {
  clientForm: FormGroup;

  constructor() {
  }

  buildForm() {
    this.clientForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        ValidateLanguageChars,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        ValidateLanguageChars,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      gender: new FormControl(''),
      idNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        OnlyNumberValidator
      ]),
      mobile: new FormControl('5', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        OnlyNumberValidator
      ]),
      photo: new FormControl(''),
      registeredAddress: this.createAddressForm(),
      actualAddress: this.createAddressForm(),
      account: new FormArray([
        new FormGroup({
          accountNumber: new FormControl('', [Validators.required]),
          accountType: new FormControl('', [Validators.required]),
          currency: new FormControl('', [Validators.required]),
          accountStatus: new FormControl('', [Validators.required]),
        })
      ])
    });
    return this.clientForm;
  }

  addAccounts() {
    (this.clientForm.get('account') as FormArray).push(
      new FormGroup({
        accountNumber: new FormControl('', [Validators.required]),
        accountType: new FormControl('', [Validators.required]),
        currency: new FormControl('', [Validators.required]),
        accountStatus: new FormControl('', [Validators.required]),
      })
    );
  }

  createAddressForm() {
    return new FormGroup({
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });
  }
}

