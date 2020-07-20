import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientModel} from '../models/client.model';
import {ConfigService} from '../../services/global-proxy-service.service';

@Injectable({providedIn: 'root'})
export class ClientService {
  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  baseUrl = this.configService.config.baseUrl;

  addClient(formData: ClientModel) {
    const data = {
      Name: formData.name,
      LastName: formData.lastName,
      Mobile: formData.mobile,
      IDNumber: formData.idNumber,
      registeredAddress: formData.registeredAddress,
      actualAddress: formData.actualAddress,
      Gender: formData.gender,
      photo: formData.photo,
      accounts: formData.account
    };
    console.log(this.configService.config);
    return this.http.post(`${this.baseUrl}/clients`, data);
  }

  getClients() {
    console.log(this.configService.config);
    return this.http.get(`${this.baseUrl}/clients`);
  }

  getClientWithId(id) {
    return this.http.get(`${this.baseUrl}/client/${id}`);
  }
}

