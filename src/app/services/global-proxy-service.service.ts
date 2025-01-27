import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: {baseUrl: string};

  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http
      .get<{baseUrl: string}>('./assets/config.json')
      .toPromise()
      .then(config => {
        this.config = config;
      });
  }
}
