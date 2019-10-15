import { combineReducers } from 'redux';

import { sidebar } from './sidebar.reducer';

const rootReducer = combineReducers({
    sidebar
});

export default rootReducer;
