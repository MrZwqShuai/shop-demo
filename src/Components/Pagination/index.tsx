import * as React from "react";
import "./index.scss";

type Props = {
  current: number;
  defaultCurrent?: number;
  total: number;
  visiable?: boolean;
};
type State = {};
export default class MyPagination extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div
        className="component-pagination-wrap"
        style={{ display: this.props.visiable ? "block" : "none" }}
      >
        <div>
          {this.props.current}/{this.props.total}
        </div>
      </div>
    );
  }

}
