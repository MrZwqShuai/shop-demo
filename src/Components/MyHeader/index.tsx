import * as React from "react";
import { WhiteSpace, Icon, NavBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
import "./index.scss";
interface Props {
  centerContent: JSX.Element;
  rightContent: Array<JSX.Element>;
  handleLeftClick: () => void;
}
interface State {}
@withRouter
export default class MyHeader extends React.PureComponent<Props, State> {
  static defaultProps = {
    rightContent: [<Icon key="1" type="ellipsis" />],
    handleLeftClick: () => {
      console.log("点击...");
    },
    centerContent: <span>商城demo</span>,
  };
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { centerContent, rightContent, handleLeftClick } = this.props;
    return (
      <div className="myheader-wrap">
        <header>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.goBack()}
            rightContent={rightContent || [<Icon key="1" type="ellipsis" />]}
          >
            {centerContent}
          </NavBar>
        </header>
      </div>
    );
  }

  public goBack() {
    this.props.history.goBack();
  }
}
