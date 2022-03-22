import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  loading: false,
  swapLoading: false,
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
        swapLoading: true,
        poolInfo: action.payload,
      };
    case actionTypes.GET_POOL_INFO_SUCCESS:
      return {
        ...state,
        swapLoading: false,
        poolInfo: action.payload,
      };
    case actionTypes.GET_POOL_INFO_ERROR:
      return {
        ...state,
        swapLoading: false,
        error: true,
      };
    default:
      return state;
  }
};
