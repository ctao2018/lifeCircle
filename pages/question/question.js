const app = getApp();
import {queryAllValidHotCity,queryAllValidQuestionCategory,addQuestionByUser} from '../../config/api'

Page({
  data: {
    city:'佛山市',
    cityAdcode:'440600',
    selFlag:false,
    indexType: 0,
    title:'',
    textarea:'',
    hotCity:[],
    typeArr:[],
    categoryNo:'',
  },

  onLoad() {
    this.getLocation()
    this._queryAllValidHotCity()
    this._queryAllValidQuestionCategory()
  },
  onShow() {
    this.setData({hotCity:[],})
  },
  onReady() {
    
  },
  //获取当前地理位置
  getLocation() {
    var that = this;
    my.getLocation({
      type: 1,
      success(res) {
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
  //选择类型
  bindPickerChange(e) {
    this.setData({
      indexType: e.detail.value,
      categoryNo:this.data.typeArr[e.detail.value].categoryNo
    });
  },
  //获取title
  getTit(e) {
    this.setData({
      title: e.detail.value,
    });
    if(e.detail.value.length>3){
      this.setData({selFlag:true})
    }else{
       my.showToast({
        content: '标题不能少于4个字!'
      });
      this.setData({selFlag:false})
    }
  },
  //点击发布按钮
  fabu(e) {
    this.setData({textarea:e.detail.value.textarea})
    if(this.data.selFlag){
      if(this.data.title.length>3){
        this._addQuestionByUser()
      }else{
        my.showToast({
          content: '标题不能少于4个字!'
        });
      }
    }
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
  //问题分类
  async _queryAllValidQuestionCategory() {
    let result = await queryAllValidQuestionCategory()
    let cat = result.data.data
    this.data.typeArr = this.data.typeArr.concat(cat)
    this.setData({
      typeArr:this.data.typeArr,
      categoryNo:this.data.typeArr[0].categoryNo
      })
    //console.log('Category',this.data.typeArr,this.data.categoryNo)
  },
  //发布
  async _addQuestionByUser() {
    let result = await addQuestionByUser({
    category: this.data.categoryNo,
    cityCode:this.data.cityAdcode,
    description:this.data.textarea,
    title:this.data.title
  })
    console.log(result)
    if(result.data.code === 0){
      my.showToast({
        content: result.data.message,
        success: () => {
         my.switchTab({url: 'pages/index/index'})
        },
      });
    }else{
      my.showToast({
        content: result.data.message
      });
    }
  },
});
