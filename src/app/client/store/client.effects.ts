import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';

import * as ClientActions from './client.actions';
import {catchError, exhaustMap, map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ConfigService} from '../../services/global-proxy-service.service';
import {Router} from '@angular/router';
import {ClientModel} from '../models/client.model';
import * as alertify from 'alertifyjs';

@Injectable()
export class ClientEffects {
  @Effect({dispatch: false})
  addClient$ = this.actions$.pipe(
    ofType(ClientActions.ADD_CLIENT_START),
    exhaustMap((clientData: ClientActions.AddClientStart) => {
      return this.http.post(`${this.configService.config.baseUrl}/clients`, clientData.payload)
        .pipe(catchError(err => {
          alertify.error(err);
          return err;
        }));
    })
  );

  @Effect()
  fetchClients$ = this.actions$.pipe(
    ofType(ClientActions.GET_CLIENTS),
    exhaustMap(() => {
      return this.http.get(`${this.configService.config.baseUrl}/clients`).pipe(
        map((clients: ClientModel[]) => {
          return new ClientActions.SetClients(clients);
        }),
        catchError(err => {
          alertify.error(err);
          return err;
        })
      );
    })
  );

  @Effect({dispatch: false})
  deleteClient$ = this.actions$.pipe(
    ofType(ClientActions.DELETE_CLIENT),
    switchMap((data: any) => {
      return this.http.delete(`${this.configService.config.baseUrl}/clients/${data.payload}`)
        .pipe(catchError(err => {
          alertify.error(err);
          return err;
        }));
    })
  );

  @Effect({dispatch: false})
  updateClient$ = this.actions$.pipe(
    ofType(ClientActions.UPDATE_CLIENT),
    switchMap((data: any) => {
      return this.http.put(`${this.configService.config.baseUrl}/clients/${data.payload.id}`, data.payload.payload)
        .pipe(catchError(err => {
          alertify.error(err);
          return err;
        }));
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<any>,
    private configService: ConfigService
  ) {
  }
}

