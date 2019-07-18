import * as React from 'react';
import ProductPrePrview from './../../Shared/model/product-preprview.interface';
interface Props {
  list: Array<ProductPrePrview>,
}
interface State {}
export default class GoodsListComponent extends React.PureComponent<
  Props,
  State
> {
  static defaultProps = {
    list: [{}],
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div className="goods-list-wrapper">
        <ul>
          {this.props.list.map((product: ProductPrePrview, index: number) =>
            this.renderProductItem(product, index)
          )}
        </ul>
      </div>
    );
  }

  private renderProductItem(product: ProductPrePrview, index: number) {
    return (
      <li key={index}>
        <div className="product-item">
          <div className="product-photo">
            <img
              src="http://mcdn.pinduoduo.com/assets/img/mpdd_global.png"
              alt=""
            />
          </div>
          <div className="product-info">
            <div className="produce-name">
              this is a books
              {product.name}
            </div>
            <div className="produce-info-desc" />
          </div>
        </div>
      </li>
    );
  }
}
