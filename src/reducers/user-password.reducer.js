import { userConstants } from '../constants';

export default function userPassword(state, action) {
    if (state === undefined) {
        return {
            password: '',
        };
    }
    switch (action.type) {
    case userConstants.SAVE_PASSWORD:
        return {
            password: action.payload,
        };

    default:
        return state;
    }
}
