'use strict';

var api = require('../config/api.js');

function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

/**
 * 封封微信的的request
 */
function request(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "GET";

  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Nideshop-Token': wx.getStorageSync('token')
      },
      success: function success(res) {
        console.log("success");

        if (res.statusCode == 200) {

          if (res.data.errno == 401) {
            //需要登录后才可以操作
            console.log("401 需要登录后才可以操作");
            var code = null;
            return login().then(function (res) {
              code = res.code;
              return getUserInfo();
            }).then(function (userInfo) {
              //登录远程服务器
              request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(function (res) {
                if (res.errno === 0) {
                  //存储用户信息
                  console.log("登陆完，储存信息");
                  wx.setStorageSync('userInfo', res.data.userInfo);
                  wx.setStorageSync('token', res.data.token);

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
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }
      },
      fail: function fail(err) {
        reject(err);
        console.log("failed");
      }
    });
  });
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function success() {
        resolve(true);
      },
      fail: function fail() {
        reject(false);
      }
    });
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function success(res) {
        if (res.code) {
          //登录远程服务器
          console.log(res);
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function fail(err) {
        reject(err);
      }
    });
  });
}

function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function success(res) {
        console.log(res);
        resolve(res);
      },
      fail: function fail(err) {
        reject(err);
      }
    });
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  });
}

