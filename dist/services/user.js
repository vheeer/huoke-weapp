'use strict';

/**
 * 用户相关服务
 */

var util = require('../utils/util.js');
var api = require('../config/api.js');

/**
 * 调用微信登录
 */
function loginByWeixin() {
  var app = getApp();
  var code = null;
  return new Promise(function (resolve, reject) {
    return util.login().then(function (res) {
      code = res.code;
      return util.getUserInfo();
    }).then(function (userInfo) {
      //登录远程服务器
      util.request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(function (res) {
        if (res.errno === 0) {
          //存储用户信息
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('openid', res.data.openid);
          wx.setStorageSync('token', res.data.token);
          //信息放到全局
          // app.globalData.openid = res.data.openid;
          // app.globalData.userInfo = res.data.userInfo;
          // app.globalData.token = res.data.token;
          resolve(res);
        } else {
          reject(res);
        }
      }).catch(function (err) {
        reject(err);
      });
    }).catch(function (err) {
      reject(err);
    });
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {

      util.checkSession().then(function () {
        resolve(true);
      }).catch(function () {
        reject(false);
      });
    } else {
      reject(false);
    }
  });
}

module.exports = {
  loginByWeixin: loginByWeixin,
  checkLogin: checkLogin
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsidXRpbCIsInJlcXVpcmUiLCJhcGkiLCJsb2dpbkJ5V2VpeGluIiwiYXBwIiwiZ2V0QXBwIiwiY29kZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibG9naW4iLCJ0aGVuIiwicmVzIiwiZ2V0VXNlckluZm8iLCJ1c2VySW5mbyIsInJlcXVlc3QiLCJBdXRoTG9naW5CeVdlaXhpbiIsImVycm5vIiwid3giLCJzZXRTdG9yYWdlU3luYyIsImRhdGEiLCJvcGVuaWQiLCJ0b2tlbiIsImNhdGNoIiwiZXJyIiwiY2hlY2tMb2dpbiIsImdldFN0b3JhZ2VTeW5jIiwiY2hlY2tTZXNzaW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUlBLElBQU1BLE9BQU9DLFFBQVEsa0JBQVIsQ0FBYjtBQUNBLElBQU1DLE1BQU1ELFFBQVEsa0JBQVIsQ0FBWjs7QUFHQTs7O0FBR0EsU0FBU0UsYUFBVCxHQUF5QjtBQUN2QixNQUFNQyxNQUFNQyxRQUFaO0FBQ0EsTUFBSUMsT0FBTyxJQUFYO0FBQ0EsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDNUMsV0FBT1QsS0FBS1UsS0FBTCxHQUFhQyxJQUFiLENBQWtCLFVBQUNDLEdBQUQsRUFBUztBQUNoQ04sYUFBT00sSUFBSU4sSUFBWDtBQUNBLGFBQU9OLEtBQUthLFdBQUwsRUFBUDtBQUNELEtBSE0sRUFHSkYsSUFISSxDQUdDLFVBQUNHLFFBQUQsRUFBYztBQUNwQjtBQUNBZCxXQUFLZSxPQUFMLENBQWFiLElBQUljLGlCQUFqQixFQUFvQyxFQUFFVixNQUFNQSxJQUFSLEVBQWNRLFVBQVVBLFFBQXhCLEVBQXBDLEVBQXdFLE1BQXhFLEVBQWdGSCxJQUFoRixDQUFxRixlQUFPO0FBQzFGLFlBQUlDLElBQUlLLEtBQUosS0FBYyxDQUFsQixFQUFxQjtBQUNuQjtBQUNBQyxhQUFHQyxjQUFILENBQWtCLFVBQWxCLEVBQThCUCxJQUFJUSxJQUFKLENBQVNOLFFBQXZDO0FBQ0FJLGFBQUdDLGNBQUgsQ0FBa0IsUUFBbEIsRUFBNEJQLElBQUlRLElBQUosQ0FBU0MsTUFBckM7QUFDQUgsYUFBR0MsY0FBSCxDQUFrQixPQUFsQixFQUEyQlAsSUFBSVEsSUFBSixDQUFTRSxLQUFwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FkLGtCQUFRSSxHQUFSO0FBQ0QsU0FWRCxNQVVPO0FBQ0xILGlCQUFPRyxHQUFQO0FBQ0Q7QUFDRixPQWRELEVBY0dXLEtBZEgsQ0FjUyxVQUFDQyxHQUFELEVBQVM7QUFDaEJmLGVBQU9lLEdBQVA7QUFDRCxPQWhCRDtBQWlCRCxLQXRCTSxFQXNCSkQsS0F0QkksQ0FzQkUsVUFBQ0MsR0FBRCxFQUFTO0FBQ2hCZixhQUFPZSxHQUFQO0FBQ0QsS0F4Qk0sQ0FBUDtBQXlCRCxHQTFCTSxDQUFQO0FBMkJEOztBQUVEOzs7QUFHQSxTQUFTQyxVQUFULEdBQXNCO0FBQ3BCLFNBQU8sSUFBSWxCLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUM1QyxRQUFJUyxHQUFHUSxjQUFILENBQWtCLFVBQWxCLEtBQWlDUixHQUFHUSxjQUFILENBQWtCLE9BQWxCLENBQXJDLEVBQWlFOztBQUUvRDFCLFdBQUsyQixZQUFMLEdBQW9CaEIsSUFBcEIsQ0FBeUIsWUFBTTtBQUM3QkgsZ0JBQVEsSUFBUjtBQUNELE9BRkQsRUFFR2UsS0FGSCxDQUVTLFlBQU07QUFDYmQsZUFBTyxLQUFQO0FBQ0QsT0FKRDtBQU1ELEtBUkQsTUFRTztBQUNMQSxhQUFPLEtBQVA7QUFDRDtBQUNGLEdBWk0sQ0FBUDtBQWFEOztBQUdEbUIsT0FBT0MsT0FBUCxHQUFpQjtBQUNmMUIsOEJBRGU7QUFFZnNCO0FBRmUsQ0FBakIiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDnlKjmiLfnm7jlhbPmnI3liqFcclxuICovXHJcblxyXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi4vdXRpbHMvdXRpbC5qcycpO1xyXG5jb25zdCBhcGkgPSByZXF1aXJlKCcuLi9jb25maWcvYXBpLmpzJyk7XHJcblxyXG5cclxuLyoqXHJcbiAqIOiwg+eUqOW+ruS/oeeZu+W9lVxyXG4gKi9cclxuZnVuY3Rpb24gbG9naW5CeVdlaXhpbigpIHtcclxuICBjb25zdCBhcHAgPSBnZXRBcHAoKTtcclxuICBsZXQgY29kZSA9IG51bGw7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgIHJldHVybiB1dGlsLmxvZ2luKCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgIGNvZGUgPSByZXMuY29kZTtcclxuICAgICAgcmV0dXJuIHV0aWwuZ2V0VXNlckluZm8oKTtcclxuICAgIH0pLnRoZW4oKHVzZXJJbmZvKSA9PiB7XHJcbiAgICAgIC8v55m75b2V6L+c56iL5pyN5Yqh5ZmoXHJcbiAgICAgIHV0aWwucmVxdWVzdChhcGkuQXV0aExvZ2luQnlXZWl4aW4sIHsgY29kZTogY29kZSwgdXNlckluZm86IHVzZXJJbmZvIH0sICdQT1NUJykudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuZXJybm8gPT09IDApIHtcclxuICAgICAgICAgIC8v5a2Y5YKo55So5oi35L+h5oGvXHJcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCByZXMuZGF0YS51c2VySW5mbyk7XHJcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnb3BlbmlkJywgcmVzLmRhdGEub3BlbmlkKTtcclxuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHJlcy5kYXRhLnRva2VuKTtcclxuICAgICAgICAgIC8v5L+h5oGv5pS+5Yiw5YWo5bGAXHJcbiAgICAgICAgICAvLyBhcHAuZ2xvYmFsRGF0YS5vcGVuaWQgPSByZXMuZGF0YS5vcGVuaWQ7XHJcbiAgICAgICAgICAvLyBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy5kYXRhLnVzZXJJbmZvO1xyXG4gICAgICAgICAgLy8gYXBwLmdsb2JhbERhdGEudG9rZW4gPSByZXMuZGF0YS50b2tlbjtcclxuICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICByZWplY3QoZXJyKTtcclxuICAgIH0pXHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDliKTmlq3nlKjmiLfmmK/lkKbnmbvlvZVcclxuICovXHJcbmZ1bmN0aW9uIGNoZWNrTG9naW4oKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgIGlmICh3eC5nZXRTdG9yYWdlU3luYygndXNlckluZm8nKSAmJiB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKSkge1xyXG5cclxuICAgICAgdXRpbC5jaGVja1Nlc3Npb24oKS50aGVuKCgpID0+IHtcclxuICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGxvZ2luQnlXZWl4aW4sXHJcbiAgY2hlY2tMb2dpbixcclxufTsiXX0=