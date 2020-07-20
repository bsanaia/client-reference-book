import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ClientModel} from '../models/client.model';
import {ClientService} from '../services/client.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ClientResolver implements Resolve<any> {
  constructor(private clientService: ClientService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | ClientModel {
    return this.clientService.getClientWithId(route.paramMap.get('id'));
  }
}
