import axios from "axios";
import { Loading } from "element-ui";
const service = axios.create({
  headers: { "content-type": "application/x-www-form-urlencoded" },
  baseURL: process.env.BASE_API, // 后台请求地址
  timeout: 5000
});

// 添加请求拦截器 header('Access-Control-Allow-Origin:*')
service.interceptors.request.use(
  config => {
    // 请求前需要做的事情，每个请求是否带用户Id
    // if (store.getters.token && getToken()) {
    //   config.headers['token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // } else if (config.url !== '/sys/login') { // 登录页面请求除外，其他的请求都要有token
    //   router.push({
    //     path: '/'
    //   })
    //   return
    // }
    let loading = Loading.service({
      fullscreen: true,
      text: "拼命加载中..."
    });
    loading.close(); // 发送请求时，加载框
    return config;
  },
  error => {
    let loading = Loading.service({
      fullscreen: true,
      text: "拼命加载中..."
    });
    loading.close();
    Promise.reject(error);
  }
);

// 返回状态判断(添加响应拦截器)
service.interceptors.response.use(
  res => {
    // if (!res.data.msg) { // 对响应数据做些事 success
    //  return Promise.reject(res.data.msg)
    // } else if (!res.data.success) { // 对响应数据做些事 success
    //  return Promise.reject(res.data.msg)
    // }
    return res;
  },
  error => {
    if (error.response.status === 404) {
      router.push({
        path: "/error/403"
      });
    }
    if (error.response.status === 500) {
      router.push({
        path: "/error/500"
      });
    }
    if (error.response.status === 502) {
      router.push({
        path: "/error/502"
      });
    }
    if (error.response.status === 403) {
      router.push({
        path: "/error/404"
      });
    }
    // 返回 response 里的错误信息
    let errorInfo = error.data.error ? error.data.error.message : error.data;
    return Promise.reject(error.data);
  }
);
export default service;
