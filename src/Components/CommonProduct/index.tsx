import * as React from "react";
import ICommonProduct from "./shared/common-product.interface";
import "./index.scss";
interface Props {
  products: ICommonProduct[];
}
interface State {}
export default class CommonProducts extends React.PureComponent<Props, State> {
  static defaultProps: Props = {
    products: [
      {
        goods_photo: "http://mcdn.pinduoduo.com/assets/img/mpdd_global.png",
        goods_name: "新品衣服",
      },
      {
        goods_photo: "http://mcdn.pinduoduo.com/assets/img/mpdd_global.png",
        goods_name: "新品衣服",
      },
      {
        goods_photo: "http://mcdn.pinduoduo.com/assets/img/mpdd_global.png",
        goods_name: "新品衣服",
      },
      {
        goods_photo: "http://mcdn.pinduoduo.com/assets/img/mpdd_global.png",
        goods_name: "新品衣服",
      },
      {
        goods_photo: "http://mcdn.pinduoduo.com/assets/img/mpdd_global.png",
        goods_name: "新品衣服",
      },
    ],
  };

  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className="commonProductsWrap">
        <ul>
          {this.props.products.map(product => {
            return this.renderCommonProduct(product);
          })}
        </ul>
      </div>
    );
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
      <li className="commonProduct">
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
          <p className="price">
            <div>
              <span className="price-number">
                <span className="dollar">￥</span>
                {product.price}
              </span>
              <span className="price-welfare">满减</span>
            </div>
            <span className="similar">看相似</span>
          </p>
        </div>
      </li>
    );
  }
}
