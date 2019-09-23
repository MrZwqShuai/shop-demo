import * as React from "react";
import "./index.scss";
import { withRouter } from "react-router-dom";

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
        <div className="add-shopping-cart bar-m2">加入购物车</div>
        <div className="buy bar-m2">立即购买</div>
      </div>
    );
  }

  private goShoppingCartPage(): void {
    this.props.history.push({
      pathname: "cart",
    });
  }
}
