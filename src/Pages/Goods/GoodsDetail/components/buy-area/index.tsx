import * as React from "react";
import { inject, observer } from "mobx-react";
import qs from "qs";
import "./index.scss";
import arrowRight from "../../../../../Assets/images/arrow-right.png";
import { GoodsSpuDetail } from "../../../../../Interface/goods";
import { withRouter } from "react-router-dom";
import { starGoodsByUser } from "../../../../../Api";
import { toJS } from "mobx";
import { Toast } from "antd-mobile";
import MyCell from "../../../../../Components/MyCell";
import DirectionAuth from "../../../../../Components/DirecttionAuth";
interface Props {
  goodsId?: string;
  goodsSpuDetail: GoodsSpuDetail;
}
interface State {
  followed: number;
}

@inject("RootStore", "ModalStore")
@withRouter
@observer
export default class BuyAreaComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      followed: 0,
    };
  }

  public render() {
    const { skuViewVal, addressVal } = this.props.ModalStore;
    const { goodsSpuDetail } = this.props;
    return (
      <div className="buy-area-wrapper ">
        <div className="goods-wrap m1">
          <div className="goods-name">
            {goodsSpuDetail.goods_name || "未知商品"}
          </div>
          <span className="goods-line" />
          <div
            className="goods-star"
            onClick={() => {
              this.follow(this.props.goodsId);
            }}
          >
            <span
              className={`goods-star-icon ${
                this.state.followed == 1 ? "star-active" : null
              }`}
            />
            <span>关注</span>
          </div>
        </div>
        <div className="goods-price m1">
          <span className="price-prefix">￥</span>
          <em className="price-">{goodsSpuDetail.price}</em>
          <span>.00</span>
        </div>
        <div className="goods-sku m1">
          {this.renderCell("已选", skuViewVal, "CART")}
        </div>
        {/* <div className="goods-sku m1">
          {this.renderCell("参数", "品牌型号")}
        </div> */}
        <div className="goods-sku m1">
          <DirectionAuth>
            {this.renderCell("送至", addressVal, "ADDRESS")}
          </DirectionAuth>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps, "---哈哈哈-");
    this.setState({
      followed: newProps.goodsSpuDetail.status,
    });
  }

  componentWillUnmount() {
    this.props.RootStore.setToggleModalVisible("CART", false);
    this.props.RootStore.setToggleModalVisible("ADDRESS", false);
  }

  private renderCell(
    textView: string,
    linearLayout: string,
    modalType?: string,
  ) {
    return (
      <div
        className="cell-wrap"
        onClick={() => {
          this.showSku(modalType);
        }}
      >
        <div className="cell-left">
          <div className="text-view">{textView}</div>
          <div className="linear-layout">{linearLayout}</div>
        </div>
        <div className="icon-font-view">
          <img src={arrowRight} alt="" />
        </div>
      </div>
    );
  }

  /**
   * 商品关注
   * @param goodsId 商品id
   */
  private async follow(goodsId: string): void {
    const { user_id } = this.props.RootStore.userInfo;
    const { spu_no } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    let { data } =
      (await starGoodsByUser({
        spuId: spu_no,
        userId: toJS(this.props.RootStore.userInfo).user_id,
        // 收藏状态 1收藏 -1未收藏
        state: this.state.followed == 1 ? -1 : 1,
      })) || {};
    if (data.code === 0) {
      this.setState({
        followed: this.state.followed == 1 ? -1 : 1,
      });
      Toast.info(
        `${this.state.followed == 1 ? "收藏成功" : "取消成功"}`,
        2,
        null,
        false,
      );
    }
  }

  private showSku(modalType: string): void {
    this.props.RootStore.toggleModalVisible(modalType);
  }
}
