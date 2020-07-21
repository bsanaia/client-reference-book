import * as ClientActions from './client.actions';
import * as alertify from 'alertifyjs';


const State = {
  clients: [],
};

export function clientReducer(state = State, action: ClientActions.ClientActions) {
  switch (action.type) {
    case ClientActions.ADD_CLIENT_START:
      return {
        ...state
      };
    case ClientActions.ADD_CLIENT_SUCCESS:
      // console.log('action from adding', action);
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };
    case ClientActions.SET_CLIENTS:
      return {
        ...state,
        clients: [...action.payload]
      };
    case ClientActions.DELETE_CLIENT:
      const clientsFiltered = state.clients.filter(x => x.id !== action.payload);
      return {
        ...state,
        clients: [...clientsFiltered]
      };
    case ClientActions.UPDATE_CLIENT:
      alertify.success('Client Updated');
      const clientCopy = JSON.parse(JSON.stringify(state.clients));
      const idx = clientCopy.findIndex(client => client.id = action.payload.id);
      clientCopy[idx] = action.payload.payload;
      return {
        ...state,
        clients: clientCopy
      };
    default: {
      return {...state};
    }
  }
}
