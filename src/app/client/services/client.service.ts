import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../services/global-proxy-service.service';

@Injectable({providedIn: 'root'})
export class ClientService {
  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  baseUrl = this.configService.config.baseUrl;

  getClientWithId(id) {
    return this.http.get(`${this.baseUrl}/clients/${id}`);
  }

  deleteClient(id) {
    return this.http.delete(`${this.baseUrl}/clients/${id}`);
  }
}

