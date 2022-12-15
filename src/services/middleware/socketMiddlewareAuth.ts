import type { Middleware, MiddlewareAPI, AnyAction } from 'redux';
import type { AppDispatch, RootState } from '../../utils/types';
import { TWSActionNamesAuth } from '../actions/wsActionsAuth';
import { getCookie } from '../cookie'

export const socketMiddlewareAuth = (wsUrl: string, wsActions: TWSActionNamesAuth): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: AnyAction) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const token = getCookie('token');
 
      if (type === wsActions.WS_CONNECTION_START_AUTH) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: wsActions.WS_CONNECTION_SUCCESS_AUTH, payload: event });
        };
        socket.onerror = (event: any) => {
          dispatch({ type: wsActions.WS_CONNECTION_ERROR_AUTH, payload: event });
        };
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: wsActions.WS_GET_MESSAGE_AUTH, payload: parsedData });
        };
        socket.onclose = event => {
          dispatch({ type: wsActions.WS_CONNECTION_CLOSED_AUTH, payload: event });
        };
        if (type === wsActions.WS_SEND_MESSAGE_AUTH) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    }) as Middleware;
}; 