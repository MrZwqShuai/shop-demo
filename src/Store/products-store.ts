import { observable, action } from "mobx";
import ICommonProduct from "../Components/CommonProduct/shared/common-product.interface";
import { PageOptions } from "../Interface";
class ProductsStore {
  @observable products: Array<ICommonProduct> = [
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
    {
      goods_photo: "http://mcdn.pinduoduo.com/assets/img/mpdd_global.png",
      goods_name: "品如的衣服",
    },
  ];
  /**
   *
   * @param loadMore
   */
  @action
  fetchProducts(loadMore: boolean, pageOptins?: PageOptions): void {
    if (!loadMore) {
      pageOptins = {
        pageNumber: 1,
        pageSize: 10,
      };
    }
    this.products = this.products.concat([
      {
        goods_photo: "http://mcdn.pinduoduo.com/assets/img/mpdd_global.png",
        goods_name: "新增商品1",
      },
      {
        goods_photo: "http://mcdn.pinduoduo.com/assets/img/mpdd_global.png",
        goods_name: "新增商品2",
      },
    ]);
  }
}

export default new ProductsStore();
