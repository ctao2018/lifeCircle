const app = getApp();
import {getTokenByCode,getAreaInfoByCityCode,formalTransactInstitution} from '../../config/api'

Page({
  data: {
   tabs:[],
   showBx:false,
   selindx:0,
   showbtline:false,
   cityCode:'440600',
   mnList:[],
   pages:'',
   pageNum:1,
   area:'',
   lng:'',
   lat:'',
   jwflag:0,
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
            this._formalTransactInstitution()
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
        that._formalTransactInstitution()
      },
      fail() {
        my.alert({ title: '定位失败' });
      },
    })
  },
  //获取行政区信息
  async _getAreaInfoByCityCode() {
    let result = await getAreaInfoByCityCode(this.data.cityCode)
    //console.log('行政区',result)
    if(result.data.code === 0){
      let ylist = [{lists: {id:''}, title: '全部'}]
      let list = result.data.data
      let newList = list.map((obj,index) => {
        return {
          lists:obj,
          title:obj.name
        }
      })
      ylist = ylist.concat(newList)
      this.setData({
        tabs:ylist
      })
      console.log('ylist',this.data.tabs)
    }else{
      console.log(result)
    }
  },
  //经办机构列表查询
  async _formalTransactInstitution() {
    my.showLoading({
      content: '加载中...',
      delay: 100
    });
    let result = await formalTransactInstitution({
      cityCode: this.data.cityCode,
      pageNum: this.data.pageNum,
      pageSize: 10,
      area: this.data.area,
      longitude: this.data.lng,
      latitude: this.data.lat,
      flag: this.data.jwflag
    })
    my.hideLoading()
    //console.log('经办机构',result)
    if(result.data.code === 0){
      this.setData({pages:result.data.data.pages})
      let list = result.data.data.rows
      this.data.mnList = this.data.mnList.concat(list)
      this.setData({mnList:this.data.mnList})
      console.log(this.data.mnList)
    }else{
      console.log(result)
    }
  },
  //tab点击
  handleTabClick({ index }) {
    this.setData({
      activeTab: index,
      selindx:index,
      area:this.data.tabs[index].lists.id,
      mnList:[],
      pageNum:1,
      showbtline:false,
    });
    this._formalTransactInstitution()
  },
  //tab 更多点击
  handlePlusClick() {
    this.setData({showBx:!this.data.showBx})
  },
  //关闭弹框
  closeBx() {
     this.setData({showBx:false})
  },
  //弹框 点击选择
  selTab(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      selindx:index,
      activeTab:index,
      showbtline:false,
      showBx:false,
      area:this.data.tabs[index].lists.id,
      mnList:[],
      pageNum:1,
      showbtline:false,
    })
    this._formalTransactInstitution()
  },
  //去详情
  toDetail(e) {
    let index=e.currentTarget.dataset['index'];
    let id = this.data.mnList[index].id
    my.navigateTo({ url: '/pages/networkDetail/networkDetail?id='+ id})
  },
    //去搜索
  toSearch() {
    my.navigateTo({ url: '/pages/searchZX/searchZX?pageType=managementNetwork&cityCode=' + this.data.cityCode})
  },
  onReachBottom(e) {
    if (this.data.pages>this.data.pageNum) {
      this.setData({
        pageNum: ++this.data.pageNum
      }, () => {
        this._formalTransactInstitution()
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
    this._formalTransactInstitution()
    my.stopPullDownRefresh()
  }
});
