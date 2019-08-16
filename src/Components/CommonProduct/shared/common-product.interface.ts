import { PageOptions } from "../../../Interface";

interface ICommonProduct extends PageOptions {
  goods_name?: string;
  goods_photo?: string;
  price?: number;
  spu_no?: number;
  id?: number;
  category_id?: number;
  brand_id?: number;
}

export default ICommonProduct;
