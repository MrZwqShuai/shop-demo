import { observable, action } from "mobx";
class ModalStore {
  @observable products: Array<object> = [];
  @observable skuViewVal: string = "";
  @observable addressVal: string = "";
  @action
  removeGoodsCart(cart_no: number, goods_count: number): void {}
  @action
  setSkuViewVal(skuViewVal: string): void {
    this.skuViewVal = skuViewVal;
  }

  @action
  setAddressVal(addressVal: string): void {
    this.addressVal = addressVal;
  }
}

export default new ModalStore();
