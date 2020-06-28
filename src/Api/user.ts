import fetch from "../Utils/http";
import { AxiosPromise } from "axios";
import { Result } from "../Interface";
/**
 * 用户注册
 * @returns void
 */
export const registry = (
  data?: object,
): AxiosPromise<Result<string | number>> => {
  return fetch({
    url: "/auth/registry",
    method: "post",
    data,
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
