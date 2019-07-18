import * as React from 'react';
import routeAnimation from '../../../Config/animation/route-animation';
import CarItemComponent from './componets/cart-item/index';
import './index.scss';
import CartModalComponent from './../../../Components/Modal/cart-modal/index';
const ShoppingCartPage = routeAnimation(
  class ShoppingCartPage extends React.PureComponent {
    public render() {
      return (
        <div className="cart-wrapper">
          {/* {this.renderEmpty()} */}
          {/* {this.renderUnlogin()} */}
          <CarItemComponent />
          <CarItemComponent />
          <CarItemComponent />
          <CarItemComponent />
        </div>
      );
    }

    private renderEmpty(): JSX.Element {
      return (
        <div className="empty-cart">
          <div>购物车空空如也,去逛逛吧~</div>
          <div />
        </div>
      );
    }

    private renderUnlogin(): JSX.Element {
      return (
        <div className="unlogin-cart">
          <div>购物车.png</div>
          <div>登陆后可同步购物车中商品</div>
          <div className="login-btn">登陆</div>
        </div>
      );
    }

    private remove(cartNumber: number): void {
      // remove cart..
    }

    /**
     * 设置标题
     */
    public setDocTitle(): void {
      document.title = '购物车';
    }

    public componentDidMount() {
      this.setDocTitle();
    }
  }
);
export default ShoppingCartPage;
