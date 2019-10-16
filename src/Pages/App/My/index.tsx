import * as React from "react";
import "./index.scss";
import routeAnimation from "../../../Config/animation/route-animation";
const MyPage = routeAnimation(
  class MyPage extends React.Component {
    public render() {
      return (
        <div className="mypage-wrap">
          <div className="mypage-head-wrap">
            <div className="user-info">
              <div className="user-avatar">
                <img
                  src="https://img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png"
                  alt=""
                />
              </div>
              <div className="user-name">用户: 张文强</div>
            </div>
            <div className="mypage-head-setting">去设置</div>
          </div>
          <div className="mypage-body-wrap">
            {/* 个人资产 */}
            <div className="mypage-goods-wrap body-item">
              <div className="body-item-row">
                <span className="icon goods-pay"></span>
                <span className="txt">待付款</span>
              </div>
              <div className="body-item-row">
                <span className="icon goods-send"></span>
                <span className="txt">待发货</span>
              </div>
              <div className="body-item-row">
                <span className="icon goods-receive"></span>
                <span className="txt">待收货</span>
              </div>
              <div className="body-item-row">
                <span className="icon orders"></span>
                <span className="txt">全部订单</span>
              </div>
            </div>
            <div className="mypage-goods-star-wrap body-item">
              <div className="body-item-row">
                <span className="icon goods-star"></span>
                <span className="txt">商品收藏</span>
              </div>
              <div className="body-item-row">
                <span className="icon shop-star"></span>
                <span className="txt">店铺收藏</span>
              </div>
              <div className="body-item-row">
                <span className="icon">18</span>
                <span className="txt">我的足迹</span>
              </div>
            </div>
            <div className="mypage-other-wrap body-item">
              <div className="body-item-row">
                <span className="icon goods-star"></span>
                <span className="txt">商品收藏</span>
              </div>
              <div className="body-item-row">
                <span className="icon shop-star"></span>
                <span className="txt">店铺收藏</span>
              </div>
              <div className="body-item-row">
                <span className="icon history"></span>
                <span className="txt">我的足迹</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  },
);
export default MyPage;
