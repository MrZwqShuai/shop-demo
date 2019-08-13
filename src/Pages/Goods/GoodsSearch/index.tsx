import * as React from "react";
import CommonProducts from "../../../Components/CommonProduct";
import ProductFilterMoreComponent from "../../../Components/ProductFilterMore";
import ProductFilterComponent from "../../../Components/ProductFilter";
import "./index.scss";
import ScrollerViewComponent from "../../../Components/ScrollerView";
class GoodsSearchPage extends React.Component {
  constructor(props) {
    super(props);
  }
  public render() {
    return (
      <div>
        <div className="goods-filter-wrap">
          <div className="goods-filter-more">
            <ProductFilterComponent />
            <ProductFilterMoreComponent />
          </div>
        </div>
        {/* <CommonProducts /> */}
        <ScrollerViewComponent />
      </div>
    );
  }
}
export default GoodsSearchPage;
