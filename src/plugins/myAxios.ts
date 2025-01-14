import axios from "axios";
import {notification} from "ant-design-vue";

/**
 *    @author 超
 *    封装自己的 axios 请求
 */

const myAxios = axios.create({
      // baseURL: 'http://localhost:8080/api',
      baseURL: '/api'
})

//允许跨域请求时携带身份凭证。
myAxios.defaults.withCredentials = true;

myAxios.interceptors.request.use(function (config) {
          console.log("开始发送请求")
          return config
    }, function (error: any) {
          return Promise.reject(error);
    }
)
myAxios.interceptors.response.use(function (response) {
          //todo 定义错误码
          if (response?.data?.code === 200) {
                notification['warning']({
                      message: "警告",
                      description: "未登录，使用功能请登录！"
                })
          }
          return response.data
    },
    function (error: any) {
          return Promise.reject(error);
    }
)

export default myAxios;