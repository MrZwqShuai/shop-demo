import { observable, action, toJS } from "mobx";
import { fetchGoodsDetail, addOrderCartByUser } from "../Api";
import { Toast } from "antd-mobile";
class GoodsSpuStore {
  @observable goodsSpuDetail: object = { banners: "" };
  @observable goodsSkuPhoto: string = "";
  @observable goodsSkuKeys: Array<string> = [];
  @observable goodsSkuSpec: Array<object> = [];
  @observable goodsSkuVal: Array<object> = [];
  @observable goodsSkuPrice: number = undefined;
  /**
   * fetch goodsdetail by spu_no
   * @param spu_no goods_spu number
   */
  @action
  private async fetchGoodsSpuDetail(spu_no: number): Promise<void> {
    let { data } = await fetchGoodsDetail({
      spuNo: spu_no,
    });
    if (data.code === 0) {
      data.content && (this.goodsSpuDetail = data.content);
      const { sku } = this.goodsSpuDetail && this.goodsSpuDetail;
      this.goodsSkuPhoto = this.goodsSpuDetail.goods_photo || "";
      this.goodsSkuPrice = this.goodsSpuDetail.price;
      if (sku.length) {
        this.toSkuViewDataSource(toJS(sku));
      } else {
        this.goodsSkuVal = sku;
      }
    }
  }

  @action
  private async addOrderCartByUser(params: object): Promise<void> {
    Toast.loading("请稍后", 0);
    let { data } = await addOrderCartByUser(params);
    if (data.code === 0) {
      Toast.success("加入购物车成功", 1);
    }
  }

  private toSkuViewDataSource(target: Array<object>): void {
    this.goodsSkuKeys = [];
    (target &&
      target.length &&
      target.map((item, index) => {
        let datasource = {};
        const { spec_val } = item;
        datasource["skuId"] = item.skuNo;
        // datasource["price"] = item.price;
        // datasource["stock"] = item.stock;
        spec_val &&
          spec_val.length &&
          spec_val.forEach($item => {
            if ($item) {
              if (!(this.goodsSkuKeys.indexOf($item.spec_name) != -1)) {
                this.goodsSkuKeys.push($item.spec_name);
              }
              datasource[$item.spec_name] = $item.spec_value;
              console.log(datasource, "itemitemitemitemitemitem");
            }
          });
        this.goodsSkuKeys.forEach(skuKey => {
          if (!datasource[skuKey]) {
            datasource[skuKey] = "暂无";
          }
        });
        this.goodsSkuVal.push(datasource);
        console.log(toJS(this.goodsSkuVal), this.goodsSkuKeys, "hhgoodsSkuVal");
      })) ||
      [];
  }
}

export default new GoodsSpuStore();
