import * as React from "react";
import CommonProducts from "../../../Components/CommonProduct";
import ProductFilterMoreComponent from "../../../Components/ProductFilterMore";
import ProductFilterComponent from "../../../Components/ProductFilter";
import "./index.scss";
import ScrollerViewComponent from "../../../Components/ScrollerView";
import { inject, observer } from "mobx-react";
import ICommonProduct from "../../../Components/CommonProduct/shared/common-product.interface";

@inject("ProductsStore")
@observer
class GoodsSearchPage extends React.Component {
  pageNumber: number = 1;
  constructor(props) {
    super(props);
  }
  public render() {
    let { products, noMore } = this.props.ProductsStore;
    console.log(this.pageNumber, noMore, "使对方的实力");

    return (
      <div>
        <div className="goods-filter-wrap">
          <div className="goods-filter-more">
            <ProductFilterComponent />
            <ProductFilterMoreComponent />
          </div>
        </div>
        <ScrollerViewComponent
          data={products.slice()}
          loadMore={e => this.loadMore(e)}
          noMore={noMore}
          renderRow={rowData => <CommonProducts product={rowData} />}
        />
      </div>
    );
  }

  componentDidMount() {
    this.fetchProducts({});
  }

  private fetchProducts(params: ICommonProduct): void {
    this.props.ProductsStore.fetchProducts(params);
  }

  private async loadMore(e: any): Promise<any> {
    this.fetchProducts({});
  }
}
export default GoodsSearchPage;
