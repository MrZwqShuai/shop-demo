import * as React from "react";
import "./index.scss";
export default class ActivityAreaComponent extends React.PureComponent {
  public render() {
    return (
      <div className="activity-wrapper">
        <div className="activity-title">
          <span className="line"></span>
          <span className="title">每日必淘</span>
          <span className="line"></span>
        </div>
        <div className="activity-content">
          <div className="activity-content-top">
            <span>
              <img
                src="//img14.360buyimg.com/mcoss/s230x230_jfs/t1/72860/10/13282/138298/5da9315cE185424b0/5914fb1518ac3588.jpg"
                alt=""
              />
            </span>
            <span>
              <img
                src="//img14.360buyimg.com/mcoss/s230x230_jfs/t1/72860/10/13282/138298/5da9315cE185424b0/5914fb1518ac3588.jpg"
                alt=""
              />
            </span>
          </div>
          <div className="activity-content-bottom">
            <span>
              <img
                src="https://m.360buyimg.com/mobilecms/jfs/t1/94509/21/207/404597/5da92058E339d014c/11eac01db0dd5d0d.jpg"
                alt=""
              />
            </span>
            <span>
              <img
                src="https://m.360buyimg.com/mobilecms/jfs/t1/94509/21/207/404597/5da92058E339d014c/11eac01db0dd5d0d.jpg"
                alt=""
              />
            </span>
            <span>
              <img
                src="https://m.360buyimg.com/mobilecms/jfs/t1/94509/21/207/404597/5da92058E339d014c/11eac01db0dd5d0d.jpg"
                alt=""
              />
            </span>
            <span>
              <img
                src="https://m.360buyimg.com/mobilecms/jfs/t1/94509/21/207/404597/5da92058E339d014c/11eac01db0dd5d0d.jpg"
                alt=""
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}
