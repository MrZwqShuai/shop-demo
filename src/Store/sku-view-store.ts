import { observable, action } from "mobx";
class SkuViewStore {
  @observable goodsSpuDetail: object = {};
  @observable goodsSkuSpec: Array<object> = [];
  @action
  private fetchGoodsSpuDetail() {}
}

export default new SkuViewStore();
