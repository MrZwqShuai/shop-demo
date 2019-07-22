import * as React from "react";
import "./index.scss";
import { withRouter } from "react-router-dom";

@withRouter
export default class HotAreaComponent extends React.PureComponent {
  public render() {
    return (
      <div className="hotWrapper">
        <div className="hotTitle">
          <h5>热卖专区</h5>
          <span>更多精彩></span>
        </div>
        <div className="hotContent">
          <div
            className="hotContentLeft"
            onClick={() => {
              this.hotGoodsDetail(2);
            }}
          >
            <img
              src="http://mcdn.pinduoduo.com/assets/img/mpdd_global.png"
              alt=""
            />
          </div>
          <div className="hotContentRight">
            <img
              src="http://mcdn.pinduoduo.com/assets/img/cat_girlshoes_2.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }

  /**
   * 跳转热卖goods详情
   * @param hotGoodsId 热卖id
   */
  private hotGoodsDetail(hotGoodsId: number): void {
    console.log(this.props, "-----");
    this.props.history.push({
      pathname: `/goods`,
      search: `id=${hotGoodsId}`,
      state: {
        id: hotGoodsId,
      },
    });
  }
}
