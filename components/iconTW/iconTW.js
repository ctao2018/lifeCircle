const app = getApp();
Component({
    data: {
    },
    props: {
        data: {
          styleF:false,
          zxpage:false,
        },
        changestyle:'',
        showconf:'',
    },
    didMount() {
      if(this.props.changestyle === 'true'){
        this.setData({styleF:true})
      }
      if(this.props.showconf === 'true'){
        this.setData({zxpage:true})
      }
    },
    didUpdate(prevProps, prevData) {
    },
    didUnmount() {

    },
    methods: {
      toQuestion() {
        if(this.data.zxpage){
          my.navigateTo({ url: '/pages/question/question?cityAdcode='+app.cityAdcode+'&city='+app.cityName+'&nocont=true'})
        }else{
          my.navigateTo({ url: '/pages/question/question?cityAdcode='+app.cityAdcode+'&city='+app.cityName})
        }
      },
    },
})