import * as React from "react";
import CommonProducts from "../../../Components/CommonProduct";

class GoodsSearchPage extends React.Component {
  constructor(props) {
    super(props);
  }
  public render() {
    return (
      <div>
        <div className="goods-filter-wrap">
          <div className="goods-filter">综合 销量</div>
          <div className="goods-filter-more">品牌 类别</div>
        </div>
        <CommonProducts />
      </div>
    );
  }
}
export default GoodsSearchPage;