module.exports = {
  formatTime: formatTime,
  request: request,
  redirect: redirect,
  showErrorToast: showErrorToast,
  checkSession: checkSession,
  login: login,
  getUserInfo: getUserInfo
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsiYXBpIiwicmVxdWlyZSIsImZvcm1hdFRpbWUiLCJkYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJob3VyIiwiZ2V0SG91cnMiLCJtaW51dGUiLCJnZXRNaW51dGVzIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsIm1hcCIsImZvcm1hdE51bWJlciIsImpvaW4iLCJuIiwidG9TdHJpbmciLCJyZXF1ZXN0IiwidXJsIiwiZGF0YSIsIm1ldGhvZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid3giLCJoZWFkZXIiLCJnZXRTdG9yYWdlU3luYyIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwic3RhdHVzQ29kZSIsImVycm5vIiwiY29kZSIsImxvZ2luIiwidGhlbiIsImdldFVzZXJJbmZvIiwidXNlckluZm8iLCJBdXRoTG9naW5CeVdlaXhpbiIsInNldFN0b3JhZ2VTeW5jIiwidG9rZW4iLCJjYXRjaCIsImVyciIsImVyck1zZyIsImZhaWwiLCJjaGVja1Nlc3Npb24iLCJ3aXRoQ3JlZGVudGlhbHMiLCJyZWRpcmVjdCIsInJlZGlyZWN0VG8iLCJzaG93RXJyb3JUb2FzdCIsIm1zZyIsInNob3dUb2FzdCIsInRpdGxlIiwiaW1hZ2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLE1BQU1DLFFBQVEsa0JBQVIsQ0FBVjs7QUFFQSxTQUFTQyxVQUFULENBQW9CQyxJQUFwQixFQUEwQjtBQUN4QixNQUFJQyxPQUFPRCxLQUFLRSxXQUFMLEVBQVg7QUFDQSxNQUFJQyxRQUFRSCxLQUFLSSxRQUFMLEtBQWtCLENBQTlCO0FBQ0EsTUFBSUMsTUFBTUwsS0FBS00sT0FBTCxFQUFWOztBQUVBLE1BQUlDLE9BQU9QLEtBQUtRLFFBQUwsRUFBWDtBQUNBLE1BQUlDLFNBQVNULEtBQUtVLFVBQUwsRUFBYjtBQUNBLE1B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LENBQWM7QUFDWjlCLFdBQUs7QUFETyxLQUFkO0FBR0EsV0FBTyxLQUFQO0FBQ0QsR0FMRCxNQUtPO0FBQ0xNLE9BQUd3QixVQUFILENBQWM7QUFDWjlCLFdBQUtBO0FBRE8sS0FBZDtBQUdEO0FBQ0Y7O0FBRUQsU0FBUytCLGNBQVQsQ0FBd0JDLEdBQXhCLEVBQTZCO0FBQzNCMUIsS0FBRzJCLFNBQUgsQ0FBYTtBQUNYQyxXQUFPRixHQURJO0FBRVhHLFdBQU87QUFGSSxHQUFiO0FBSUQ7O0FBRURDLE9BQU9DLE9BQVAsR0FBaUI7QUFDZnpELHdCQURlO0FBRWZtQixrQkFGZTtBQUdmOEIsb0JBSGU7QUFJZkUsZ0NBSmU7QUFLZkosNEJBTGU7QUFNZlgsY0FOZTtBQU9mRTtBQVBlLENBQWpCIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBpID0gcmVxdWlyZSgnLi4vY29uZmlnL2FwaS5qcycpO1xyXG5cclxuZnVuY3Rpb24gZm9ybWF0VGltZShkYXRlKSB7XHJcbiAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKClcclxuICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxXHJcbiAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpXHJcblxyXG4gIHZhciBob3VyID0gZGF0ZS5nZXRIb3VycygpXHJcbiAgdmFyIG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpXHJcbiAgdmFyIHNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpXHJcblxyXG5cclxuICByZXR1cm4gW3llYXIsIG1vbnRoLCBkYXldLm1hcChmb3JtYXROdW1iZXIpLmpvaW4oJy0nKSArICcgJyArIFtob3VyLCBtaW51dGUsIHNlY29uZF0ubWFwKGZvcm1hdE51bWJlcikuam9pbignOicpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdE51bWJlcihuKSB7XHJcbiAgbiA9IG4udG9TdHJpbmcoKVxyXG4gIHJldHVybiBuWzFdID8gbiA6ICcwJyArIG5cclxufVxyXG5cclxuLyoqXHJcbiAqIOWwgeWwgeW+ruS/oeeahOeahHJlcXVlc3RcclxuICovXHJcbmZ1bmN0aW9uIHJlcXVlc3QodXJsLCBkYXRhID0ge30sIG1ldGhvZCA9IFwiR0VUXCIpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogdXJsLFxyXG4gICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAnWC1OaWRlc2hvcC1Ub2tlbic6IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXHJcbiAgICAgIH0sXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIik7XHJcblxyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSAyMDApIHtcclxuXHJcbiAgICAgICAgICBpZiAocmVzLmRhdGEuZXJybm8gPT0gNDAxKSB7XHJcbiAgICAgICAgICAgIC8v6ZyA6KaB55m75b2V5ZCO5omN5Y+v5Lul5pON5L2cXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiNDAxIOmcgOimgeeZu+W9leWQjuaJjeWPr+S7peaTjeS9nFwiKTtcclxuICAgICAgICAgICAgbGV0IGNvZGUgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gbG9naW4oKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICBjb2RlID0gcmVzLmNvZGU7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGdldFVzZXJJbmZvKCk7XHJcbiAgICAgICAgICAgIH0pLnRoZW4oKHVzZXJJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgLy/nmbvlvZXov5znqIvmnI3liqHlmahcclxuICAgICAgICAgICAgICByZXF1ZXN0KGFwaS5BdXRoTG9naW5CeVdlaXhpbiwgeyBjb2RlOiBjb2RlLCB1c2VySW5mbzogdXNlckluZm8gfSwgJ1BPU1QnKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmVycm5vID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8v5a2Y5YKo55So5oi35L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55m76ZmG5a6M77yM5YKo5a2Y5L+h5oGvXCIpO1xyXG4gICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCByZXMuZGF0YS51c2VySW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHJlcy5kYXRhLnRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlamVjdChyZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KHJlcy5lcnJNc2cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICByZWplY3QoZXJyKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmFpbGVkXCIpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmo4Dmn6Xlvq7kv6HkvJror53mmK/lkKbov4fmnJ9cclxuICovXHJcbmZ1bmN0aW9uIGNoZWNrU2Vzc2lvbigpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgd3guY2hlY2tTZXNzaW9uKHtcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog6LCD55So5b6u5L+h55m75b2VXHJcbiAqL1xyXG5mdW5jdGlvbiBsb2dpbigpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgd3gubG9naW4oe1xyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgaWYgKHJlcy5jb2RlKSB7XHJcbiAgICAgICAgICAvL+eZu+W9lei/nOeoi+acjeWKoeWZqFxyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QocmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFVzZXJJbmZvKCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVkaXJlY3QodXJsKSB7XHJcblxyXG4gIC8v5Yik5pat6aG16Z2i5piv5ZCm6ZyA6KaB55m75b2VXHJcbiAgaWYgKGZhbHNlKSB7XHJcbiAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgdXJsOiAnL3BhZ2VzL2F1dGgvbG9naW4vbG9naW4nXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9IGVsc2Uge1xyXG4gICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgIHVybDogdXJsXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dFcnJvclRvYXN0KG1zZykge1xyXG4gIHd4LnNob3dUb2FzdCh7XHJcbiAgICB0aXRsZTogbXNnLFxyXG4gICAgaW1hZ2U6ICcvc3RhdGljL2ltYWdlcy9pY29uX2Vycm9yLnBuZydcclxuICB9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBmb3JtYXRUaW1lLFxyXG4gIHJlcXVlc3QsXHJcbiAgcmVkaXJlY3QsXHJcbiAgc2hvd0Vycm9yVG9hc3QsXHJcbiAgY2hlY2tTZXNzaW9uLFxyXG4gIGxvZ2luLFxyXG4gIGdldFVzZXJJbmZvLFxyXG59Il19