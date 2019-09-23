import * as React from "react";
import { inject, observer } from "mobx-react";
import "./index.scss";
import arrowRight from "../../../../../Assets/images/arrow-right.png";
import { GoodsSpuDetail } from "../../../../../Interface/goods";
import { withRouter } from "react-router-dom";
import { starGoodsByUser } from "../../../../../Api";
import { toJS } from "mobx";
interface Props {
  goodsId?: string;
  goodsSpuDetail: GoodsSpuDetail;
}
interface State {
  followed: boolean;
}

@inject("RootStore")
@withRouter
@observer
export default class BuyAreaComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      followed: false,
    };
  }

  public render() {
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
                this.state.followed ? "star-active" : null
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
          {this.renderCell("规格", "已选: 4人座")}
        </div>
        <div className="goods-sku m1">
          {this.renderCell("参数", "品牌型号")}
        </div>
        <div className="goods-sku m1">
          {this.renderCell("送至", "芜湖市鸠江区龙山新苑")}
        </div>
      </div>
    );
  }

  private renderCell(textView: string, linearLayout: string) {
    return (
      <div
        className="cell-wrap"
        onClick={() => {
          this.showSku();
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
    if (this.props.RootStore.isLogin) {
      let { data } = await starGoodsByUser({
        spuId: 1,
        userId: toJS(this.props.RootStore.userInfo).user_id,
        // 收藏状态 1收藏 -1未收藏
        state: this.state.followed ? -1 : 1,
      });
      if (data.code === 0) {
        this.setState({
          followed: !this.state.followed,
        });
      }
    } else {
      this.props.history.push({
        pathname: "/auth/login",
      });
    }
  }

  private showSku(): void {
    this.props.RootStore.toggleCartModalVisbile();
  }
}
