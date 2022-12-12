import type { Middleware, MiddlewareAPI, AnyAction } from 'redux';
import type { AppDispatch, RootState } from '../../utils/types';
import { TWSActionNames } from '../actions/wsActions';

export const socketMiddleware = (wsUrl: string, wsActions: TWSActionNames): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: AnyAction) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
 
      if (type === wsActions.WS_CONNECTION_START) {
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: wsActions.WS_CONNECTION_SUCCESS, payload: event });
        };
        socket.onerror = (event: any) => {
          dispatch({ type: wsActions.WS_CONNECTION_ERROR, payload: event });
        };
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: wsActions.WS_GET_MESSAGE, payload: parsedData });
        };
        socket.onclose = event => {
          dispatch({ type: wsActions.WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === wsActions.WS_SEND_MESSAGE) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    }) as Middleware;
}; 