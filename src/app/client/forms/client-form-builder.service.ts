import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidateLanguageChars} from '../validators/lang-character.validator';
import {OnlyNumberValidator} from '../validators/only-number.validator';
import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class ClientFormBuilderService {
  constructor() {
  }

  buildForm() {
    return new FormGroup({
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
      mobile: new FormControl('5', [Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        OnlyNumberValidator
      ]),
      photo: new FormControl('', [Validators.required]),
      registeredAddress: new FormGroup({
        country: new FormControl(''),
        city: new FormControl(''),
        address: new FormControl('')
      }),
      actualAddress: new FormGroup({
        country: new FormControl(''),
        city: new FormControl(''),
        address: new FormControl('')
      }),
    });

  }
}

