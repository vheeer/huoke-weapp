'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },

    notice: "123456789| "
  },
  onShow: function onShow(options) {
    var app = getApp();
    var globalData = app.globalData;
    console.log(globalData);
    this.setData({ globalData: globalData });
  },
  bindGetUserInfo: function bindGetUserInfo(e) {
    var that = this;
    var app = getApp();
    var user = require('../../services/user.js');
    console.log("e.detail.errMsg", e.detail.errMsg);
    console.log("e.detail.userInfo", e.detail.userInfo);
    app.globalData.userInfo = e.detail.userInfo;

    //存储用户信息
    wx.setStorageSync('userInfo', e.detail.userInfo);
    //信息放到全局
    app.globalData.userInfo = e.detail.userInfo;

    user.loginByWeixin().then(function (res) {
      console.log("点击登录小程序微信登陆成功", res);
      //存储用户信息
      wx.setStorageSync('userInfo', res.data.userInfo);
      wx.setStorageSync('openid', res.data.openid);
      wx.setStorageSync('token', res.data.token);
      //信息放到全局
      app.globalData.openid = res.data.openid;
      app.globalData.userInfo = res.data.userInfo;
      app.globalData.token = res.data.token;
      // 信息提到本页
      that.setData({ globalData: app.globalData });
      wx.showModal({
        title: "提示",
        content: "登录成功,请继续",
        showCancel: false
      });
    }).catch(function (err) {
      console.log("点击登录小程序微信登陆失败：", err);
      wx.showModal({
        title: "提示",
        content: "登录失败",
        showCancel: false
      });
    });
  },
  getPhoneNumber: function getPhoneNumber(e) {
    var that = this;
    var app = getApp();
    console.log("e.detail.errMsg", e.detail.errMsg);
    console.log("e.detail.iv", e.detail.iv);
    console.log("e.detail.encryptedData", e.detail.encryptedData);
    console.log("app.globalData", app.globalData);

    var _e$detail = e.detail,
        iv = _e$detail.iv,
        encryptedData = _e$detail.encryptedData;

    if (iv && encryptedData) {
      wx.request({
        url: 'https://www.yinmudianying.club/huoke-dev/api/user/number?mch=huipu',
        method: 'POST',
        data: {
          '__code__': {
            readme: ''
          },

          iv: iv,
          encryptedData: encryptedData,
          openid: app.globalData.openid
        },
        success: function success(res) {
          console.log(res.data);
          wx.navigateTo({
            url: '../submit/index'
          });
        }
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwibm90aWNlIiwib25TaG93Iiwib3B0aW9ucyIsImFwcCIsImdldEFwcCIsImdsb2JhbERhdGEiLCJjb25zb2xlIiwibG9nIiwic2V0RGF0YSIsImJpbmRHZXRVc2VySW5mbyIsImUiLCJ0aGF0IiwidXNlciIsInJlcXVpcmUiLCJkZXRhaWwiLCJlcnJNc2ciLCJ1c2VySW5mbyIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJsb2dpbkJ5V2VpeGluIiwidGhlbiIsInJlcyIsIm9wZW5pZCIsInRva2VuIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsImNhdGNoIiwiZXJyIiwiZ2V0UGhvbmVOdW1iZXIiLCJpdiIsImVuY3J5cHRlZERhdGEiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwic3VjY2VzcyIsIm5hdmlnYXRlVG8iXSwibWFwcGluZ3MiOiI7Ozs7OztBQU9FQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxZQUFRO0FBREosRztBQUdOQyxVQUFRLGdCQUFTQyxPQUFULEVBQWtCO0FBQ3hCLFFBQU1DLE1BQU1DLFFBQVo7QUFDQSxRQUFNQyxhQUFhRixJQUFJRSxVQUF2QjtBQUNBQyxZQUFRQyxHQUFSLENBQVlGLFVBQVo7QUFDQSxTQUFLRyxPQUFMLENBQWEsRUFBRUgsc0JBQUYsRUFBYjtBQUNELEc7QUFDREksbUJBQWlCLHlCQUFTQyxDQUFULEVBQVk7QUFDM0IsUUFBTUMsT0FBTyxJQUFiO0FBQ0EsUUFBTVIsTUFBTUMsUUFBWjtBQUNBLFFBQU1RLE9BQU9DLFFBQVEsd0JBQVIsQ0FBYjtBQUNBUCxZQUFRQyxHQUFSLENBQVksaUJBQVosRUFBK0JHLEVBQUVJLE1BQUYsQ0FBU0MsTUFBeEM7QUFDQVQsWUFBUUMsR0FBUixDQUFZLG1CQUFaLEVBQWlDRyxFQUFFSSxNQUFGLENBQVNFLFFBQTFDO0FBQ0FiLFFBQUlFLFVBQUosQ0FBZVcsUUFBZixHQUEwQk4sRUFBRUksTUFBRixDQUFTRSxRQUFuQzs7QUFFQTtBQUNBQyxPQUFHQyxjQUFILENBQWtCLFVBQWxCLEVBQThCUixFQUFFSSxNQUFGLENBQVNFLFFBQXZDO0FBQ0E7QUFDQWIsUUFBSUUsVUFBSixDQUFlVyxRQUFmLEdBQTBCTixFQUFFSSxNQUFGLENBQVNFLFFBQW5DOztBQUVBSixTQUFLTyxhQUFMLEdBQXFCQyxJQUFyQixDQUEwQixlQUFPO0FBQzdCZCxjQUFRQyxHQUFSLENBQVksZUFBWixFQUE2QmMsR0FBN0I7QUFDQTtBQUNBSixTQUFHQyxjQUFILENBQWtCLFVBQWxCLEVBQThCRyxJQUFJdEIsSUFBSixDQUFTaUIsUUFBdkM7QUFDQUMsU0FBR0MsY0FBSCxDQUFrQixRQUFsQixFQUE0QkcsSUFBSXRCLElBQUosQ0FBU3VCLE1BQXJDO0FBQ0FMLFNBQUdDLGNBQUgsQ0FBa0IsT0FBbEIsRUFBMkJHLElBQUl0QixJQUFKLENBQVN3QixLQUFwQztBQUNBO0FBQ0FwQixVQUFJRSxVQUFKLENBQWVpQixNQUFmLEdBQXdCRCxJQUFJdEIsSUFBSixDQUFTdUIsTUFBakM7QUFDQW5CLFVBQUlFLFVBQUosQ0FBZVcsUUFBZixHQUEwQkssSUFBSXRCLElBQUosQ0FBU2lCLFFBQW5DO0FBQ0FiLFVBQUlFLFVBQUosQ0FBZWtCLEtBQWYsR0FBdUJGLElBQUl0QixJQUFKLENBQVN3QixLQUFoQztBQUNBO0FBQ0FaLFdBQUtILE9BQUwsQ0FBYSxFQUFFSCxZQUFZRixJQUFJRSxVQUFsQixFQUFiO0FBQ0FZLFNBQUdPLFNBQUgsQ0FBYTtBQUNYQyxlQUFPLElBREk7QUFFWEMsaUJBQVMsVUFGRTtBQUdYQyxvQkFBWTtBQUhELE9BQWI7QUFLRCxLQWpCSCxFQWlCS0MsS0FqQkwsQ0FpQlcsZUFBTztBQUNkdEIsY0FBUUMsR0FBUixDQUFZLGdCQUFaLEVBQThCc0IsR0FBOUI7QUFDQVosU0FBR08sU0FBSCxDQUFhO0FBQ1hDLGVBQU8sSUFESTtBQUVYQyxpQkFBUyxNQUZFO0FBR1hDLG9CQUFZO0FBSEQsT0FBYjtBQUtELEtBeEJIO0FBeUJELEc7QUFDREcsZ0IsMEJBQWVwQixDLEVBQUU7QUFDZixRQUFNQyxPQUFPLElBQWI7QUFDQSxRQUFNUixNQUFNQyxRQUFaO0FBQ0FFLFlBQVFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQkcsRUFBRUksTUFBRixDQUFTQyxNQUF4QztBQUNBVCxZQUFRQyxHQUFSLENBQVksYUFBWixFQUEyQkcsRUFBRUksTUFBRixDQUFTaUIsRUFBcEM7QUFDQXpCLFlBQVFDLEdBQVIsQ0FBWSx3QkFBWixFQUFzQ0csRUFBRUksTUFBRixDQUFTa0IsYUFBL0M7QUFDQTFCLFlBQVFDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QkosSUFBSUUsVUFBbEM7O0FBTmUsb0JBUWVLLEVBQUVJLE1BUmpCO0FBQUEsUUFRUGlCLEVBUk8sYUFRUEEsRUFSTztBQUFBLFFBUUhDLGFBUkcsYUFRSEEsYUFSRzs7QUFTZixRQUFHRCxNQUFNQyxhQUFULEVBQ0E7QUFDRWYsU0FBR2dCLE9BQUgsQ0FBVztBQUNUQyxhQUFLLG9FQURJO0FBRVRDLGdCQUFRLE1BRkM7QUFHVHBDLGNBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pnQyxnQkFESTtBQUVKQyxzQ0FGSTtBQUdKVixrQkFBUW5CLElBQUlFLFVBQUosQ0FBZWlCO0FBSG5CLFNBSEc7QUFRVGMsaUJBQVMsaUJBQVNmLEdBQVQsRUFBYztBQUNyQmYsa0JBQVFDLEdBQVIsQ0FBWWMsSUFBSXRCLElBQWhCO0FBQ0FrQixhQUFHb0IsVUFBSCxDQUFjO0FBQ1pILGlCQUFLO0FBRE8sV0FBZDtBQUdEO0FBYlEsT0FBWDtBQWVEO0FBQ0YiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6YCf56eS6LS3JyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtbm90aWNlJzogJ0BtaW51aS93eGMtbm90aWNlJ1xuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgIG5vdGljZTogXCIxMjM0NTY3ODl8IFwiXG4gIH0sXG4gIG9uU2hvdzogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGNvbnN0IGFwcCA9IGdldEFwcCgpO1xuICAgIGNvbnN0IGdsb2JhbERhdGEgPSBhcHAuZ2xvYmFsRGF0YTtcbiAgICBjb25zb2xlLmxvZyhnbG9iYWxEYXRhKTtcbiAgICB0aGlzLnNldERhdGEoeyBnbG9iYWxEYXRhIH0pO1xuICB9LFxuICBiaW5kR2V0VXNlckluZm86IGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBjb25zdCBhcHAgPSBnZXRBcHAoKTtcbiAgICBjb25zdCB1c2VyID0gcmVxdWlyZShcIi4uLy4uL3NlcnZpY2VzL3VzZXJcIik7XG4gICAgY29uc29sZS5sb2coXCJlLmRldGFpbC5lcnJNc2dcIiwgZS5kZXRhaWwuZXJyTXNnKTtcbiAgICBjb25zb2xlLmxvZyhcImUuZGV0YWlsLnVzZXJJbmZvXCIsIGUuZGV0YWlsLnVzZXJJbmZvKTtcbiAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvO1xuXG4gICAgLy/lrZjlgqjnlKjmiLfkv6Hmga9cbiAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCBlLmRldGFpbC51c2VySW5mbyk7XG4gICAgLy/kv6Hmga/mlL7liLDlhajlsYBcbiAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvO1xuXG4gICAgdXNlci5sb2dpbkJ5V2VpeGluKCkudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIueCueWHu+eZu+W9leWwj+eoi+W6j+W+ruS/oeeZu+mZhuaIkOWKn1wiLCByZXMpO1xuICAgICAgICAvL+WtmOWCqOeUqOaIt+S/oeaBr1xuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCByZXMuZGF0YS51c2VySW5mbyk7XG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdvcGVuaWQnLCByZXMuZGF0YS5vcGVuaWQpO1xuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByZXMuZGF0YS50b2tlbik7XG4gICAgICAgIC8v5L+h5oGv5pS+5Yiw5YWo5bGAXG4gICAgICAgIGFwcC5nbG9iYWxEYXRhLm9wZW5pZCA9IHJlcy5kYXRhLm9wZW5pZDtcbiAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMuZGF0YS51c2VySW5mbztcbiAgICAgICAgYXBwLmdsb2JhbERhdGEudG9rZW4gPSByZXMuZGF0YS50b2tlbjtcbiAgICAgICAgLy8g5L+h5oGv5o+Q5Yiw5pys6aG1XG4gICAgICAgIHRoYXQuc2V0RGF0YSh7IGdsb2JhbERhdGE6IGFwcC5nbG9iYWxEYXRhIH0pO1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiBcIuaPkOekulwiLFxuICAgICAgICAgIGNvbnRlbnQ6IFwi55m75b2V5oiQ5YqfLOivt+e7p+e7rVwiLFxuICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIueCueWHu+eZu+W9leWwj+eoi+W6j+W+ruS/oeeZu+mZhuWksei0pe+8mlwiLCBlcnIpO1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiBcIuaPkOekulwiLFxuICAgICAgICAgIGNvbnRlbnQ6IFwi55m75b2V5aSx6LSlXCIsXG4gICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gIH0sXG4gIGdldFBob25lTnVtYmVyKGUpe1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGNvbnN0IGFwcCA9IGdldEFwcCgpO1xuICAgIGNvbnNvbGUubG9nKFwiZS5kZXRhaWwuZXJyTXNnXCIsIGUuZGV0YWlsLmVyck1zZyk7XG4gICAgY29uc29sZS5sb2coXCJlLmRldGFpbC5pdlwiLCBlLmRldGFpbC5pdik7XG4gICAgY29uc29sZS5sb2coXCJlLmRldGFpbC5lbmNyeXB0ZWREYXRhXCIsIGUuZGV0YWlsLmVuY3J5cHRlZERhdGEpO1xuICAgIGNvbnNvbGUubG9nKFwiYXBwLmdsb2JhbERhdGFcIiwgYXBwLmdsb2JhbERhdGEpO1xuXG4gICAgY29uc3QgeyBpdiwgZW5jcnlwdGVkRGF0YSB9ID0gZS5kZXRhaWw7XG4gICAgaWYoaXYgJiYgZW5jcnlwdGVkRGF0YSlcbiAgICB7XG4gICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cueWlubXVkaWFueWluZy5jbHViL2h1b2tlLWRldi9hcGkvdXNlci9udW1iZXI/bWNoPWh1aXB1JyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHsgXG4gICAgICAgICAgaXYsIFxuICAgICAgICAgIGVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgb3BlbmlkOiBhcHAuZ2xvYmFsRGF0YS5vcGVuaWRcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiAnLi4vc3VibWl0L2luZGV4J1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSJdfQ==