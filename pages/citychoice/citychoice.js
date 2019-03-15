const app = getApp();
import {queryAllValidHotCity,queryAllOpenCityInfoByPinYin} from '../../config/api'

Page({
  data: {
    city:'佛山市',
    cityAdcode:'440600',
    serValue:'',
    temABC: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    hotList:[],
    selCode:'',
    selName:'',
    cityList:[],
  },

  onLoad() {
    this.setData({
      hotList:[],
      selCode:'',
      selName:'',
      cityList:[],
    })
    this.getLocation()
    this._queryAllValidHotCity()
    this._queryAllOpenCityInfoByPinYin()
  },
  onShow() {
  
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
  //输入框搜索
  searchCt(e) {
    this.setData({
      serValue: e.detail.value,
    });
    console.log(e)
  },
  //点击热门城市
  clickHot(e) {
    let index=e.currentTarget.dataset['index'];
    this.setData({
      selCode:this.data.hotList[index].cityCode,
      selName:this.data.hotList[index].cityName,
    })
  },
  //热门城市
  async _queryAllValidHotCity() {
    let result = await queryAllValidHotCity()
    //console.log('hotct',result)
    let hot = result.data.data
    this.setData({hotList:hot})
  },
  //城市列表
  async _queryAllOpenCityInfoByPinYin() {
    let result = await queryAllOpenCityInfoByPinYin()
    console.log('list',result)
    let cityL = result.data.data
    this.setData({cityList:cityL})
  },
});
