import * as React from "react";
import "./index.scss";
import { withRouter } from "react-router-dom";
import { Icon } from "antd-mobile";
@withRouter
export default class HotAreaComponent extends React.PureComponent {
  public render() {
    return (
      <div className="hotWrapper-advertisement">
        <div className="hotWrapper">
          <div className="hotTitle">
            <h5 className="title">热卖专区</h5>
            <span className="more">
              <span style={{ marginTop: "-1px" }}>更多精彩</span>
              <Icon type="right" />
            </span>
          </div>
          <div className="hotContent">
            <div
              className="hotContentLeft"
              onClick={() => {
                this.hotGoodsDetail(2);
              }}
            >
              <img
                src="//img13.360buyimg.com/mobilecms/s372x372_jfs/t1/27736/19/2658/59380/5c20599bE7dd816d4/1248145f325b6b99.jpg"
                alt=""
              />
            </div>
            <div className="hotContentRight">
              <div className="top-wrap right-item first-item">
                <div className="hot-right-desc">
                  <div className="title-box">
                    <span className="title">生鲜随心订</span>
                  </div>
                  <span className="desc">夏天足不出户买菜</span>
                </div>
                <div className="hot-right-img">
                  <img
                    src="//img13.360buyimg.com/mobilecms/s372x372_jfs/t1/70204/36/10516/175447/5d7f0846E01dc866f/e2deaabbbbc48fef.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="bottom-wrap right-item">
                <div className="hot-right-desc">
                  <div className="title-box">
                    <span
                      className="title"
                      style={{
                        backgroundColor: "#8BC34A",
                      }}
                    >
                      生鲜随心订
                    </span>
                  </div>
                  <span className="desc">夏天足不出户买菜</span>
                </div>
                <div className="hot-right-img">
                  <img
                    src="//img13.360buyimg.com/mobilecms/s372x372_jfs/t1/70204/36/10516/175447/5d7f0846E01dc866f/e2deaabbbbc48fef.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 广告 */}
        <div className="advertisement-wrap">
          <a onClick={this.goToAdvertisement}>
            <img
              src="//m.360buyimg.com/mobilecms/s700x280_jfs/t1/99598/32/163/113012/5da864e5Efead378b/b5bfa047f809f755.jpg"
              alt=""
            />
          </a>
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
      search: `?id=${hotGoodsId}`,
    });
  }

  /**
   * 广告跳转
   */
  private goToAdvertisement(): void {}
}
