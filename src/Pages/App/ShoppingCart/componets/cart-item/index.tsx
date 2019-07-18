import * as React from 'react';
import {inject, observer} from 'mobx-react';
import Cart from '../../shared/cart.interface';
import noSelectedIcon from '../../assets/images/no-selected.png';
import selectedIcon from '../../assets/images/selected.png';
import shopIcon from '../../assets/images/shop.png';
import './index.scss';
interface Props {
  RootStore?: any;
  cart?: Cart;
}

interface State {
  active: boolean;
  goodsnumber: string;
}

@inject('RootStore')
@observer
export default class CarItemComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: false,
      goodsnumber: '1',
    };
  }

  public render() {
    return (
      <div className="cart-item-wrapper" onClick={() => this.handleSelect()}>
        <div className="cart-item-left">{this.renderSelected(1)}</div>
        <div className="cart-item-right">
          <div className="cart-item-head">
            <div className="cart-shop">
              <img src={shopIcon} alt="商店" />
            </div>
            <div className="title">
              <span>myshop自营店</span>
              <i className="icon-arrow-right" />
            </div>
          </div>
          <div className="cart-item-body">
            <div className="body-left">
              <img
                src="https://img10.360buyimg.com/mobilecms/s117x117_jfs/t1/2751/21/11778/286734/5bd1462eE9152a154/15708a469c99b913.jpg!q70.dpg.webp"
                alt="商品"
              />
            </div>
            <div className="body-right">
              <div className="name">
                301 仿古收音机蓝牙音箱 官方标配【音箱+充电线】
              </div>
              <p
                className="sku"
                onClick={() => {
                  this.props.RootStore.toggleCartModalVisbile();
                }}
              >
                0.549kg/件，红烧牛肉，五连包
              </p>
              <div className="goods-line">
                <span className="price">
                  ￥<em>11</em>
                  .90
                </span>
                <div className="add-more">
                  <span className="minus" onClick={this.removeGoodsNumber}>
                    ➖
                  </span>
                  <div className="input-wrap">
                    <input
                      type="tel"
                      onChange={e => this.handleChange(e)}
                      value={this.state.goodsnumber}
                    />
                  </div>
                  <span className="plus" onClick={this.addGoodsNumber}>
                    ➕
                  </span>
                </div>
              </div>
              <div className="goods-sub-line">
                <span>加入关注</span>
                <span>删除</span>
              </div>
            </div>
          </div>
          <div className="cart-item-foot">
            <div>
              <span>2</span>
              <span>3</span>
            </div>
            <div>
              <span>4</span>
              <span>5</span>
              <span>6</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderSelected(index: number): JSX.Element {
    return (
      <div className="select-icon">
        {this.state.active ? (
          <img src={selectedIcon} alt="选中" />
        ) : (
          <img src={noSelectedIcon} alt="未选中" />
        )}
      </div>
    );
  }

  private handleSelect(): void {
    this.setState({
      active: !this.state.active,
    });
  }

  private handleChange(e): void {
    this.setState({
      goodsnumber: e.target.value,
    });
  }

  private addGoodsNumber(e): void {
    e.stopPropagation();
  }

  private removeGoodsNumber(e): void {
    e.stopPropagation();
    return;
  }

  /**
   * 收藏goods
   * @param goodsId 商品id
   */
  private startGoods(goodsId: number) {}

  /**
   * 删除当前商品
   * @param goodsId 商品id
   */
  private removeGoods(goodsId: number) {}

  /**
   * 选择商品的sku规则
   */
  private skuChoose(): void {
    console.log(this.props.RootStore.toggleCartModalVisbile, '---------');
    const {toggleCartModalVisbile} = this.props.RootStore;
    toggleCartModalVisbile();
  }
}
