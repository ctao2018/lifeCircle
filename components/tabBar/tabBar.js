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
      toFirstpage() {
        console.log('11')
        my.switchTab({url: '/pages/index/index'})
      },
      toKK() {
        my.switchTab({url: '/pages/circle/circle'})
      },
      toMall() {
        my.switchTab({url: '/pages/mall/mall'})
      },
      toMy() {
        my.switchTab({url: '/pages/my/my'})
      },
    },
})