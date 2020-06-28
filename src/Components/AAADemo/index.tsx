import * as React from "react";
import "./index.scss";
interface Props {}

interface State {}

export default class Page extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="page"></div>;
  }
}
