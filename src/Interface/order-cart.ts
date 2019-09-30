interface OrderCart {
  id?: number;
  // 购物车编号
  cart_no: string;
  user_id?: string;
  // 商品名称
  goods_name: string;
  //     商品数量
  goods_count: string;
  //    商品总价
  goods_price: number;
  // 购物车状态
  status?: number;
  goods_photo: string;
  //    该购物车的单价
  price?: number;
  //    分类
  category_id: number;
}

export { OrderCart };
