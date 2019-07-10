const app = getApp();
Component({
    data: {
    },
    props: {
        data: {
        }
    },
    didMount() {
    },
    didUpdate(prevProps, prevData) {
    },
    didUnmount() {

    },
    methods: {
      toQuestion() {
        my.navigateTo({ url: '/pages/question/question?cityAdcode='+app.cityAdcode+'&city='+app.cityName})
      },
    },
})