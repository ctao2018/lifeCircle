import uma from 'umtrack-alipay';
App({
  userInfo: null,
  auth_info: {
                user_info:null,
                auth_code: null,
                auth_time: null
              },
  webViewUrl:null,
  backUrl:null,
  toUrl:null,
  selAddr:null,
  cityAdcode:null,
  cityName:null,
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
                auth_code: authcode,
                auth_time: new Date().getTime()
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
  //判断认证是否过期
  authIsOrNot(nowTime) {
    let oldT = this.auth_info.auth_time;
    if(nowTime-oldT> 14400000){
      return false
    }else{
      return true
    }
  },
  //转义方法
  escape2Html(str) {
    var arrEntities = {'ldquo':'“','rdquo':'”','hellip':'……','lsquo':'‘','rsquo':'’','mdash':'—','middot':'·'};
    return str.replace(/&(ldquo|rdquo|hellip|lsquo|rsquo|mdash|middot);/ig, function (all, t) { return arrEntities[t]; }).replace('<section', '<div');
    // return str.replace(/&(ldquo|rdquo|hellip|lsquo|rsquo|mdash|middot);/ig, function (all, t) { return arrEntities[t]; }).replace('<section', '<div').replace('<img', '<img class="mohrssNewsImg" ');
    // return str.replace(/&(lt|gt|nbsp|amp|quot|ldquo|rdquo|hellip);/ig, function (all, t) { return arrEntities[t]; }).replace('<section', '<div').replace('<img', '<img style="max-width:100%;height:auto" ');
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
