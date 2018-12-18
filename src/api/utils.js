import axios from 'axios';
import Base64 from '../utils/base64';

const requestUtil = axios.create({
  method: 'post',
  transformRequest: [(data) => {
    return Object.keys(data || {}).map((k, index, d) => {
      return k ? `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}${index + 1 === d.length ? '' : '&'}`.trim() : '';
    }).join('');
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});

const loginAjax = (userCode, userPass) => {
  return requestUtil.post(`/Account/Login`, {
    logintype: 'PowerEncode',
    language: encodeURIComponent(Base64.rc4('zh-CN')),
    usercode: encodeURIComponent(Base64.rc4(userCode)),
    userpass: encodeURIComponent(Base64.rc4(userPass || ``)),
    verifycode: encodeURIComponent(Base64.rc4(JSON.stringify({Id: ``, Code: ``})))
  }).then(res => res.data);
};

export {
  requestUtil,
  loginAjax
}