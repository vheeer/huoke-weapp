"use strict";

// const ApiRootUrl = 'http://127.0.0.1:8360/api/';
var ApiRootUrl = 'https://www.yinmudianying.club/huoke-dev/api/';
var mch = "huipu";
var title = "平安惠普";
module.exports = {
  title: title,
  AuthLoginByWeixin: ApiRootUrl + 'auth/loginByWeixin?mch=' + mch, //微信登录
  UserMes: ApiRootUrl + 'user/add1?mch=' + mch //微信登录
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJBcGlSb290VXJsIiwibWNoIiwidGl0bGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiQXV0aExvZ2luQnlXZWl4aW4iLCJVc2VyTWVzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTUEsYUFBYSwrQ0FBbkI7QUFDQSxJQUFNQyxNQUFNLE9BQVo7QUFDQSxJQUFNQyxRQUFRLE1BQWQ7QUFDQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmRixjQURlO0FBRWZHLHFCQUFtQkwsYUFBYSx5QkFBYixHQUF5Q0MsR0FGN0MsRUFFa0Q7QUFDakVLLFdBQVNOLGFBQWEsZ0JBQWIsR0FBZ0NDLEdBSDFCLENBRytCO0FBSC9CLENBQWpCIiwiZmlsZSI6ImFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbnN0IEFwaVJvb3RVcmwgPSAnaHR0cDovLzEyNy4wLjAuMTo4MzYwL2FwaS8nO1xyXG5jb25zdCBBcGlSb290VXJsID0gJ2h0dHBzOi8vd3d3Lnlpbm11ZGlhbnlpbmcuY2x1Yi9odW9rZS1kZXYvYXBpLyc7XHJcbmNvbnN0IG1jaCA9IFwiaHVpcHVcIjtcclxuY29uc3QgdGl0bGUgPSBcIuW5s+WuieaDoOaZrlwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICB0aXRsZSxcclxuICBBdXRoTG9naW5CeVdlaXhpbjogQXBpUm9vdFVybCArICdhdXRoL2xvZ2luQnlXZWl4aW4/bWNoPScgKyBtY2gsIC8v5b6u5L+h55m75b2VXHJcbiAgVXNlck1lczogQXBpUm9vdFVybCArICd1c2VyL2FkZDE/bWNoPScgKyBtY2gsIC8v5b6u5L+h55m75b2VXHJcbn07Il19