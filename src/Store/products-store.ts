import { observable, action } from "mobx";
import ICommonProduct from "../Components/CommonProduct/shared/common-product.interface";
import { PageOptions, PageResult } from "../Interface";
import { sortGoods } from "../Api";
import { Toast } from "antd-mobile";
class ProductsStore {
  @observable products: Array<ICommonProduct> = [];
  @observable pageOptions: PageOptions = {
    pageNumber: 1,
    pageSize: 6,
  };
  @observable pages: number = 1;
  @observable noMore: boolean = false;
  /**
   *
   * @param params
   * fetch goods by sort words
   */
  @action
  async fetchProducts(
    params: ICommonProduct,
    isLoadMore: boolean = true,
    isRefresh: boolean = true,
  ): Promise<any> {
    if (!isLoadMore || isRefresh) {
      Toast.loading("正在加载中...", 0);
      this.products = [];
      this.pageOptions.pageNumber = 1;
    }
    if (this.products.length && this.pageOptions.pageNumber > this.pages) {
      this.noMore = true;
      return;
    }
    const { data } = await sortGoods<PageResult<Array<ICommonProduct>>>(
      Object.assign(params, {
        pageNumber: this.pageOptions.pageNumber,
        pageSize: this.pageOptions.pageSize,
      }),
    );
    this.pageOptions.pageNumber++;
    this.pages = data.content.pages;
    this.products = this.products.concat(data.content.list.slice());
    this.noMore = false;
  }
}

export default new ProductsStore();
