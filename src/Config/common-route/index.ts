// 控制公共头部底部的配置
const hideHeaderPath: Array<String> = ["/channel", "/cart", "/my"];
const hideFooterPath: Array<String> = [];
const routesMap = {
  "/channel": "分类",
  "/cart": "购物车",
  "/my": "个人中心",
  "/setting": "账号管理",
};
export { hideHeaderPath, hideFooterPath, routesMap };
