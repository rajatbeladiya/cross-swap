import * as actionTypes from './actionTypes';

export const openDialog = dialogName => ({
    type: actionTypes.OPEN_DIALOG,
    payload: dialogName,
});

export const closeDialog = dialogName => ({
    type: actionTypes.CLOSE_DIALOG,
    payload: dialogName,
});

export const setWeb3 = details => ({
    type: actionTypes.SET_WEB3,
    payload: details,
});

