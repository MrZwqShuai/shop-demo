import * as React from 'react';
import './index.scss';
import arrowRight from '../../../../../Assets/images/arrow-right.png';
interface Props {}
export default class CommentsAreaComponent extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div className="comments-area-wrapper">
        <div className="header">
          <span className="comments-text">宝贝评价(999+)</span>
          <span className="all">
            <span>查看全部</span>
            <img src={arrowRight} alt="" />
          </span>
        </div>
        <div className="body">
          <div className="comments-wrap m3">
            <div className="user">
              <span className="avatar" />
              <span className="name">张***</span>
            </div>
            <div className="comments">
              一次非常满意的网购，性价比很高
              ，这套很适合我的小客厅，客服很好，在春运这么紧张的时间段帮我们安排得妥妥的
            </div>
          </div>
          <div className="picture-wrap m3">买家相册</div>
          <div className="question-wrap m3">问大家</div>
        </div>
      </div>
    );
  }
}
