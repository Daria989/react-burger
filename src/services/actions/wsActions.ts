import { TMessage } from '../../utils/types';
import { PayloadAction } from '@reduxjs/toolkit';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR:'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED:'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE:'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE:'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export type StartAction = {
    type: typeof WS_CONNECTION_START
    // payload: string
}

export type SuccessAction = {
    type: typeof WS_CONNECTION_SUCCESS
}

export type ErrorAction = {
    type: typeof WS_CONNECTION_ERROR
    payload: PayloadAction
}

export type ClosedAction = {
    type: typeof WS_CONNECTION_CLOSED
}

export type GetAction = {
    type: typeof WS_GET_MESSAGE
    payload: TMessage
}

export type SendAction = {
    type: typeof WS_SEND_MESSAGE
}

export const wsActions = {
	wsInit: WS_CONNECTION_START,
	wsSendMessage: WS_SEND_MESSAGE,
	onOpen: WS_CONNECTION_SUCCESS,
	onClose: WS_CONNECTION_CLOSED,
	onError: WS_CONNECTION_ERROR,
	onMessage: WS_GET_MESSAGE
};

export type TWSAction =
    | StartAction
    | SuccessAction
    | ErrorAction
    | ClosedAction
    | GetAction
    | SendAction;

export type TWSActionNames = {
    [key in TWSAction['type']] : key
}