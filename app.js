import uma from 'umtrack-alipay';
App({
  userInfo: null,
  auth_info: null,
  webViewUrl:null,
  backUrl:null,
  toUrl:null,
  selAddr:null,
  cityAdcode:null,
  coordinate:null,//经纬度
  globalQuery:null,//外部链接传过来的参
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
          my.switchTab({url: '/pages/index/index'})
          reject('拒绝授权');
        },
      });
    });
  },
  getUrl(type,id,code) {
    return new Promise((resolve, reject) => {
      let pages = getCurrentPages()  
      let currentPage = pages[pages.length - 1] 
      let url = currentPage.route
      //console.log(url)
      if(type === 1){
        this.backUrl = url 
      }else if(type === 2){
        this.backUrl = url+ '?id=' + id
      }else if(type === 3){
        this.backUrl = url+ '?city=' + id +'&cityAdcode=' + code
      }else if(type === 4){
        this.backUrl = url+ '?cityAdcode=' + id
      }else if(type === 5){
        this.backUrl = url+ '?pageType=' + id +'&cityCode=' + code
      }
      
    })
    
  },
  onLaunch(options) {
    if(options.query){
      this.globalQuery = options.query
    }
    uma.init('5d0340b50cafb268fa000df3', my);
  },
  onShow(options) {
    if(options.query){
      this.globalQuery = options.query
    }
    uma.resume();
  },
  onHide() {
      uma.pause();    
  },
  globalData: {
    uma         
  }
});
