App({
  userInfo: null,
  auth_info: null,
  webViewUrl:null,
  backUrl:null,
  toUrl:null,
  globalData: {},
  token: '',
  getUserInfo() {
    return new Promise((resolve, reject) => {
      //if (this.userInfo) resolve(this.auth_info);

      my.getAuthCode({
        scopes: ['auth_user'],
        success: authcode => {

          // this.auth_info = {
          //   auth_code: authcode
          // };
          // resolve(this.auth_info);

          my.getAuthUserInfo({
            success: res => {
              this.auth_info = {
                user_info: res,
                auth_code: authcode
              };
              resolve(this.auth_info);
            },
            fail: () => {
              reject('授权失败');
            },
          });
        },
        fail: () => {
          my.switchTab({url: 'pages/index/index'})
          reject('拒绝授权');
        },
      });
    });
  },
  getUrl(id) {
    let pages = getCurrentPages()  
    let currentPage = pages[pages.length - 1] 
    let url = currentPage.route
    app.backUrl = url + '?id=' + id
  },
});
