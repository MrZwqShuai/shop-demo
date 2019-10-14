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
            <div className="mypage-cash-wrap">我的资产</div>
            <div className="mypage-goods-star-wrap">
              <div>商品收藏</div>
              <div>店铺收藏</div>
              <div>我的足迹</div>
            </div>
            <div className="mypage-other-wrap">我的预约</div>
          </div>
        </div>
      );
    }
  },
);
export default MyPage;
