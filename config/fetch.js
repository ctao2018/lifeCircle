const app = getApp();
import api from './api.js'
import env from './env'

const request = (
    url = "",
    data = {},
    method = "get",
    headers = {
        'Content-Type': 'application/json',
    },
) => new Promise((resolve, reject) => {

    const token = my.getStorageSync({ key: "token" });

    if (token.data) {
        headers['Authorization'] = token.data
        // headers['XWS-TOKEN'] = authInfo.data['XWS-TOKEN']
    }

    my.request({
        url: env.base_url_dev + url,
        data,
        method,
        headers,
        success: res => {
           // console.log(res);
            if (res.data.status === 200){
              if (res.data.code === 40301) {
                app.getUserInfo().then(
                  auth => {
                      console.log(auth)
                      let auth_code = auth.auth_code.authCode;
                      api.getTokenByCode({
                        appClient: '',
                        code: auth_code,
                        identityType: 1,
                        mac: '',
                        registePlat: 2
                      }).then(result =>{
                        console.log('index',result)
                        my.setStorage({
                          key: 'token',
                          data: result.data.data
                        });
                      })
                  }
                );
              } else{
                resolve(res);
              }
            } else {
              reject('请求失败')
              return;
            }
        },
        fail: res => {
            my.showToast({
                type: "exception",
                content: '请求失败',
                duration: 1000
            })
            reject('请求失败')
        },
        complete() {
            // my.hideLoading()
            // return reject('complete')
        }
    })
});


export default request;