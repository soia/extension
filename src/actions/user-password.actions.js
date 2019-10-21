/* eslint-disable */

import { userConstants } from '../constants';

function savePassword(payload) {
    return {
        type: userConstants.SAVE_PASSWORD,
        payload,
    };
}

export const userPasswordActions = {
    savePassword,
};
