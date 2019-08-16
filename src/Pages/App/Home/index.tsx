import * as React from "react";
import MySwiperComponent from "./../../../Components/MySwiper/index";
import routeAnimation from "../../../Config/animation/route-animation";
import NavBarComponent from "./components/nav-bar/index";
import HotAreaComponent from "./components/hot-area/index";
import CheapAreaComponent from "./components/cheap-area/index";
import ActivityAreaComponent from "./components/activity-area/index";
import { fetchHomeBanner, fetchGoods } from "./../../../Api/index";
import { Banner } from "./../../../Components/MySwiper/shared/banner.interface";
import GoodsListComponent from "../../../Components/GoodsList";
import "./index.scss";
import ICommonProduct from "../../../Components/CommonProduct/shared/common-product.interface";
import CommonProducts from "../../../Components/CommonProduct";
interface Props {}

interface State {
  banners: Array<Banner>;
  products: Array<ICommonProduct>;
}
const HomePage = routeAnimation(
  class HomePage extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        banners: [{ name: "banner1", src: "", url: "" }],
        products: [],
      };
    }

    public render() {
      const { products } = this.state;
      return (
        <div className="homeWrapper">
          <MySwiperComponent banners={this.state.banners} />
          <NavBarComponent />
          <HotAreaComponent />
          <CheapAreaComponent />
          <ActivityAreaComponent />
          <CommonProducts products={products} />
          {/* <GoodsListComponent list={[{ name: "zwq", src: "" }]} /> */}
        </div>
      );
    }

    public componentDidMount() {
      this.fetchHomeBanner({});
      this.fetchGoods({
        category_id: null,
      });
    }

    /**
     * 获取banner
     * @param params
     */
    private async fetchHomeBanner(params: object): Promise<any> {
      try {
        const { data } = await fetchHomeBanner<Array<Banner>>(params);
        this.setState({
          banners: data,
        });
      } catch (e) {
        console.log("错误信息: ", e.message);
      }
    }

    private async fetchGoods(params: object): Promise<any> {
      const { data } = await fetchGoods(params);
      // console.log(data.content, "--首页大苏打撒旦-");
      this.setState({
        products: data.content,
      });
    }
  },
);
export default HomePage;
