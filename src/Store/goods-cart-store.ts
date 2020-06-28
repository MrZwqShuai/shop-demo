import { observable, action } from "mobx";
import { OrderCart } from "../Interface";
import { fetchOrderCartListByUser } from "../Api";
class GoodsCartStore {
  @observable products: Array<object> = [];
  @observable list: Array<object> = [];
  @action
  removeGoodsCart(cart_no: number, goods_count: number): void {}

  @action
  private async fetchOrderCartListByUser() {
    let { data } = await fetchOrderCartListByUser<Array<OrderCart>>({});
    console.log(data.content, "==========");
    if (data.code === 0) {
      data.content.length && (this.list = data.content);
    }
  }
}

export default new GoodsCartStore();
