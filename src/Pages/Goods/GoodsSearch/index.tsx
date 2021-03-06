import * as React from "react";
import CommonProducts from "../../../Components/CommonProduct";
import ProductFilterMoreComponent from "../../../Components/ProductFilterMore";
import ProductFilterComponent from "../../../Components/ProductFilter";
import "./index.scss";
import ScrollerViewComponent from "../../../Components/ScrollerView";
import { inject, observer } from "mobx-react";
import ICommonProduct from "../../../Components/CommonProduct/shared/common-product.interface";
import MyHeader from "../../../Components/MyHeader";
import MyInputItem from "../../../Components/MyInputItem";
import { Icon } from "antd-mobile";
import MyHeaderForSearch from "../../../Components/MyHeaderForSearch";
import InfiniteScroll from "react-infinite-scroll-component";

import { toJS } from "mobx";
import MyPagination from "../../../Components/Pagination";

interface Props {}
interface State {
  shouldHideHeader: boolean;
}
@inject("ProductsStore")
@observer
class GoodsSearchPage extends React.Component<Props, State> {
  pageNumber: number = 1;
  myTouchStart: number = 0;
  myTouchMove: number = 0;
  constructor(props: Props) {
    super(props);
    this.state = {
      shouldHideHeader: false,
    };
  }
  public render() {
    let { products, noMore } = this.props.ProductsStore;
    const { shouldHideHeader } = this.state;
    return (
      <div style={{ margin: "auto", maxWidth: "640px" }}>
        <div
          className="search-header"
          style={{
            transform: shouldHideHeader ? "translateY(-87px)" : "translateY(0)",
          }}
        >
          <div>
            <MyHeaderForSearch
              onSearch={message => this.handleSearch(message)}
            />
          </div>
          <div className="goods-filter-wrap">
            <div className="goods-filter-more">
              <ProductFilterComponent />
              <ProductFilterMoreComponent />
            </div>
          </div>
        </div>
        <div
          className="scroll-wrap"
          style={{
            transform: shouldHideHeader
              ? "translateY(48px)"
              : "translateY(134px)",
          }}
          onTouchStart={e => {
            this.handleTouchStart(e);
          }}
          onTouchMove={e => {
            this.handleTouchMove(e);
          }}
          onTouchEnd={e => {
            this.handleTouchEnd(e);
          }}
        >
          {/* <ScrollerViewComponent
            data={toJS(products).slice()}
            loadMore={e => this.loadMore(e)}
            // onScrollTop={e => this.handleScroll(e)}
            noMore={noMore}
            renderRow={rowData => <CommonProducts product={rowData} />}
          /> */}
          <div className="scroller-view-wrap">
            <InfiniteScroll
              dataLength={toJS(products).length}
              next={() => this.loadMore()}
              hasMore={true}
              loader={
                <p style={{ textAlign: "center" }}>
                  {noMore ? "我也是有底线的" : "加载中.."}
                </p>
              }
            >
              {toJS(products)
                .slice()
                .map((product: object, index: number) => {
                  return <CommonProducts key={index} product={product} />;
                })}
            </InfiniteScroll>
          </div>
        </div>
        <MyPagination
          current={this.props.ProductsStore.pageOptions.pageNumber - 1}
          total={this.props.ProductsStore.pages}
        />
      </div>
    );
  }

  componentDidMount() {
    this.fetchProducts({}, undefined, true, true);
    window.onmousewheel = e => this.handleMouseWheel(e);
  }

  componentWillUnmount() {
    window.onmousewheel = null;
  }

  /**
   *
   * @param message 搜索框的message
   */
  private handleSearch(message: string): void {
    this.fetchProducts(
      {
        keywords: message,
      },
      undefined,
      true,
    );
  }

  private handleMouseWheel(e: Event): void {
    if (e.wheelDelta < 0) {
      this.setState({
        shouldHideHeader: true,
      });
    } else {
      this.setState({
        shouldHideHeader: false,
      });
    }
  }

  /**
   *
   * @param e 当前滚动距离顶部的距离
   */
  private handleScroll(e: Event): void {
    console.log(e.target.scrollTop);
  }

  private handleTouchStart(e: Event): void {
    this.myTouchStart = e.changedTouches[0].clientY;
  }

  private handleTouchMove(e: Event): void {
    console.log(this.myTouchStart - e.changedTouches[0].clientY > 0, "哈哈哈");
    if (this.myTouchStart - e.changedTouches[0].clientY > 0) {
      this.setState({
        shouldHideHeader: true,
      });
    } else {
      this.setState({
        shouldHideHeader: false,
      });
    }
  }

  private handleTouchEnd(e: Event): void {
    this.myTouchStart = e.changedTouches[0].clientY;
  }

  private fetchProducts(
    params: ICommonProduct,
    isLoadMore?: boolean,
    isRefresh: boolean = false,
    isFirstInPage: boolean = false,
  ): void {
    this.props.ProductsStore.fetchProducts(
      params,
      isLoadMore,
      isRefresh,
      isFirstInPage,
    );
  }

  private async loadMore(): Promise<any> {
    this.fetchProducts({});
  }
}
export default GoodsSearchPage;
