import { combineReducers } from 'redux';

import userPassword from './user-password.reducer';

const rootReducer = combineReducers({
    userPassword,
});

export default rootReducer;
