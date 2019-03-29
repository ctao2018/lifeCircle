const app = getApp();
import {getTokenByCode,getCategory,getMenu,queryOpenCityValidModuleInfoByParam,
queryAllHotspotCarousel,queryQuestionAnwserPage,queryAllValidHotCity} from '../../config/api'

Page({
  data: {
    avatar: '',
    nickName: '',
    code: '',
    banner: [
      '../../assets/banner.png',
      '../../assets/banner.png',
    ],
    hotTit:[],
    hotList:[],
    category:[],
    menuList:[],
    city:'佛山市',
    cityAdcode:'440600',
    currentTabsIndex:0,
    editFlag:false,
    pageNum:1,
    pages:'',
    ansArr:[],
    isHot:'',
    showbtline:false,
    hotCity:[],
    token:'',
  },

  onLoad() {
   this._getCategory()
   this._getMenu()
   this.getLocation()
  },
  onShow() {
    this.setData({
      ansArr:[],
      pageNum:1,
      pages:'',
      showbtline:false,
      hotCity:[],
      })
    this._queryAllHotspotCarousel()
    this._queryQuestionAnwserPage()
    this._queryAllValidHotCity()
  },
  onReady() {
    
  },
  //获取当前地理位置
  getLocation() {
    var that = this;
    my.getLocation({
      type: 1,
      success(res) {
        //console.log(res)
        that.setData({
          city: res.city,
          cityAdcode: res.cityAdcode
        })
      },
      fail() {
        my.alert({ title: '定位失败' });
      },
    })
  },
  //支付宝授权
  auth(type,id) {
    app.getUserInfo().then(
      auth => {
          let auth_code = auth.auth_code.authCode;
          //console.log('auth_codeauth_code', auth_code)
          getTokenByCode({
            appClient: '',
            code: auth_code,
            identityType: 1,
            mac: '',
            registePlat: 2
          }).then(result =>{
            //console.log('result.data.data',result)
            my.setStorage({
              key: 'token',
              data: result.data.data
            });
            if(type === 1){
              my.navigateTo({ url: '/pages/question/question'})
            }else if(type === 2){
              my.navigateTo({ url: '/pages/reward/reward?city='+this.data.city +'&cityAdcode='+this.data.cityAdcode })
            }else if(type === 3){
               my.navigateTo({ url: '/pages/circledetail/circledetail?id='+ id})
            }else if(type === 4){
              my.navigateTo({ url: '/pages/search/search?city='+this.data.city +'&cityAdcode='+this.data.cityAdcode})
            }else if(type === 5){
              my.navigateTo({ url: '/pages/personalpage/personalpage?id=' +id})
            }else if(type === 6){
              this._queryOpenCityValidModuleInfoByParam(id)
            }
          })
      })
  },
  //轮播图列表
  async _getCategory() {
    let result = await getCategory()
    //console.log('getCategory',result)
   let cat = result.data.data
   this.setData({category:cat})
   let imgUrl = []
   for(let i=0;i<cat.length;i++){
     imgUrl.push(cat[i].pictureUrl)
   }
   this.setData({banner:imgUrl})
  },
  //菜单列表
  async _getMenu() {
    let result = await getMenu()
   //console.log('getMenu',result)
   let menu = result.data.data
   this.setData({menuList:menu})
  },
  //热点滚动列表
  async _queryAllHotspotCarousel() {
    let result = await queryAllHotspotCarousel()
    //console.log('queryAllHotspotCarousel',result)
    let list = result.data.data
    this.setData({hotList:list})
    let titL = []
    for(let i=0;i<list.length;i++){
      titL.push(list[i].title)
    }
    this.setData({hotTit:titL})
  },
  // tab点击切换
  tabClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      currentTabsIndex:index,
      showbtline:false,
    })
    if(index === 1){
      this.setData({pageNum:1,ansArr:[],isHot:'Y'})
      this._queryQuestionAnwserPage()
    }else{
      this.setData({pageNum:1,ansArr:[],isHot:''})
      this._queryQuestionAnwserPage()
    }
  },
  //点击轮播图跳转
  goToLinkPage(e) {
    //console.log(e);
    let indx = e.currentTarget.dataset.index
    if(this.data.category[indx].isJump === 'Y'){
      my.navigateTo({ url: this.data.category[indx].linkUrl})
    }
  },
  //菜单栏 点击跳转
  menuListClick(e) {
    //console.log(e)
    let indx = e.currentTarget.dataset.index
    if(this.data.menuList[indx].type === '0'){
      let moduleEn = this.data.menuList[indx].moduleEn
      let tok = my.getStorageSync({ key: 'token' })
      if (tok.data){
        this._queryOpenCityValidModuleInfoByParam(moduleEn)
      }else{
        this.auth(6,moduleEn)
      }
    } else if(this.data.menuList[indx].type === '1'){
      app.webViewUrl = this.data.menuList[indx].linkUrl
      my.navigateTo({ url: '/pages/webview/webview'})
    }
  },
  //判断城市开通模块
  async _queryOpenCityValidModuleInfoByParam(moduleEn) {
    let result = await queryOpenCityValidModuleInfoByParam({
      cityCode: this.data.cityAdcode,
      moduleEn: moduleEn
    })
    console.log('城市开通模块',result)
    if(result.data.data.length>0){
      let url = result.data.data[0].moduleUrl
      //console.log(url)
      let tok = my.getStorageSync({ key: 'token' })
      app.webViewUrl = url + '?tok=' + tok.data
      my.navigateTo({ url: '/pages/webview/webview'})
    }else{
      my.showToast({
        content: '该城市暂未开通此服务！'
      });
    }
  },
  //点击编辑按钮 显示弹框
  showEdit() {
    this.setData({editFlag:true})
  },
  //关闭弹框
  closeEdit() {
    this.setData({editFlag:false})
  },
  //点击跳转 发布问题
  toQuestion() {
    let tok = my.getStorageSync({ key: 'token' })
    if (tok.data){
      my.navigateTo({ url: '/pages/question/question'})
    }else{
      this.auth(1)
    }
    this.setData({editFlag:false})
  },
  //点击跳转 悬赏问答页
  toReward() {
    let tok = my.getStorageSync({ key: 'token' })
    if (tok.data){
      my.navigateTo({ url: '/pages/reward/reward?city='+this.data.city +'&cityAdcode='+this.data.cityAdcode })
    }else{
      this.auth(2)
    }
    this.setData({editFlag:false})
  },
  //问答热门列表
  async _queryQuestionAnwserPage() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    const result = await queryQuestionAnwserPage({
      pageNum: this.data.pageNum,
      pageSize: 10,
      isHot: this.data.isHot,
      subAnwserLength: 55
    })
    //console.log('问答',result)
    my.hideLoading()
    this.setData({pages:result.data.data.pages})
    let list = result.data.data.rows
    let newList = []
    for(let i =0;i<list.length;i++){
      if(list[i].picturesUrl){
        let imgArr = list[i].picturesUrl.split('|')
        let b = {imgUrl:imgArr,lists:list[i]}
        newList.push(b)
      }else{
        let b = {lists:list[i]}
        newList.push(b)
      }
    }
    this.data.ansArr = this.data.ansArr.concat(newList)
    this.setData({ansArr:this.data.ansArr})
    console.log(this.data.ansArr)
  },
  //问答热门列表 跳转至详情
  toDetailFn(e) {
    let tok = my.getStorageSync({ key: 'token' })
    let index=e.currentTarget.dataset['index'];
    let id = this.data.ansArr[index].lists.id
    if (tok.data){
      my.navigateTo({ url: '/pages/circledetail/circledetail?id='+ id})
    }else{
      this.auth(3,id)
    }
  },
  //点击城市选择
  toCitySel() {
    my.chooseCity({
      showLocatedCity: true,
      showHotCities: true,
      hotCities: this.data.hotCity,
      success: (res) => {
        this.setData({
          city:res.city,
          cityAdcode:res.adCode,
        })
      },
    });
  },
  //热门城市
  async _queryAllValidHotCity() {
    let result = await queryAllValidHotCity()
    // console.log('hotct',result)
    let hot = result.data.data
    for(let i=0;i<hot.length;i++){
      let newL = {}
      newL.city = hot[i].cityName
      newL.adCode = hot[i].cityCode
      this.data.hotCity.push(newL)
    }
    this.setData({hotCity:this.data.hotCity})
  },
  //to 搜索页面
  toSearch() {
    let tok = my.getStorageSync({ key: 'token' })
    if (tok.data){
      my.navigateTo({ url: '/pages/search/search?city='+this.data.city +'&cityAdcode='+this.data.cityAdcode})
    }else{
      this.auth(4)
    }
  },
  //to 个人主页
  toPersonal(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.ansArr[index].lists.accountId
    let tok = my.getStorageSync({ key: 'token' })
    if (tok.data){
      my.navigateTo({ url: '/pages/personalpage/personalpage?id=' +id})
    }else{
      this.auth(5,id)
    }
  },

  onReachBottom(e) {
    if (this.data.pages>this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
      }, () => {
        this._queryQuestionAnwserPage()
      })
    }else{
      this.setData({showbtline:true})
    }
  },

  

});
