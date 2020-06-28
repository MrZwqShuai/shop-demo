import fetch from "../Utils/http";
import { AxiosPromise } from "axios";
import { Result } from "../Interface";
import { registry, login } from "./user";
/**
 * 获取用户登录状态
 */
export const fetchAppAuth = <T>(data: object): AxiosPromise<Result<void>> => {
  return fetch({
    url: "/app",
    method: "get",
    params: data,
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
 * 用户收藏列表
 * @param data
 */
export const fetchGoodsStarsByUserId = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "auth/findGoodsStarsByUserId",
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

/**
 * 用户购物车添加
 * @param data
 */
export const addOrderCartByUser = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "ordercart/add",
    method: "post",
    params: data,
  });
};

/**
 * 用户头像上传
 */
export const uploadAvatar = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "auth/upload/avatar",
    method: "post",
    data: data,
  });
};

/**
 * 修改个人用户信息
 * @param data
 */
export const updatePersonalInfo = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "setting/user/updatePersonalInfo",
    method: "post",
    params: data,
  });
};

// 个人设置-收货地址管理接口

/**
 * 用户的收货地址列表
 * @param data
 */
export const userShoppingAddressList = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "setting/user/address/list",
    method: "get",
    params: data,
  });
};

/**
 * 新增收货地址
 * @param data
 */
export const addUserShoppingAddress = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "setting/user/address/add",
    method: "post",
    params: data,
  });
};

/**
 * 编辑收货地址
 * @param data
 */
export const editUserShoppingAddress = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "setting/user/address/edit",
    method: "post",
    params: data,
  });
};

/**
 * 删除收货地址
 * @param data
 */
export const removeUserShoppingAddress = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "setting/user/address/remove",
    method: "post",
    params: data,
  });
};

/**
 * 收货地址详情
 * @param {number} userShoppingAddressId 收货地址主键id
 */
export const userShoppingAddressDetail = <T>(
  userShoppingAddressId: number,
): AxiosPromise<Result<T>> => {
  return fetch({
    url: `setting/user/address/${userShoppingAddressId}`,
    method: "get",
    params: {},
  });
};

// system dictionary 字典接口
/**
 * 字典接口
 */
export const getDictionaries = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "sys/dic",
    method: "get",
    params: data,
  });
};

/**
 * 新增收货地址字典接口
 */
export const addCustomDictionaries = <T>(data): AxiosPromise<Result<T>> => {
  return fetch({
    url: "sys/dic/add",
    method: "get",
    params: data,
  });
};

export { registry, login };
