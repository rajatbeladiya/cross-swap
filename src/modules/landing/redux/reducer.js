import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  loading: false,
  poolInfo: {},
};


export default (state = INITIAL_STATE, action) => { // eslint-disable-line
  switch (action.type) {
    case actionTypes.GET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.GET_POOL_INFO_LOADING:
      return {
        ...state,
        loading: true,
        poolInfo: action.payload,
      };
    case actionTypes.GET_POOL_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        poolInfo: action.payload,
      };
    case actionTypes.GET_POOL_INFO_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
