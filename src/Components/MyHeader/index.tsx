import * as React from "react";
import { WhiteSpace, Icon, NavBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
import "./index.scss";
import MyPropover from "../MyPropover";
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
            rightContent={
              rightContent || (
                <MyPropover>
                  <Icon key="1" type="ellipsis" />
                </MyPropover>
              )
            }
          >
            {centerContent}
          </NavBar>
        </header>
      </div>
    );
  }

  /**
   * 返回上一页
   */
  public goBack() {
    this.props.history.goBack();
  }
}
