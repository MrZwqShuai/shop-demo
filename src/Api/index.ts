import fetch from "../Utils/http";
import { AxiosPromise } from "axios";
import { Result } from "../Interface";

/**
 * 获取app的登录状态
 */
export const fetchAppAuth = (): AxiosPromise<Result<void>> => {
  return fetch({
    url: "/app",
    method: "get",
  });
};

/**
 * 获取首页banner
 * @param data
 */
export const fetchHomeBanner = <T>(data: object): AxiosPromise<T> => {
  return fetch({
    url: "/home/banner",
    method: "get",
    data: data,
  });
};

/**
 * 获取首页导航nav
 * @param data
 */
export const fetchHomeNavBar = <T>(data: T): AxiosPromise => {
  return fetch({
    url: "",
    method: "get",
    data: data,
  });
};

/**
 *
 * @param data 商品分类id 不传查找所有商品s
 */
export const fetchGoods = (data?: object): AxiosPromise => {
  return fetch({
    url: "/goods",
    method: "get",
    params: data,
  });
};

/**
 * 用户登陆
 * @returns token值
 */
export const login = (data?: object): AxiosPromise<Result<string | number>> => {
  return fetch({
    url: "/auth/login",
    method: "post",
    data,
  });
};

/**
 * 获取一级分类所有列表（这个后期是固定的长度）
 */
export const fetchCategoryLit = <T>(): AxiosPromise<Result<T>> => {
  return fetch({
    url: "/category/list",
    method: "get",
  });
};

/**
 * 通过一级分类的id获取子类及其子子类的列表
 * @param data
 */
export const fetchCategoryGrandsonLit = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "/category",
    method: "get",
    params: data,
  });
};

/**
 * 通过属性筛选商品列表
 * @param data
 */
export const sortGoods = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "goods/sortBy",
    method: "get",
    params: data,
  });
};

/**
 * 获取商品详情
 * @param data
 */
export const fetchGoodsDetail = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "goods/detail",
    method: "get",
    params: data,
  });
};

/**
 * 用户收藏商品
 * @param data
 */
export const starGoodsByUser = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "auth/starGoodsByUserId",
    method: "get",
    params: data,
  });
};

/**
 * 用户购物车列表
 * @param data
 */
export const fetchOrderCartListByUser = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "ordercart/list",
    method: "get",
    params: data,
  });
};


/**
 * 用户购物车删除
 * @param data
 */
export const removeOrderCartByUser = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "ordercart/remove",
    method: "post",
    params: data,
  });
};
