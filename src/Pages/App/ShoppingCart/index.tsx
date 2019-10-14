import * as React from "react";
import routeAnimation from "../../../Config/animation/route-animation";
import CarItemComponent from "./componets/cart-item/index";
import "./index.scss";
import CartModalComponent from "./../../../Components/Modal/cart-modal/index";
import { fetchOrderCartListByUser } from "../../../Api";
import { OrderCart } from "../../../Interface";

interface State {
  orderCartList: Array<OrderCart>;
}

interface Props {}

const ShoppingCartPage = routeAnimation(
  class ShoppingCartPage extends React.PureComponent<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        orderCartList: [],
      };
    }
    public render() {
      return (
        <div className="cart-wrapper">
          {/* {this.renderEmpty()} */}
          {/* {this.renderUnlogin()} */}
          {this.state.orderCartList.length ? (
            this.state.orderCartList.map((orderCart: OrderCart) => {
              return <CarItemComponent orderCart={orderCart} />;
            })
          ) : (
            <div style={{ marginTop: "35px", textAlign: "center" }}>
              购物车空空如也~
            </div>
          )}
          <div className="cart-foot">
            <i>全选</i>
            <div className="btns-wrap">
              <div className="btn-star btn">移至收藏</div>
              <div className="btn-remove btn">删除</div>
            </div>
          </div>
        </div>
      );
    }

    componentWillMount() {
      this.fetchOrderCartListByUser();
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

    private async fetchOrderCartListByUser() {
      let { data } = await fetchOrderCartListByUser<Array<OrderCart>>({});
      console.log(data.content, "==========");
      if (data.code === 0) {
        data.content.length &&
          this.setState({
            orderCartList: data.content,
          });
      }
    }

    private remove(cartNumber: number): void {
      // remove cart..
    }

    /**
     * 设置标题
     */
    public setDocTitle(): void {
      document.title = "购物车";
    }

    public componentDidMount() {
      this.setDocTitle();
    }
  },
);
export default ShoppingCartPage;
