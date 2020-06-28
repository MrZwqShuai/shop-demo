import * as React from "react";
import "./index.scss";
import { withRouter } from "react-router-dom";
import DirectionAuth from "../DirecttionAuth";
import { inject, observer } from "mobx-react";

@inject("RootStore")
@observer
@withRouter
export default class BuyBarComponent extends React.PureComponent {
  public render() {
    return (
      <div className="buy-bar-wrapper">
        <div className="customer-service bar-m1">
          <i className="customer-icon bar-m3"></i>
          <span>联系客服</span>
        </div>
        <div className="go-shop bar-m1">
          <i className="shop-icon bar-m3"></i>
          <span>进店</span>
        </div>
        <div
          className="shopping-cart bar-m1"
          onClick={() => this.goShoppingCartPage()}
        >
          <i className="shopping-cart-icon bar-m3"></i>
          <span>购物车</span>
        </div>
        <div className="bar-m2">
          <DirectionAuth onPress={() => this.handlePress()}>
            <div className="add-shopping-cart bar-m2">加入购物车</div>
          </DirectionAuth>
        </div>
        <div className="buy bar-m2">立即购买</div>
      </div>
    );
  }

  private goShoppingCartPage(): void {
    this.props.history.push({
      pathname: "cart",
    });
  }

  private handlePress(): void {
    this.props.RootStore.toggleModalVisible("CART");
  }
}
