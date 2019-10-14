import { observable, action } from "mobx";
class GoodsCartStore {
  @observable products: Array<object> = [];
  @action
  removeGoodsCart(cart_no: number, goods_count: number): void {}
}

export default new GoodsCartStore();
