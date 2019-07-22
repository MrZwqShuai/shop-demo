import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Qs from "qs";
import { Toast } from "antd-mobile";
import rootStore from "../Store/root.store";

// import { AsyncStorage } from 'react-native';
// import { alert, DeviceStorage } from '~utils';
// import { RootStore } from '~store';
// import Toast from '~components/NewToast';

const BASE_URL = "http://localhost:8088/wqshop/";

// 添加请求拦截器
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 20,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});
// http request 拦截器
instance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // ADD 添加从Url获取userid
    // if (userid) {
    //   config.data.userid = userid;
    // }
    config.data = Qs.stringify(config.data);
    config.headers["token"] = localStorage.getItem("token");
    console.log("confighahah:", config, Qs.stringify(config.data));
    return config;
  },
  err => {
    Toast.fail("请求失败" + err.message);
    return Promise.reject(err);
  },
);

// http response 拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    console.log("response:", response);
    if (data.code !== 0) {
      console.log(data, "失败");
      if (data.code === -2) {
        // 用户无登录信息或登录信息失效
        rootStore.setLogin(false);
      }
    }
    Toast.hide();
    return response;
  },
  err => {
    if (err) {
      // RootStore.setLoading(false);
      Toast.hide();
      Toast.fail("网络出错了,请检查网络");
    }
  },
);

// 请求处理
export default instance;
