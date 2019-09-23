interface GoodsDetail {
  /**
   * 商品sku 编号
   */
  skuNo: number;
  /**
   * 商品名称
   */
  goodsName: string;
  /**
   * 价格
   */
  price: number;
  /**
   * 库存
   */
  stock: number;
  /**
   * 是否自营 0 非自营 1 自营
   */
  shopI: number;
  /**
   * 商品的规格 列如颜色 大小
   */
  goodsSpecValue: string;
}

// 商品spu
interface GoodsSpu {
  id: number;
  spu_no: number;
  goods_name: string;
  goods_photo: string;
  price: number;
  low_price: number;
  category_id: number;
  brand_id: number;
  banners: string;
}

interface GoodsSpuDetail extends GoodsSpu {
  sku: Array<GoodsDetail>;
}

export { GoodsDetail, GoodsSpu, GoodsSpuDetail };
