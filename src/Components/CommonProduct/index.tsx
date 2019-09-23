import * as React from "react";
import ICommonProduct from "./shared/common-product.interface";
import { withRouter } from "react-router-dom";
import "./index.scss";
interface Props {
  product: ICommonProduct;
  // 排列方式
  layout: string;
}
interface State {}
@withRouter
export default class CommonProducts extends React.PureComponent<Props, State> {
  static defaultProps: Props = {
    product: {
      goods_photo: "http://mcdn.pinduoduo.com/assets/img/mpdd_global.png",
      goods_name: "品ru衣服",
    },
    layout: "vertical",
  };

  constructor(props) {
    super(props);
  }

  // public render() {
  //   return (
  //     <div className="commonProductsWrap">
  //       <ul>
  //         {this.props.products.map((product, index) => {
  //           return this.renderCommonProduct(product, index);
  //         })}
  //       </ul>
  //     </div>
  //   );
  // }

  public render() {
    return this.renderCommonProduct(this.props.product);
  }

  public renderCommonProduct(product: ICommonProduct): JSX.Element {
    const goodsNameFilter = goods_name => {
      const maxNameLength = 24;
      if (goods_name.length >= maxNameLength) {
        return goods_name.substr(0, maxNameLength) + "...";
      }
      return goods_name;
    };
    return (
      <li
        className={this.props.layout}
        onClick={() => {
          this.handlerProducClick(product);
        }}
      >
        <div className="productImg">
          <img src={product.goods_photo} alt="商品图片" />
        </div>
        <div className="productInfo">
          <p className="information">
            <span className="name webkit-line-clamp-name">
              <span className="autarky">自营</span>
              {product.goods_name}
            </span>
          </p>
          <div className={`price-layout-${this.props.layout} price`}>
            <div>
              <span className="price-number">
                <span className="dollar">￥</span>
                {product.price}
              </span>
              <span className="price-welfare">满减</span>
            </div>
            <span className="similar">看相似</span>
          </div>
        </div>
      </li>
    );
  }

  /**
   *
   * @param product {object} produce item
   */
  private handlerProducClick(product: ICommonProduct): void {
    this.props.history.push({
      pathname: `/goods`,
      search: `?spu_no=${product.spu_no}`,
    });
  }
}
