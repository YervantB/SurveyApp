import {combineReducers} from 'redux';
import authReducer from './authReducer';

export default combinedReducers({
    auth: authReducer
});
