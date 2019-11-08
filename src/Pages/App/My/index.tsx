import * as React from "react";
import "./index.scss";
import routeAnimation from "../../../Config/animation/route-animation";
import { Toast } from "antd-mobile";
import DirectionAuth from "../../../Components/DirecttionAuth";
enum FavoutiteEnum {
  Goods,
  Shop,
}

@withRouter
const MyPage = routeAnimation(
  class MyPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        nickname: "",
        user_id: "",
      };
    }
    public render() {
      const { nickname, user_id } = this.state;
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
              <div className="user-name">用户: {nickname || "游客"}</div>
            </div>
            <div
              className="mypage-head-setting"
              onClick={() => this.handleSettingClick()}
            >
              <span>去{user_id ? "设置" : "登录"}</span>
              <span className="setting"></span>
            </div>
          </div>
          <div className="mypage-body-wrap">
            {/* 个人资产 */}
            <div className="mypage-goods-wrap body-item">
              <DirectionAuth classname={"body-item-row"}>
                <div className="body-item-row">
                  <span className="icon goods-pay"></span>
                  <span className="txt">待付款</span>
                </div>
              </DirectionAuth>

              <DirectionAuth classname={"body-item-row"}>
                {" "}
                <div className="body-item-row">
                  <span className="icon goods-send"></span>
                  <span className="txt">待发货</span>
                </div>
              </DirectionAuth>

              <DirectionAuth classname={"body-item-row"}>
                <div className="body-item-row">
                  <span className="icon goods-receive"></span>
                  <span className="txt">待收货</span>
                </div>
              </DirectionAuth>

              <DirectionAuth classname={"body-item-row"}>
                <div className="body-item-row">
                  <span className="icon orders"></span>
                  <span className="txt">全部订单</span>
                </div>
              </DirectionAuth>
            </div>
            <div className="mypage-goods-star-wrap body-item">
              <DirectionAuth
                classname={"body-item-row"}
                onPress={() => this.goFavouritePage(FavoutiteEnum.Goods)}
              >
                <div className="body-item-row">
                  <span className="icon goods-star"></span>
                  <span className="txt">商品收藏</span>
                </div>
              </DirectionAuth>
              <DirectionAuth
                classname={"body-item-row"}
                onPress={() => this.goFavouritePage(FavoutiteEnum.Goods)}
              >
                <div className="body-item-row">
                  <span className="icon shop-star"></span>
                  <span className="txt">店铺收藏</span>
                </div>
              </DirectionAuth>
              <div className="body-item-row">
                <span className="icon">18</span>
                <span className="txt">我的足迹</span>
              </div>
            </div>
            <div className="mypage-other-wrap body-item">
              <div className="body-item-row">
                <span className="icon goods-star"></span>
                <span className="txt">我的评论</span>
              </div>
              <div className="body-item-row">
                <span className="icon shop-star"></span>
                <span className="txt">我的消息</span>
              </div>
              <div className="body-item-row">
                <span className="icon history"></span>
                <span className="txt">我的好友</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    componentDidMount() {
      const { nickname, user_id } =
        JSON.parse(localStorage.getItem("userInfo")) || {};
      console.log(user_id, "=====");
      this.setState({
        user_id: user_id,
        nickname: nickname,
      });
    }

    /**
     *
     * @param favoutiteEnumType 收藏的类型(1 商品 2 店铺)
     */
    private goFavouritePage(favoutiteType: boolean): void {
      this.props.history.push({
        pathname: "/auth/favourite",
        search: `?favoutiteType=${favoutiteType}`,
      });
    }

    private handleSettingClick(): void {
      if (this.state.user_id) {
        Toast.success("敬请期待..", 0.8);
      } else {
        this.props.history.push({
          pathname: "/auth/login",
        });
      }
    }
  },
);
export default MyPage;
