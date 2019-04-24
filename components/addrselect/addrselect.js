const app = getApp();
import {queryChildAreaByParentId} from '../../config/api'
Component({
    data: {
      firstFg:false,
      parentId: '',
      provinces: [],
      provincesData: [],
      province: "",
      provinceID: '',
      cityID: '',
      citys: [],
      citysData: [],
      city: "",
      countys: [],
      countysData: [],
      county: '',
      value: [0, 0, 0],
      values: [0, 0, 0],
      cityData: "",
    },
    props: {
        data: {
        }
    },
    didMount() {
      this._queryChildAreaByParentId()
    },
    didUpdate(prevProps, prevData) {
    },
    didUnmount() {
      
    },
    methods: {
      async _queryChildAreaByParentId() {
       let result = await queryChildAreaByParentId({
          parentId:this.data.parentId,
        })
        //console.log('city',result)
        let citydata = result.data.data
        let provinces = []
        let citys = []
        if(result.data.code ===0){
          if(!this.data.parentId){
            for (let i = 0; i < citydata.length; i++) {
              provinces.push(citydata[i].name);
            }
            this.setData({
              provinces: provinces,
              provincesData:citydata,
              parentId: citydata[0].id,
              province:provinces[0]
            })
            if(!this.data.firstFg){
              this._queryChildAreaByParentId()
              this.setData({firstFg:true})
            }
          }else{
            for (let i = 0; i < citydata.length; i++) {
              citys.push(citydata[i].name);
            }
            this.setData({
              citys: citys,
              citysData:citydata,
              city:citys[0],
            })
          }
        }
      },
      async selProvince() {
       let result = await queryChildAreaByParentId({
          parentId:this.data.provinceID,
        })
          let listdata = result.data.data
          let citys = []
          if(result.data.code ===0){
            for (let i = 0; i < listdata.length; i++) {
              citys.push(listdata[i].name);
            }
            this.setData({
              citys: citys,
              citysData:listdata,
              cityID:listdata[0].id,
              city:citys[0],
            })
            this.selCity()
          }
      },
      async selCity() {
       let result = await queryChildAreaByParentId({
          parentId:this.data.cityID,
        })
          let listdata = result.data.data
          let countys = []
          if(result.data.code ===0){
            for (let i = 0; i < listdata.length; i++) {
              countys.push(listdata[i].name);
            }
            this.setData({
              countys: countys,
              countysData:listdata,
               county: countys[0]
            })
          }
      },
     onChange(e) {
        //console.log(e)
        let val = e.detail.value
        let t = this.data.values;
        if (val[0] != t[0]) {
          this.setData({
            province: this.data.provinces[val[0]],
            provinceID:this.data.provincesData[val[0]].id,
            citys: [],
            citysData:[],
            county: [],
            countys: [],
            values: val,
            value: [val[0], 0, 0]
          })
          this.selProvince()
          return;
        }
        if (val[1] != t[1]) {
          this.setData({
            cityID:this.data.citysData[val[1]].id,
            city: this.data.citys[val[1]],
            county: [],
            countys: [],
            values: val,
            value: [val[0], val[1], 0]
          })
          this.selCity()
          return;
        }
        if (val[2] != t[2]) {
          this.setData({
            county: this.data.countys[val[2]],
            values: val
          })
          return;
        }
      },
    handleOk() {
      let address=[this.data.province,this.data.city,this.data.county];
      this.props.onChange(address)
    },
    handleNo() {
      this.props.onChange()
    }
    },
})