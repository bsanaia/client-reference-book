import { ActionReducerMap } from '@ngrx/store';

import * as fromClient from '../client/store/client.reducer';

export const appReducer: ActionReducerMap<any> = {
  client: fromClient.clientReducer,
};
