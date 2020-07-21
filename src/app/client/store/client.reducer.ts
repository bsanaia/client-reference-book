import * as ClientActions from './client.actions';


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
    default: {
      return {...state};
    }
  }
}
