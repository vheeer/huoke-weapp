'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },

    focus: 'occupation',
    list: [[{
      key: "occupation",
      title: '职业身份',
      desc: '',
      slot: false,
      rel: [{ value: '上班族', title: '上班族' }, { value: '个体户', title: '个体户' }, { value: '无固定职业', title: '无固定职业' }, { value: '企业主', title: '企业主' }, { value: '学生', title: '学生' }],
      selected_title: "",
      selected_value: ""
    }], [{
      key: "salary_payment",
      title: '工资收入方式',
      desc: '',
      slot: false,
      rel: [{ value: '银行卡发放', title: '银行卡发放' }, { value: '现金发放', title: '现金发放' }, { value: '部分现金，部分银行卡', title: '部分现金，部分银行卡' }],
      selected_title: "",
      selected_value: ""
    }], [{
      key: "salary",
      title: '工资/月',
      desc: '',
      slot: false,
      rel: [{ value: '3000及以下', title: '3000及以下' }, { value: '3000~5000', title: '3000~5000' }, { value: '5000~10000', title: '5000~10000' }, { value: '10000~50000', title: '10000~50000' }, { value: '50000及以上', title: '50000及以上' }],
      selected_title: "",
      selected_value: ""
    }], [{
      key: "have_local_provident_fund",
      title: '是否有本地公积金',
      desc: '',
      slot: false,
      rel: [{ value: '1', title: '是' }, { value: '0', title: '否' }],
      selected_title: "",
      selected_value: ""
    }], [{
      key: "have_social_security",
      title: '是否有本地社保',
      desc: '',
      slot: false,
      rel: [{ value: '1', title: '是' }, { value: '0', title: '否' }],
      selected_title: "",
      selected_value: ""
    }]]
  },
  /** note: 在 wxp 文件或者页面文件中请去掉 methods 包装 */

  onClick: function onClick(e) {
    var that = this;
    var key = e.currentTarget.dataset.key;

    this.setData({ focus: key });
  },
  onChange: function onChange(e) {
    var that = this;
    var key = e.currentTarget.dataset.key;
    var value = e.detail.value;

    console.log("kv", key, value);
    this.setData({
      list: that.data.list.map(function (item) {
        item = item[0];
        if (item.key === key) {
          item.selected_value = value;
          var title = void 0;
          item.rel.forEach(function (item_1) {
            if (item_1.value === value) title = item_1.title;
          });
          item.selected_title = title;
          return [item];
        } else {
          return [item];
        }
      })
    });
  },
  onSubmit: function onSubmit(e) {
    console.log("submit e", e);
    var that = this;
    var app = getApp();
    var config = require("../../config/api.js");
    var data = {};
    var name_reg = /^[\u4e00-\u9fa5]+([\u4e00-\u9fa5]|·)*[\u4e00-\u9fa5]+$/;
    var loan_reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    // 所有列表的值
    this.data.list.forEach(function (item) {
      item = item[0];
      var value = item["selected_value"];
      if (value === "") return;
      data[item["key"]] = value;
    });
    // 所有表单的值
    data["real_name"] = this.data.real_name;
    data["loan_price"] = this.data.loan_price;
    data.openid = app.globalData.openid;
    // 校验非空
    if (!this.data.real_name || this.data.real_name === "") {
      return wx.showToast({
        title: "请填写姓名",
        icon: "none",
        duration: 800
      });
    }
    if (!this.data.loan_price || this.data.loan_price === "") {
      return wx.showToast({
        title: "请填写金额",
        icon: "none",
        duration: 800
      });
    }
    // 校验姓名
    if (!name_reg.test(this.data.real_name)) {
      return wx.showToast({
        title: "姓名格式错误",
        icon: "none",
        duration: 800
      });
    }
    // 校验金额
    if (!loan_reg.test(this.data.loan_price)) {
      return wx.showToast({
        title: "金额格式错误",
        icon: "none",
        duration: 800
      });
    }
    wx.request({
      url: config.UserMes,
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success: function success(res) {
        console.log(res.data);
        wx.showModal({
          title: "提示",
          content: "已收到您的信息",
          showCancel: false
        });
      }
    });
  },
  real_name_input: function real_name_input(e) {
    var real_name = e.detail.value;

    this.setData({
      real_name: real_name
    });
  },
  loan_price_input: function loan_price_input(e) {
    var loan_price = e.detail.value;

    this.setData({
      loan_price: loan_price
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiZm9jdXMiLCJsaXN0Iiwia2V5IiwidGl0bGUiLCJkZXNjIiwic2xvdCIsInJlbCIsInZhbHVlIiwic2VsZWN0ZWRfdGl0bGUiLCJzZWxlY3RlZF92YWx1ZSIsIm9uQ2xpY2siLCJlIiwidGhhdCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwic2V0RGF0YSIsIm9uQ2hhbmdlIiwiZGV0YWlsIiwiY29uc29sZSIsImxvZyIsIm1hcCIsIml0ZW0iLCJmb3JFYWNoIiwiaXRlbV8xIiwib25TdWJtaXQiLCJhcHAiLCJnZXRBcHAiLCJjb25maWciLCJyZXF1aXJlIiwibmFtZV9yZWciLCJsb2FuX3JlZyIsInJlYWxfbmFtZSIsImxvYW5fcHJpY2UiLCJvcGVuaWQiLCJnbG9iYWxEYXRhIiwid3giLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJ0ZXN0IiwicmVxdWVzdCIsInVybCIsIlVzZXJNZXMiLCJtZXRob2QiLCJoZWFkZXIiLCJzdWNjZXNzIiwicmVzIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJyZWFsX25hbWVfaW5wdXQiLCJsb2FuX3ByaWNlX2lucHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFTRUEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFLSkMsV0FBTyxZQUxIO0FBTUpDLFVBQU0sQ0FBQyxDQUFDO0FBQ05DLFdBQUssWUFEQztBQUVOQyxhQUFPLE1BRkQ7QUFHTkMsWUFBTSxFQUhBO0FBSU5DLFlBQU0sS0FKQTtBQUtOQyxXQUFLLENBQ0gsRUFBQ0MsT0FBTyxLQUFSLEVBQWVKLE9BQU8sS0FBdEIsRUFERyxFQUVILEVBQUNJLE9BQU8sS0FBUixFQUFlSixPQUFPLEtBQXRCLEVBRkcsRUFHSCxFQUFDSSxPQUFPLE9BQVIsRUFBaUJKLE9BQU8sT0FBeEIsRUFIRyxFQUlILEVBQUNJLE9BQU8sS0FBUixFQUFlSixPQUFPLEtBQXRCLEVBSkcsRUFLSCxFQUFDSSxP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QWE7QUFDWGdCO0FBRFcsS0FBYjtBQUdELEc7QUFDRG9CLGtCLDRCQUFpQnhDLEMsRUFBRTtBQUFBLFFBQ0ZxQixVQURFLEdBQ2FyQixFQUFFTSxNQURmLENBQ1RWLEtBRFM7O0FBRWpCLFNBQUtRLE9BQUwsQ0FBYTtBQUNYaUI7QUFEVyxLQUFiO0FBR0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbmZpZzoge1xyXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgICd3eGMtc2VsZWN0JzogJ0BtaW51aS93eGMtc2VsZWN0JyxcclxuICAgICAgJ3d4Yy1saXN0JzogJ0BtaW51aS93eGMtbGlzdCcsXHJcbiAgICAgICd3eGMtYnV0dG9uJzogJ0BtaW51aS93eGMtYnV0dG9uJyxcclxuICAgICAgJ3d4Yy1pbnB1dCc6ICdAbWludWkvd3hjLWlucHV0J1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgY29uZmlnOiB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpgJ/np5LotLcnLFxyXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHt9XHJcbiAgICB9LFxyXG4gICAgZm9jdXM6ICdvY2N1cGF0aW9uJyxcclxuICAgIGxpc3Q6IFtbe1xyXG4gICAgICBrZXk6IFwib2NjdXBhdGlvblwiLFxyXG4gICAgICB0aXRsZTogJ+iBjOS4mui6q+S7vScsXHJcbiAgICAgIGRlc2M6ICcnLFxyXG4gICAgICBzbG90OiBmYWxzZSxcclxuICAgICAgcmVsOiBbXHJcbiAgICAgICAge3ZhbHVlOiAn5LiK54+t5pePJywgdGl0bGU6ICfkuIrnj63ml48nfSxcclxuICAgICAgICB7dmFsdWU6ICfkuKrkvZPmiLcnLCB0aXRsZTogJ+S4quS9k+aItyd9LFxyXG4gICAgICAgIHt2YWx1ZTogJ+aXoOWbuuWumuiBjOS4micsIHRpdGxlOiAn5peg5Zu65a6a6IGM5LiaJ30sXHJcbiAgICAgICAge3ZhbHVlOiAn5LyB5Lia5Li7JywgdGl0bGU6ICfkvIHkuJrkuLsnfSxcclxuICAgICAgICB7dmFsdWU6ICflrabnlJ8nLCB0aXRsZTogJ+WtpueUnyd9LFxyXG4gICAgICBdLFxyXG4gICAgICBzZWxlY3RlZF90aXRsZTogXCJcIixcclxuICAgICAgc2VsZWN0ZWRfdmFsdWU6IFwiXCJcclxuICAgIH1dLFt7XHJcbiAgICAgIGtleTogXCJzYWxhcnlfcGF5bWVudFwiLFxyXG4gICAgICB0aXRsZTogJ+W3pei1hOaUtuWFpeaWueW8jycsXHJcbiAgICAgIGRlc2M6ICcnLFxyXG4gICAgICBzbG90OiBmYWxzZSxcclxuICAgICAgcmVsOiBbXHJcbiAgICAgICAge3ZhbHVlOiAn6ZO26KGM5Y2h5Y+R5pS+JywgdGl0bGU6ICfpk7booYzljaHlj5HmlL4nfSxcclxuICAgICAgICB7dmFsdWU6ICfnjrDph5Hlj5HmlL4nLCB0aXRsZTogJ+eOsOmHkeWPkeaUvid9LFxyXG4gICAgICAgIHt2YWx1ZTogJ+mDqOWIhueOsOmHke+8jOmDqOWIhumTtuihjOWNoScsIHRpdGxlOiAn6YOo5YiG546w6YeR77yM6YOo5YiG6ZO26KGM5Y2hJ30sXHJcbiAgICAgIF0sXHJcbiAgICAgIHNlbGVjdGVkX3RpdGxlOiBcIlwiLFxyXG4gICAgICBzZWxlY3RlZF92YWx1ZTogXCJcIlxyXG4gICAgfV0sW3tcclxuICAgICAga2V5OiBcInNhbGFyeVwiLFxyXG4gICAgICB0aXRsZTogJ+W3pei1hC/mnIgnLFxyXG4gICAgICBkZXNjOiAnJyxcclxuICAgICAgc2xvdDogZmFsc2UsXHJcbiAgICAgIHJlbDogW1xyXG4gICAgICAgIHt2YWx1ZTogJzMwMDDlj4rku6XkuIsnLCB0aXRsZTogJzMwMDDlj4rku6XkuIsnfSxcclxuICAgICAgICB7dmFsdWU6ICczMDAwfjUwMDAnLCB0aXRsZTogJzMwMDB+NTAwMCd9LFxyXG4gICAgICAgIHt2YWx1ZTogJzUwMDB+MTAwMDAnLCB0aXRsZTogJzUwMDB+MTAwMDAnfSxcclxuICAgICAgICB7dmFsdWU6ICcxMDAwMH41MDAwMCcsIHRpdGxlOiAnMTAwMDB+NTAwMDAnfSxcclxuICAgICAgICB7dmFsdWU6ICc1MDAwMOWPiuS7peS4iicsIHRpdGxlOiAnNTAwMDDlj4rku6XkuIonfSxcclxuICAgICAgXSxcclxuICAgICAgc2VsZWN0ZWRfdGl0bGU6IFwiXCIsXHJcbiAgICAgIHNlbGVjdGVkX3ZhbHVlOiBcIlwiXHJcbiAgICB9XSxbe1xyXG4gICAgICBrZXk6IFwiaGF2ZV9sb2NhbF9wcm92aWRlbnRfZnVuZFwiLFxyXG4gICAgICB0aXRsZTogJ+aYr+WQpuacieacrOWcsOWFrOenr+mHkScsXHJcbiAgICAgIGRlc2M6ICcnLFxyXG4gICAgICBzbG90OiBmYWxzZSxcclxuICAgICAgcmVsOiBbXHJcbiAgICAgICAge3ZhbHVlOiAnMScsIHRpdGxlOiAn5pivJ30sXHJcbiAgICAgICAge3ZhbHVlOiAnMCcsIHRpdGxlOiAn5ZCmJ30sXHJcbiAgICAgIF0sXHJcbiAgICAgIHNlbGVjdGVkX3RpdGxlOiBcIlwiLFxyXG4gICAgICBzZWxlY3RlZF92YWx1ZTogXCJcIlxyXG4gICAgfV0sW3tcclxuICAgICAga2V5OiBcImhhdmVfc29jaWFsX3NlY3VyaXR5XCIsXHJcbiAgICAgIHRpdGxlOiAn5piv5ZCm5pyJ5pys5Zyw56S+5L+dJyxcclxuICAgICAgZGVzYzogJycsXHJcbiAgICAgIHNsb3Q6IGZhbHNlLFxyXG4gICAgICByZWw6IFtcclxuICAgICAgICB7dmFsdWU6ICcxJywgdGl0bGU6ICfmmK8nfSxcclxuICAgICAgICB7dmFsdWU6ICcwJywgdGl0bGU6ICflkKYnfSxcclxuICAgICAgXSxcclxuICAgICAgc2VsZWN0ZWRfdGl0bGU6IFwiXCIsXHJcbiAgICAgIHNlbGVjdGVkX3ZhbHVlOiBcIlwiXHJcbiAgICB9XV1cclxuICB9LFxyXG4gIC8qKiBub3RlOiDlnKggd3hwIOaWh+S7tuaIluiAhemhtemdouaWh+S7tuS4reivt+WOu+aOiSBtZXRob2RzIOWMheijhSAqL1xyXG4gIFxyXG4gICAgb25DbGljayhlKXtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGNvbnN0IHsga2V5IH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgdGhpcy5zZXREYXRhKHsgZm9jdXM6IGtleSB9KTtcclxuICAgIH0sXHJcbiAgICBvbkNoYW5nZShlKXtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGNvbnN0IHsga2V5IH0gPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcclxuICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gZS5kZXRhaWw7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwia3ZcIiwga2V5LCB2YWx1ZSk7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgbGlzdDogdGhhdC5kYXRhLmxpc3QubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgaXRlbSA9IGl0ZW1bMF07XHJcbiAgICAgICAgICBpZihpdGVtLmtleSA9PT0ga2V5KXtcclxuICAgICAgICAgICAgaXRlbS5zZWxlY3RlZF92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgdGl0bGU7XHJcbiAgICAgICAgICAgIGl0ZW0ucmVsLmZvckVhY2goaXRlbV8xID0+IHtcclxuICAgICAgICAgICAgICBpZihpdGVtXzEudmFsdWUgPT09IHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgdGl0bGUgPSBpdGVtXzEudGl0bGU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpdGVtLnNlbGVjdGVkX3RpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgICAgIHJldHVybiBbaXRlbV07XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIFtpdGVtXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBvblN1Ym1pdChlKXtcclxuICAgICAgY29uc29sZS5sb2coXCJzdWJtaXQgZVwiLCBlKTtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGNvbnN0IGFwcCA9IGdldEFwcCgpO1xyXG4gICAgICBjb25zdCBjb25maWcgPSByZXF1aXJlKFwiLi4vLi4vY29uZmlnL2FwaS5qc1wiKTtcclxuICAgICAgY29uc3QgZGF0YSA9IHt9O1xyXG4gICAgICBjb25zdCBuYW1lX3JlZyA9IC9eW1xcdTRlMDAtXFx1OWZhNV0rKFtcXHU0ZTAwLVxcdTlmYTVdfMK3KSpbXFx1NGUwMC1cXHU5ZmE1XSskLztcclxuICAgICAgY29uc3QgbG9hbl9yZWcgPSAvKF5bMS05XShbMC05XSspPyhcXC5bMC05XXsxLDJ9KT8kKXwoXigwKXsxfSQpfCheWzAtOV1cXC5bMC05XShbMC05XSk/JCkvO1xyXG4gICAgICAvLyDmiYDmnInliJfooajnmoTlgLxcclxuICAgICAgdGhpcy5kYXRhLmxpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtID0gaXRlbVswXTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGl0ZW1bXCJzZWxlY3RlZF92YWx1ZVwiXTtcclxuICAgICAgICBpZih2YWx1ZSA9PT0gXCJcIilcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBkYXRhW2l0ZW1bXCJrZXlcIl1dID0gdmFsdWU7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyDmiYDmnInooajljZXnmoTlgLxcclxuICAgICAgZGF0YVtcInJlYWxfbmFtZVwiXSA9IHRoaXMuZGF0YS5yZWFsX25hbWU7XHJcbiAgICAgIGRhdGFbXCJsb2FuX3ByaWNlXCJdID0gdGhpcy5kYXRhLmxvYW5fcHJpY2U7XHJcbiAgICAgIGRhdGEub3BlbmlkID0gYXBwLmdsb2JhbERhdGEub3BlbmlkO1xyXG4gICAgICAvLyDmoKHpqozpnZ7nqbpcclxuICAgICAgaWYoIXRoaXMuZGF0YS5yZWFsX25hbWUgfHwgdGhpcy5kYXRhLnJlYWxfbmFtZSA9PT0gXCJcIil7XHJcbiAgICAgICAgcmV0dXJuIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogXCLor7floavlhpnlp5PlkI1cIixcclxuICAgICAgICAgIGljb246IFwibm9uZVwiLFxyXG4gICAgICAgICAgZHVyYXRpb246IDgwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKCF0aGlzLmRhdGEubG9hbl9wcmljZSB8fCB0aGlzLmRhdGEubG9hbl9wcmljZSA9PT0gXCJcIil7XHJcbiAgICAgICAgcmV0dXJuIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogXCLor7floavlhpnph5Hpop1cIixcclxuICAgICAgICAgIGljb246IFwibm9uZVwiLFxyXG4gICAgICAgICAgZHVyYXRpb246IDgwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIOagoemqjOWnk+WQjVxyXG4gICAgICBpZighbmFtZV9yZWcudGVzdCh0aGlzLmRhdGEucmVhbF9uYW1lKSl7XHJcbiAgICAgICAgcmV0dXJuIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogXCLlp5PlkI3moLzlvI/plJnor69cIixcclxuICAgICAgICAgIGljb246IFwibm9uZVwiLFxyXG4gICAgICAgICAgZHVyYXRpb246IDgwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIOagoemqjOmHkeminVxyXG4gICAgICBpZighbG9hbl9yZWcudGVzdCh0aGlzLmRhdGEubG9hbl9wcmljZSkpe1xyXG4gICAgICAgIHJldHVybiB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6IFwi6YeR6aKd5qC85byP6ZSZ6K+vXCIsXHJcbiAgICAgICAgICBpY29uOiBcIm5vbmVcIixcclxuICAgICAgICAgIGR1cmF0aW9uOiA4MDBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICB1cmw6IGNvbmZpZy5Vc2VyTWVzLCBcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuaPkOekulwiLFxyXG4gICAgICAgICAgICBjb250ZW50OiBcIuW3suaUtuWIsOaCqOeahOS/oeaBr1wiLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHJlYWxfbmFtZV9pbnB1dChlKXtcclxuICAgICAgY29uc3QgeyB2YWx1ZTogcmVhbF9uYW1lIH0gPSBlLmRldGFpbDsgXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgcmVhbF9uYW1lXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGxvYW5fcHJpY2VfaW5wdXQoZSl7XHJcbiAgICAgIGNvbnN0IHsgdmFsdWU6IGxvYW5fcHJpY2UgfSA9IGUuZGV0YWlsO1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIGxvYW5fcHJpY2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=