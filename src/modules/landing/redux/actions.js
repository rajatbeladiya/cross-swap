import * as actionTypes from './actionTypes';
import api from '../../../utils/api';

export const getData = (data) => ({
  type: actionTypes.GET_DATA,
  payload: data,
});

export const getPoolInfo = (data) => ({
  type: actionTypes.GET_POOL_INFO,
  payload: api.get(`api/v1/insta-exit/get-pool-info?tokenAddress=${data.tokenAddress}&fromChainId=${data.fromChainId}&toChainId=${data.toChainId}`)
    .then(res => res.data),
});

