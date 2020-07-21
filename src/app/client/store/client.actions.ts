import {Action} from '@ngrx/store';
import {ClientModel} from '../models/client.model';

export const ADD_CLIENT_START = '[Client] Add Client Start';
export const ADD_CLIENT_SUCCESS = '[Client] Add Client Success';
export const UPDATE_CLIENT = '[Client] Update Client';
export const DELETE_CLIENT = '[Client] Delete Client';
export const SET_CLIENTS = '[Client] Set Clients';
export const GET_CLIENT = '[Client] Get Clients';
export const GET_CLIENTS = '[Client] Get Clients';


export class AddClientSuccess implements Action {
  readonly type = ADD_CLIENT_SUCCESS;

  constructor(
    public payload: ClientModel[]
  ) {}
}

export class AddClientStart implements Action {
  readonly type = ADD_CLIENT_START;

  constructor(public payload: ClientModel) {
  }
}

export class UpdateClient implements Action {
  readonly type = UPDATE_CLIENT;

  constructor(public payload: any) {
  }
}

export class DeleteClient implements Action {
  readonly type = DELETE_CLIENT;

  constructor(public payload: number) {
  }
}

export class SetClients implements Action {
  readonly type = SET_CLIENTS;

  constructor(public payload: ClientModel[]) {
  }
}

export class GetClients implements Action {
  readonly type = GET_CLIENTS;

  constructor() {
  }
}

export class GetClient implements Action {
  readonly type = GET_CLIENT;

  constructor(public payload: number) {
  }
}


export type ClientActions =
  | AddClientStart
  | AddClientSuccess
  | UpdateClient
  | DeleteClient
  | SetClients
  | GetClients
  | GetClient;
