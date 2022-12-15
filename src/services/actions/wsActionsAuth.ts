import { PayloadAction } from '@reduxjs/toolkit';
import { TMessage } from '../../utils/types';

export const WS_CONNECTION_START_AUTH: 'WS_CONNECTION_START_AUTH' = 'WS_CONNECTION_START_AUTH';
export const WS_CONNECTION_SUCCESS_AUTH: 'WS_CONNECTION_SUCCESS_AUTH' = 'WS_CONNECTION_SUCCESS_AUTH';
export const WS_CONNECTION_ERROR_AUTH:'WS_CONNECTION_ERROR_AUTH' = 'WS_CONNECTION_ERROR_AUTH';
export const WS_CONNECTION_CLOSED_AUTH:'WS_CONNECTION_CLOSED_AUTH' = 'WS_CONNECTION_CLOSED_AUTH';
export const WS_GET_MESSAGE_AUTH:'WS_GET_MESSAGE_AUTH' = 'WS_GET_MESSAGE_AUTH';
export const WS_SEND_MESSAGE_AUTH:'WS_SEND_MESSAGE_AUTH' = 'WS_SEND_MESSAGE_AUTH';

export type StartActionAuth = {
    type: typeof WS_CONNECTION_START_AUTH
    // payload: string
}

export type SuccessActionAuth = {
    type: typeof WS_CONNECTION_SUCCESS_AUTH
}

export type ErrorActionAuth = {
    type: typeof WS_CONNECTION_ERROR_AUTH
    payload: PayloadAction
}

export type ClosedActionAuth = {
    type: typeof WS_CONNECTION_CLOSED_AUTH
}

export type GetActionAuth = {
    type: typeof WS_GET_MESSAGE_AUTH
    payload: TMessage
}

export type SendActionAuth = {
    type: typeof WS_SEND_MESSAGE_AUTH
}

export const wsActionsAuth = {
	wsInit: WS_CONNECTION_START_AUTH,
	wsSendMessage: WS_SEND_MESSAGE_AUTH,
	onOpen: WS_CONNECTION_SUCCESS_AUTH,
	onClose: WS_CONNECTION_CLOSED_AUTH,
	onError: WS_CONNECTION_ERROR_AUTH,
	onMessage: WS_GET_MESSAGE_AUTH
};

export type TWSActionAuth =
    | StartActionAuth
    | SuccessActionAuth
    | ErrorActionAuth
    | ClosedActionAuth
    | GetActionAuth
    | SendActionAuth;

export type TWSActionNamesAuth = {
    [key in TWSActionAuth['type']] : key
}