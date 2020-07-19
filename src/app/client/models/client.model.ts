export class ClientModel {
  id: number;
  name: string;
  lastName: string;
  gender: string;
  idNumber: string;
  mobile: string;
  photo: string;
  registeredAddress: {
    country: string;
    city: string;
    address: string;
  };
  actualAddress: {
    country: string;
    city: string;
    address: string;
  };

  constructor() {
  }
}
