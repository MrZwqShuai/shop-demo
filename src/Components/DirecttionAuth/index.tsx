import * as React from "react";
import { withRouter } from "react-router";
import { Toast } from "antd-mobile";

interface Porps {
  classname?: string;
  onPress?: () => void;
}

@withRouter
export default class DirectionAuth extends React.PureComponent<Porps> {
  static defaultProps = {
    onPress: () => {
      // Toast.info("没时间开发!", 1);
    },
  };
  render() {
    return (
      <div
        className={this.props.classname}
        onClick={() => this.handleDirecqtionAuthClick()}
      >
        {this.props.children}
      </div>
    );
  }

  private handleDirecqtionAuthClick(): void {
    const { onPress } = this.props;
    if (!(JSON.parse(localStorage.getItem("userInfo")) || {}).user_id) {
      Toast.info("请大哥先登录下阿!", 1);
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.props.history.push({ pathname: "/auth/login" });
      }, 1000);
    } else {
      onPress();
    }
  }
}
