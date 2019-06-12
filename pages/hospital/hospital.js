const app = getApp();
import {getTokenByCode,getAreaInfoByCityCode,formalFixHospitals} from '../../config/api'

Page({
  data: {
   tabs:[],
   showBx:false,
   showSX:false,
   selindx:0,
   sxindx:0,
   showbtline:false,
   cityCode:'440600',
   mnList:[],
   pages:'',
   pageNum:1,
   area:'',
   lng:'',
   lat:'',
   jwflag:0,
   sxarr:['不限', '三级', '二级', '其他'],
   qyName:'全部',
   grade:'',
   yygrade:[],
  },

  onLoad(options) {
    if(options){
      this.setData({
        cityCode:options.cityAdcode,
      })
    }
    if(app.globalQuery){
      this.setData({
        cityCode:app.globalQuery.cityAdcode,
      })
      app.globalQuery = null
    }
    app.getUrl(2,this.data.cityCode)
    this.auth()
    if(app.coordinate){
      this.setData({
        jwflag:1,
        lng:app.coordinate.lng,
        lat:app.coordinate.lat,
      })
    }else{
      this.getLocation()
    }
  },
  
  onShow() {
    this.setData({
    });
    my.hideLoading();
  },
  onReady() {
    
  },
  //认证
  auth() {
    app.getUserInfo().then(
      auth => {
        let auth_code = auth.auth_code.authCode;
        getTokenByCode({
          appClient: '',
          code: auth_code,
          identityType: 1,
          mac: '',
          registePlat: 2
        }).then(result =>{
          if(result.data.code===0){
            my.setStorage({
              key: 'token',
              data: result.data.data
            });
            this._getAreaInfoByCityCode()
            this._formalFixHospitals()
          }else{
            my.showToast({
              content: '授权失败，请重试！'
            });
          }
        })
      })
  },
  //获取当前地理位置
  getLocation() {
    var that = this;
    my.getLocation({
      success(res) {
        that.setData({
         lng:res.longitude,
         lat:res.latitude,
         jwflag:1,
        })
        app.coordinate={
          lng:res.longitude,
          lat:res.latitude,
        }
        that._formalFixHospitals()
      },
      fail() {
        my.alert({ title: '定位失败' });
      },
    })
  },
  //获取行政区信息
  async _getAreaInfoByCityCode() {
    let result = await getAreaInfoByCityCode(this.data.cityCode)
   // console.log('行政区',result)
    if(result.data.code === 0){
      let ylist = [{id:'', name: '全部'}]
      let list = result.data.data
      ylist = ylist.concat(list)
      this.setData({
        tabs:ylist
      })
      //console.log('ylist',this.data.tabs)
    }else{
      console.log(result)
    }
  },
  //列表查询
  async _formalFixHospitals() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    let result = await formalFixHospitals({
      cityCode: this.data.cityCode,
      pageNum: this.data.pageNum,
      pageSize: 10,
      area: this.data.area,
      grade: this.data.grade,
      longitude: this.data.lng,
      latitude: this.data.lat,
      flag: this.data.jwflag
    })
    my.hideLoading()
    //console.log('医院',result)
    if(result.data.code === 0){
      this.setData({pages:result.data.data.pages})
      let list = result.data.data.rows
      this.data.mnList = this.data.mnList.concat(list)
      this.setData({mnList:this.data.mnList})
      console.log(this.data.mnList)
      let gradeArr=[]
      for (let i = 0;i<this.data.mnList.length; i++) {
        gradeArr.push(this.data.mnList[i].grade.substring(0, 1))
      }
      this.setData({yygrade:gradeArr})
    }else{
      console.log(result)
    }
  },
  //点击 全部
  showTKbx() {
    this.setData({
      showBx:!this.data.showBx,
      showSX:false,
    });
  },
  //点击 筛选
  showSXbx() {
    this.setData({
      showBx:false,
      showSX:!this.data.showSX,
    })
  },
  //筛选 选择
  selSX(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      sxindx:index,
      showSX:false,
      showbtline:false,
      mnList:[],
      pageNum:1,
    })
    if(index>0){
      this.setData({
        grade:this.data.sxarr[index],
      })
    }else{
      this.setData({
        grade:'',
      })
    }
    this._formalFixHospitals()
  },
  //关闭弹框
  closeBx() {
     this.setData({showBx:false})
  },
  closeSX() {
    this.setData({showSX:false})
  },
  //区域弹框 点击选择
  selTab(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      selindx:index,
      showbtline:false,
      showBx:false,
      area:this.data.tabs[index].id,
      qyName:this.data.tabs[index].name,
      mnList:[],
      pageNum:1,
    })
    this._formalFixHospitals()
  },
  //去详情
  toDetail(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.mnList[index].id
    my.navigateTo({ url: '/pages/hospitalDetail/hospitalDetail?id='+ id})
  },
  //去搜索
  toSearch() {
    my.navigateTo({ url: '/pages/searchZX/searchZX?pageType=hospital&cityCode=' + this.data.cityCode})
  },
  onReachBottom(e) {
    if (this.data.pages>this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
      }, () => {
        this._formalFixHospitals()
      })
    }else{
      this.setData({showbtline:true})
    }
  },
  onPullDownRefresh() {
    this.setData({
      mnList:[],
      pageNum:1,
      showbtline:false,
    })
    this._formalFixHospitals()
    my.stopPullDownRefresh()
  },
  onShareAppMessage() {
    return {
      path: '/pages/hospital/hospital?cityAdcode='+this.data.cityCode
    };
  },
});
