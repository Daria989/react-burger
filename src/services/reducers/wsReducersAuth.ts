import { TWSState } from '../../utils/types';

import {
  TWSActionAuth,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH
} from '../actions/wsActionsAuth';

const initialState: TWSState = {
  wsConnected: false,
  messages: null,
  error: null
};

export const wsReducerAuth = (state = initialState, action: TWSActionAuth):TWSState  => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_AUTH:
      return {
        ...state,
        error: null,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR_AUTH:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED_AUTH:
      return {
        messages: null,
        error: null,
        wsConnected: false
      };

    case WS_GET_MESSAGE_AUTH:
      return {
        ...state,
        error: null,
        messages: action.payload
      };
    default:
      return state
  }
};