import * as React from "react";
import { withRouter } from "react-router-dom";
import qs from "qs";
import MySwiperComponent from "./../../../Components/MySwiper/index";
import { Banner } from "./../../../Components/MySwiper/shared/banner.interface";
import BuyAreaComponent from "./components/buy-area/index";
import CommentsAreaComponent from "./components/comments-area/index";
import GuessAreaComponent from "./components/guess-area/index";
import "./index.scss";
import BuyBarComponent from "./../../../Components/BuyBar/index";
import { fetchGoodsDetail } from "../../../Api";
import { GoodsSpuDetail } from "../../../Interface/goods";
interface Props {}

interface State {
  banners: Array<Banner>;
  goodsSpuDetail: GoodsSpuDetail;
}

export default class GoodsDetailPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      banners: [
        {
          name: "banner1",
          src: "",
          url: "",
        },
      ],
      goodsSpuDetail: {
        banners: "",
      },
    };
  }
  public render() {
    const { goodsSpuDetail } = this.state;
    return (
      <div className="goods-detail-wrapper">
        <MySwiperComponent
          datasource={
            goodsSpuDetail.banners && goodsSpuDetail.banners.split(",")
          }
        />
        <div className="buy-comments-area">
          <BuyAreaComponent goodsSpuDetail={goodsSpuDetail} />
          <CommentsAreaComponent />
        </div>
        <GuessAreaComponent />
        <BuyBarComponent />
      </div>
    );
  }

  public componentDidMount() {
    const { spu_no } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    this.fetchGoodsDetail(spu_no);
  }

  /**
   * fetch goodsdetail by spu_no
   * @param spu_no goods_spu number
   */
  async fetchGoodsDetail(spu_no: string) {
    let { data } = await fetchGoodsDetail<GoodsSpuDetail>({
      spuNo: spu_no,
    });
    data.content &&
      this.setState({
        goodsSpuDetail: data.content,
      });
    console.log("0000data", data.content, data.content.sku);
  }
}
