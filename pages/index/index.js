const app = getApp();
import {getTokenByCode,getCategory,getMenu,queryOpenCityValidModuleInfoByParam,
queryAllHotspotCarousel,queryQuestionAnwserPage,queryAllValidHotCity,
queryNewsChildrenCatalogTreeByParam,queryFNewsInfoPage} from '../../config/api'
import env from '../../config/env'

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
    pagesNews:'',
    ansArr:[],
    newsArr:[],
    isHot:'',
    showbtline:false,
    hotCity:[],
    token:'',
    newstapindx:0,
    // typeArr:[{name:'问答',catalogNo:'',children:[]}], //0515改版
    typeArr:[],
    typeNews:[],
    showtyNews:false,
    catalogNo:'hot',
    cdFalg:false,
  },

  onLoad() {
   this._getCategory()
   this._getMenu()
   this.getLocation()
   this._queryAllHotspotCarousel()
   this._queryQuestionAnwserPage()
   this._queryAllValidHotCity()
   this._queryNewsChildrenCatalogTreeByParam()
   this._queryFNewsInfoPage()
  },
  onShow() {
    this.setData({
      // ansArr:[],
      // newsArr:[],
      // pageNum:1,
      // pages:'',
      // pagesNews:'',
      // showbtline:false,
      // hotCity:[],
      // typeArr:[{name:'全部',catalogNo:'',children:[]}],
      // typeNews:[],
      // showtyNews:false,
      // currentTabsIndex:0,
      // catalogNo:'',
      // newstapindx:0,
      })
    //this._queryQuestionAnwserPage()

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
        app.cityAdcode = res.cityAdcode;
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
            }else if(type === 7){
              this.hotJump(id)
            }else if(type === 8){
              this.categoryJump(id)
            }else if(type === 9) {
              my.navigateTo({ url: '/pages/newsdetail/newsdetail?id='+ id})
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
   if(cat.length>0){
     for(let i=0;i<cat.length;i++){
      imgUrl.push(cat[i].pictureUrl)
    }
    this.setData({banner:imgUrl})
   }
  },
  //菜单列表
  async _getMenu() {
    let result = await getMenu()
   console.log('getMenu',result)
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
  //栏目列表
  async _queryNewsChildrenCatalogTreeByParam() {
    let result = await queryNewsChildrenCatalogTreeByParam({
      siteNo:'news'
    })
    //console.log('queryNewsChildrenCatalogTreeByParam',result)
    let list = result.data.data
    //this.data.typeArr = this.data.typeArr.concat(list) //0515改版
    this.setData({
      //typeArr:this.data.typeArr, //0515改版
      typeArr:list,
    })
    for(let i =0;i<this.data.typeArr.length;i++){
      if(this.data.typeArr[i].children.length>0){
        this.setData({typeNews:this.data.typeArr[i].children})
      }
    }
  },
  // tab点击切换
  tabClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      currentTabsIndex:index,
      showbtline:false,
    })
    if(this.data.typeArr[index].children.length>0){
        this.setData({
          typeNews:this.data.typeArr[index].children,
          showtyNews:true,
          catalogNo:this.data.typeArr[index].children[0].catalogNo,
          newstapindx:0,
          })
    }else{
      this.setData({
        typeNews:[],
        showtyNews:false,
        catalogNo:this.data.typeArr[index].catalogNo,
        })
    }
    this.setData({
      pageNum:1,
      ansArr:[],
      pagesNews:'',
      pages:'',
      newsArr:[],
    })
    this._queryFNewsInfoPage()
    // if(index === 1 || index === 2){  //0515改版
    //   if(this.data.typeArr[index].children.length>0){
    //     this.setData({
    //       typeNews:this.data.typeArr[index].children,
    //       showtyNews:true,
    //       catalogNo:this.data.typeArr[index].children[0].catalogNo,
    //       newstapindx:0,
    //       })
    //   }else{
    //     this.setData({
    //       typeNews:[],
    //       showtyNews:false,
    //       catalogNo:this.data.typeArr[index].catalogNo,
    //       })
    //   }
    //   this.setData({
    //     pageNum:1,
    //     ansArr:[],
    //     pagesNews:'',
    //     pages:'',
    //     newsArr:[],
    //   })
    //   this._queryFNewsInfoPage()
    // }else{
    //   this.setData({
    //     pageNum:1,
    //     ansArr:[],
    //     isHot:'',
    //     showtyNews:false,
    //     newsArr:[],
    //   })
    //   this._queryQuestionAnwserPage()
    // }
  },
  //新闻二级菜单 点击
  newsClick(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      newstapindx:index,
      showbtline:false,
      catalogNo:this.data.typeNews[index].catalogNo,
      newsArr:[],
      pagesNews:'',
      pageNum:1,
    })
    this._queryFNewsInfoPage()
  },
  //新闻政策列表
  async _queryFNewsInfoPage() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    const result = await queryFNewsInfoPage({
      pageNum: this.data.pageNum,
      pageSize: 10,
      catalogNo: this.data.catalogNo,
    })
    //console.log('news',result)
    my.hideLoading()
    this.setData({pagesNews:result.data.data.pages})
    let list = result.data.data.rows
    this.data.newsArr = this.data.newsArr.concat(list)
    this.setData({newsArr:this.data.newsArr})
    //console.log('newsArr',this.data.newsArr)
  },
  //点击轮播图跳转
  goToLinkPage(e) {
    //console.log(e);
    let indx = e.currentTarget.dataset.index
    if (app.auth_info){
      this.categoryJump(indx)
    }else{
      this.auth(8,indx)
    }
  },
  //轮播 跳转
  categoryJump(indx) {
    if(this.data.category[indx].isJump === 'Y'){
      if(this.data.category[indx].type === '1'){
        app.webViewUrl = this.data.category[indx].linkUrl
        my.navigateTo({ url: '/pages/webview/webview'})
      } else if(this.data.category[indx].type === '2'){
        my.navigateTo({ url: this.data.category[indx].linkUrl})
      } else if(this.data.category[indx].type === '3'){
        let url = this.data.category[indx].linkUrl
        my.ap.navigateToAlipayPage({
          path: url,
        })
      }
    }
  },
  //热点滚动 点击跳转
  hotLinkPage(e) {
    let indx = e.currentTarget.dataset.index
    if (app.auth_info){
      this.hotJump(indx)
    }else{
      this.auth(7,indx)
    }
  },
  //热点滚动跳转
  hotJump(indx) {
    if(this.data.hotList[indx].type === '1'){
      app.webViewUrl = this.data.hotList[indx].linkUrl
      my.navigateTo({ url: '/pages/webview/webview'})
    } else if(this.data.hotList[indx].type === '2'){
      my.navigateTo({ url: this.data.hotList[indx].linkUrl})
    } else if(this.data.hotList[indx].type === '3'){
      let url = this.data.hotList[indx].linkUrl
      my.ap.navigateToAlipayPage({
        path: url,
      })
    }
  },
  //菜单栏 点击跳转
  menuListClick(e) {
    //console.log(e)
    //console.log(this.data.cityAdcode)
    let indx = e.currentTarget.dataset.index
    if(this.data.menuList[indx].type === '0'){
      this.setData({cdFalg:false,})
      let moduleEn = this.data.menuList[indx].moduleEn
      let tok = my.getStorageSync({ key: 'token' })
      if (app.auth_info){
        this._queryOpenCityValidModuleInfoByParam(moduleEn)
      }else{
        this.auth(6,moduleEn)
      }
    } else if(this.data.menuList[indx].type === '1'){
      app.webViewUrl = this.data.menuList[indx].linkUrl
      my.navigateTo({ url: '/pages/webview/webview'})
    } else if(this.data.menuList[indx].type === '2'){
      let url = this.data.menuList[indx].linkUrl
      my.navigateTo({ url: url})
    } else if(this.data.menuList[indx].type === '3'){
      let url = this.data.menuList[indx].linkUrl
      if(url){
        my.showToast({
          content: '本服务由支付宝城市服务提供',
          duration: 1500,
          success: () => {
            my.ap.navigateToAlipayPage({
              path: url,
            })
          },
        });
      }else{
        my.showToast({
          content: '该城市暂未开通此服务！',
          duration: 1500,
        });
      }
      
    } else if(this.data.menuList[indx].type === '4'){
      this.setData({cdFalg:true,})
      let moduleEn = this.data.menuList[indx].moduleEn
      if (app.auth_info){
        this._queryOpenCityValidModuleInfoByParam(moduleEn)
      }else{
        this.auth(6,moduleEn)
      }
    }
  },
  //判断城市开通模块
  async _queryOpenCityValidModuleInfoByParam(moduleEn) {
   // console.log('111',this.data.cityAdcode)
    let result = await queryOpenCityValidModuleInfoByParam({
      cityCode: this.data.cityAdcode,
      moduleEn: moduleEn
    })
    //console.log('城市开通模块',result)
    if(result.data.code ===0){
      if(result.data.data.length>0){
        let url = result.data.data[0].moduleUrl
        //console.log(url)
        if(this.data.cdFalg){
          if(url){
            my.showToast({
              content: '本服务由支付宝城市服务提供',
              duration: 1500,
              success: () => {
                my.ap.navigateToAlipayPage({
                  path: url,
                })
              },
            });
          }else{
            my.showToast({
              content: '该城市暂未开通此服务！',
              duration: 1500,
            });
          }
        }else{
          // let tok = my.getStorageSync({ key: 'token' })
          // let newurl = env.jump_url + '?toUrl=' + url + '?tok=' + tok.data
          // //console.log(newurl)
          // app.webViewUrl = newurl
          // //app.webViewUrl = url + '?tok=' + tok.data
          // my.navigateTo({ url: '/pages/webview/webview'})
          if(moduleEn === 'fixHospitals'){
            my.navigateTo({ url: '/pages/hospital/hospital?cityAdcode='+this.data.cityAdcode})
          }else if(moduleEn === 'fixDrugstore'){
            my.navigateTo({ url: '/pages/drugstore/drugstore?cityAdcode='+this.data.cityAdcode})
          }else if(moduleEn === 'insuraceDrugs'){
            my.navigateTo({ url: '/pages/drugs/drugs?cityAdcode='+this.data.cityAdcode})
          }else if(moduleEn === 'transactInstitution'){
            my.navigateTo({ url: '/pages/managementNetwork/managementNetwork?cityAdcode='+this.data.cityAdcode})
          }else if(moduleEn === 'businessGuide'){
            my.navigateTo({ url: '/pages/businessGuide/businessGuide?cityAdcode='+this.data.cityAdcode})
          }else if(moduleEn === 'commonQuestion'){
            my.navigateTo({ url: '/pages/commonProblem/commonProblem?cityAdcode='+this.data.cityAdcode})
          }
        }
      }else{
        my.showToast({
          content: '该城市暂未开通此服务！'
        });
      }
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
    //console.log('ansArr',this.data.ansArr)
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
  //新闻 至详情
  toNewsDetail(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.newsArr[index].id
    if (app.auth_info){
      my.navigateTo({ url: '/pages/newsdetail/newsdetail?id='+ id})
    }else{
      this.auth(9,id)
    }
  },
  //点击城市选择
  toCitySel() {
    my.chooseCity({
      showLocatedCity: true,
      showHotCities: true,
      hotCities: this.data.hotCity,
      success: (res) => {
        //console.log('城市',res)
        this.setData({
          city:res.city,
          cityAdcode:res.adCode,
        })
        app.cityAdcode = res.adCode;
        if(res.adCode === '110100'){
          this.setData({cityAdcode:110000})
          app.cityAdcode = '110000'
        }else if(res.adCode === '120100'){
          this.setData({cityAdcode:120000})
          app.cityAdcode = '120100'
        }else if(res.adCode === '310100'){
          this.setData({cityAdcode:310000})
          app.cityAdcode = '310100'
        }else if(res.adCode === '500100'){
          this.setData({cityAdcode:500000})
          app.cityAdcode = '500100'
        }
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
    if(this.data.currentTabsIndex<0){ //0515改版 把1改为了0
      if (this.data.pages>this.data.pageNum) {
        this.setData({
          pageNum: ++this.data.pageNum
        }, () => {
          this._queryQuestionAnwserPage()
        })
      }else{
        this.setData({showbtline:true})
      }
    }else{
      if (this.data.pagesNews>this.data.pageNum) {
        this.setData({
          pageNum: ++this.data.pageNum
        }, () => {
          this._queryFNewsInfoPage()
        })
      }else{
        this.setData({showbtline:true})
      }
    }
    
  },
  onPullDownRefresh() {
    this.setData({
      banner: [],
      hotTit:[],
      hotList:[],
      category:[],
      menuList:[],
      currentTabsIndex:0,
      editFlag:false,
      pageNum:1,
      pages:'',
      pagesNews:'',
      ansArr:[],
      newsArr:[],
      isHot:'',
      showbtline:false,
      hotCity:[],
      token:'',
      newstapindx:0,
      // typeArr:[{name:'问答',catalogNo:'',children:[]}],0515改版
      typeArr:[],
      typeNews:[],
      showtyNews:false,
      catalogNo:'hot',
      cdFalg:false,
    })
    this._getCategory()
    this._getMenu()
    this.getLocation()
    this._queryAllHotspotCarousel()
    this._queryQuestionAnwserPage()
    this._queryAllValidHotCity()
    this._queryNewsChildrenCatalogTreeByParam()
    my.stopPullDownRefresh()
    this._queryFNewsInfoPage()
  },
  
  //测试跳转 需删除
  testaaa() {
    //my.navigateTo({ url: '/pages/managementNetwork/managementNetwork?cityAdcode='+this.data.cityAdcode})
    //my.navigateTo({ url: '/pages/hospital/hospital?cityAdcode='+this.data.cityAdcode})
    //my.navigateTo({ url: '/pages/drugstore/drugstore?cityAdcode='+this.data.cityAdcode})
    //my.navigateTo({ url: '/pages/commonProblem/commonProblem?cityAdcode='+this.data.cityAdcode})
    //my.navigateTo({ url: '/pages/businessGuide/businessGuide?cityAdcode='+this.data.cityAdcode})
    //my.navigateTo({ url: '/pages/drugs/drugs?cityAdcode='+this.data.cityAdcode})
    //my.navigateTo({ url: '/pages/errorCorrection/errorCorrection'})
    app.webViewUrl = 'https://test.szyibei.com/sbjccx/firstPage/'
    //app.webViewUrl ='https://medicalinsprod.alipay-eco.com/medicalinsprod/unitycontroller/entrance?channelno=SZHRSS'
    my.navigateTo({ url: '/pages/webview/webview'})
  }

});
