import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({providedIn: 'root'})
export class AccountFormBuilderService {
  accountForm: FormGroup;

  constructor() {
  }

  buildClientForm() {
    this.accountForm = new FormGroup({

    });
  }

}
