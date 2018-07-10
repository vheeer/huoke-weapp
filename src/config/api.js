// const ApiRootUrl = 'http://127.0.0.1:8360/api/';
const ApiRootUrl = 'https://www.yinmudianying.club/huoke-dev/api/';
const mch = "huipu";
const title = "平安惠普";
module.exports = {
  title,
  AuthLoginByWeixin: ApiRootUrl + 'auth/loginByWeixin?mch=' + mch, //微信登录
  UserMes: ApiRootUrl + 'user/add1?mch=' + mch, //微信登录
};