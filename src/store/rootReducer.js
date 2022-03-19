import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import dashboardReducer from '../modules/dashboard/redux/reducer';
import landingReducer from '../modules/landing/redux/reducer';

const appReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  dashboard: dashboardReducer,
  landing: landingReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
