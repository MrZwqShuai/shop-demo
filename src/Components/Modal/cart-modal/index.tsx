import * as React from "react";
import { inject, observer } from "mobx-react";
import "./index.scss";
import CommonModalComponent from "./../common-modal/index";
import SkuView from "../../SkuView";
import { Icon, Toast } from "antd-mobile";
import DirectionAuth from "../../DirecttionAuth";
import { toJS } from "mobx";
interface Props {
  RootStore?: any;
}
interface State {
  skuValue: string;
  goodsCount: number;
}
// const Logo =
//   "//m.360buyimg.com/mobilecms/s750x750_jfs/t1/100285/10/4041/223711/5de4b372Ecd097a97/5ca3a2a8279ac780.jpg";
@inject("RootStore", "ModalStore", "GoodsSpuStore")
@observer
export default class CartModalComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      skuValue: "",
      goodsCount: 1,
    };
  }

  public render() {
    const { skuValue, goodsCount } = this.state;
    const {
      goodsSkuPhoto,
      goodsSpuDetail,
      goodsSkuVal,
      goodsSkuPrice,
    } = this.props.GoodsSpuStore;
    const { sku } = goodsSpuDetail && goodsSpuDetail;
    return (
      <CommonModalComponent modalVisibleType="CART">
        <div className="header">
          <div className="pop-img">
            <img src={goodsSkuPhoto} alt="商品logo" />
          </div>
          <div className="header-content">
            <p className="price">
              ￥<em>{goodsSkuPrice}</em>
              .00
            </p>
            <p className="sku-choose">
              <span>已选规格</span>
              <span className="sku-choose-value">
                {skuValue}，{goodsCount}个
              </span>
            </p>
          </div>
          <div
            className="close"
            onClick={() => {
              this.closeCartModal();
            }}
          >
            <Icon type="cross" />
          </div>
        </div>
        <div className="body">
          <div className="sku-kind">
            <SkuView
              onChange={value => {
                this.handleSkuViewChange(value);
              }}
              onCountChange={value => {
                this.handleSKuViewCountChange(value);
              }}
              datasource={
                (goodsSkuVal.length && goodsSkuVal) || [{ 暂无规格: "无" }]
              }
            />
          </div>
        </div>
        <div className="sure-btn">
          <div className="add-cart-btn btn">
            <DirectionAuth>
              <div
                onClick={() => {
                  this.handleAddCartClick();
                }}
              >
                加入购物车
              </div>
            </DirectionAuth>
          </div>
          <div
            className="buy-now-btn btn"
            onClick={() => {
              this.handleBuyClick();
            }}
          >
            立即购买
          </div>
        </div>
      </CommonModalComponent>
    );
  }

  private closeCartModal(): void {
    this.props.RootStore.toggleModalVisible("CART");
  }

  private handleBuyClick(): void {
    this.closeCartModal();
  }

  private handleAddCartClick(): void {
    const skuViewVal = `${this.state.skuValue}，${this.state.goodsCount}个`;
    if (
      skuViewVal &&
      skuViewVal.split("，").length <=
        this.props.GoodsSpuStore.goodsSkuKeys.length
    ) {
      return Toast.info("请选择全部规格", 1);
    }
    this.props.GoodsSpuStore.addOrderCartByUser({
      goods_price: 999,
      goods_count: this.state.goodsCount,
      skuId: 1,
      spuId: 1,
      real_price: 2,
    });
    this.props.ModalStore.setSkuViewVal(skuViewVal);
    this.closeCartModal();
  }
  /**
   * sku选中
   * @param value skuview 选中的value值 例如手机： [黑色，256G]等
   */
  private handleSkuViewChange(value: Array<string>): void {
    value = value.filter(val => {
      return Boolean(val);
    });
    this.setState({
      skuValue: value.join("，"),
    });
  }

  /**
   * 商品数量改变
   * @param value 商品数
   */
  private handleSKuViewCountChange(value: number): void {
    this.setState({
      goodsCount: value,
    });
  }
}
