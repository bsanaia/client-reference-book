import {AccountModel} from './account.model';

class ClientAddress {
  country: string;
  city: string;
  address: string;
}

export class ClientModel {
  id: number;
  name: string;
  lastName: string;
  gender: string;
  idNumber: string;
  mobile: string;
  photo: string;
  registeredAddress: ClientAddress;
  actualAddress: ClientAddress;
  account: AccountModel[];

  constructor() {
  }
}
