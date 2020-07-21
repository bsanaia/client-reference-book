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
      name: formData.name,
      lastName: formData.lastName,
      mobile: formData.mobile,
      idNumber: formData.idNumber,
      registeredAddress: formData.registeredAddress,
      actualAddress: formData.actualAddress,
      gender: formData.gender,
      photo: formData.photo,
      account: formData.account
    };
    return this.http.post(`${this.baseUrl}/clients`, data);
  }

  getClients() {
    return this.http.get(`${this.baseUrl}/clients`);
  }

  getClientWithId(id) {
    return this.http.get(`${this.baseUrl}/clients/${id}`);
  }

  deleteClient(id) {
    return this.http.delete(`${this.baseUrl}/clients/${id}`);
  }
}

