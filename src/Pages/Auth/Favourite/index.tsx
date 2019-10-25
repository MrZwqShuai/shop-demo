import * as React from "react";
import { Tabs, WhiteSpace, Card, Badge } from "antd-mobile";
import qs from "qs";
import MyHeader from "../../../Components/MyHeader";
import { fetchGoodsStarsByUserId } from "../../../Api";
import "./index.scss";
interface Props {}
interface State {
  favouriteListWithGoods: Array<any>;
  favouriteListWithShop: Array<any>;
  initialPage: number;
}
export default class FavouritePage extends React.PureComponent<Props, State> {
  favoutiteType: number =
    (
      qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      }) || {}
    ).favoutiteType || 0;
  constructor(props: Props) {
    super(props);
    this.state = {
      favouriteListWithGoods: [],
      favouriteListWithShop: [],
      initialPage: 0,
    };
  }

  render() {
    const { favouriteListWithGoods, initialPage } = this.state;
    return (
      <div className="favourite-page">
        <MyHeader centerContent={<span>我的关注</span>} />
        <div style={{ marginTop: "45px" }}>
          <Tabs
            tabs={[
              {
                title: (
                  <Badge text={`今日(${favouriteListWithGoods.length})`}>
                    商品
                  </Badge>
                ),
              },
              { title: <Badge>店铺</Badge> },
            ]}
            initialPage={Number(this.favoutiteType)}
            swipeable={false}
            onChange={(tab, index) => {
              console.log("onChange", index, tab);
            }}
            onTabClick={(tab, index) => {
              console.log("onTabClick", index, tab);
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
              }}
            >
              <ul>
                {favouriteListWithGoods.map((item: object, index: number) => {
                  return (
                    <li key={index}>
                      <Card full>
                        <Card.Header
                          title="价格"
                          // thumb={item.goods_photo}
                          thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                          extra={<span>{item.price}</span>}
                        />
                        <Card.Body>
                          <div>{item.goods_name}</div>
                        </Card.Body>
                      </Card>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "150px",
                backgroundColor: "#fff",
              }}
            >
              暂无收藏~
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "150px",
                backgroundColor: "#fff",
              }}
            >
              Content of third tab
            </div>
          </Tabs>
        </div>
      </div>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.initTabsPage(this.favoutiteType);
    }, 5000);
    console.log(this.favoutiteType, "哈哈哈哈");
    this.fetchGoodsStarsByUserId();
  }

  private async fetchGoodsStarsByUserId(): Promise<any> {
    const { data } = await fetchGoodsStarsByUserId<any[]>({});
    this.setState({
      favouriteListWithGoods: data.content,
    });
  }

  /**
   *
   * @param page 初始化的page
   */
  private initTabsPage(page: number): void {
    this.setState({
      initialPage: page,
    });
  }
}
