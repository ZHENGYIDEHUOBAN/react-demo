import axios from 'axios';
import { loginAjax, requestUtil } from './utils';
import Base64 from '../utils/base64';

const getUser = () => {
  return axios.get('/api/getUser').then(res => res.data);
};

const login = (userCode, userPass) => {
  return loginAjax(userCode, userPass);
};

const loadData = (params) => {
  const postParams = {
    KeyWord: params.KeyWord,
    KeyWordType: params.KeyWordType || 'BO',
    sort: params.sort || '',
    select: params.select || '',
    index: params.index || '0',
    size: params.size || '0',
    swhere: Base64.encode(params.swhere || ' 1=1 '),
    extparams: `eyJlbmNvZGVzd2hlcmUiOiJ0cnVlIn0=`
  };
  return requestUtil.post(`/Form/GridPageLoad`, postParams)
  .then(res => res.data.data);
}

export {
  getUser,
  login,
  loadData
}