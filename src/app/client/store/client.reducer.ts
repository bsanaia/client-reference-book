import * as ClientActions from './client.actions';
import {act} from '@ngrx/effects';


const State = {
  clients: [],
};

export function clientReducer(state = State, action: ClientActions.ClientActions) {
  console.log(action);
  switch (action.type) {
    case ClientActions.ADD_CLIENT_START:
      return {
        ...state
      };
    case ClientActions.ADD_CLIENT_SUCCESS:
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };
    case ClientActions.SET_CLIENTS:
      return {
        ...state,
        clients: [...action.payload]
      };
    default: {
      return {...state};
    }
  }
}
