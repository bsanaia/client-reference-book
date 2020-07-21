import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';

import * as ClientActions from './client.actions';
import {exhaustMap, map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ConfigService} from '../../services/global-proxy-service.service';
import {Router} from '@angular/router';
import {ClientModel} from '../models/client.model';

@Injectable()
export class ClientEffects {
  @Effect({dispatch: false})
  addClient$ = this.actions$.pipe(
    ofType(ClientActions.ADD_CLIENT_START),
    exhaustMap((clientData: ClientActions.AddClientStart) => {
      return this.http.post(`${this.configService.config.baseUrl}/clients`, clientData.payload);
    })
  );

  @Effect()
  fetchClients$ = this.actions$.pipe(
    ofType(ClientActions.GET_CLIENTS),
    exhaustMap(() => {
      return this.http.get(`${this.configService.config.baseUrl}/clients`).pipe(
        map((clients: ClientModel[]) => {
          return new ClientActions.SetClients(clients);
        })
      );
    })
  );

  @Effect({dispatch: false})
  deleteClient$ = this.actions$.pipe(
    ofType(ClientActions.DELETE_CLIENT),
    switchMap((data: any) => {
      return this.http.delete(`${this.configService.config.baseUrl}/clients/${data.payload}`);
    })
  );

  @Effect({dispatch: false})
  updateClient$ = this.actions$.pipe(
    ofType(ClientActions.UPDATE_CLIENT),
    switchMap((data: any) => {
      return this.http.put(`${this.configService.config.baseUrl}/clients/${data.payload.id}`, data.payload.payload);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<any>,
    private configService: ConfigService
  ) {}
}

