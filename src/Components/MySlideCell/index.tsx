import * as React from "react";
import { Switch } from "antd-mobile";
interface Props {}

interface State {}
export default class MySlideCell extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="my-slide-cell">
        <div className="left-cell">
          <div>
            <span></span>
            <span></span>
          </div>
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="right=cell">编辑</div>
      </div>
    );
  }
}
