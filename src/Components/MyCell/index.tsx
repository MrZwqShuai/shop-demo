import * as React from "react";
import { Icon, Toast } from "antd-mobile";
import "./index.scss";

interface Props {
  title: string;
  leftContent?: JSX.Element;
  centerContent?: JSX.Element;
  rightContent?: JSX.Element;
  onCellClick: (title: string) => void;
}

interface State {}
export default class MyCell extends React.PureComponent<Props, State> {
  static defaultProps = {
    title: "title",
    onCellClick: title => {
      console.log(title + "cell点击");
    },
  };
  render() {
    const { title, leftContent, centerContent, rightContent } = this.props;
    return (
      <div className="mycell-wrap" onClick={() => this.handleCellClick()}>
        <div className="left-content">
          {leftContent ? leftContent : <span>{title}</span>}
        </div>
        <div className="center-content">{centerContent}</div>
        <div className="right-content">
          {rightContent}
          <Icon type="right" />
        </div>
      </div>
    );
  }

  private handleCellClick(): void {
    Toast.info("老哥帮我写吧", 0.5);
    this.props.onCellClick(this.props.title);
  }
}
