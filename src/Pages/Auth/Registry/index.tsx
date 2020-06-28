import * as React from "react";
import { login, registry } from "./../../../Api/index";
import { inject, observer } from "mobx-react";
import "./index.scss";
import {
  Button,
  InputItem,
  WhiteSpace,
  Toast,
  NavBar,
  Icon,
} from "antd-mobile";
interface State {
  username: string;
  password: string;
}

interface Props {}

@observer
export default class RegistryPage extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  render() {
    return (
      <div className="login-wrap">
        <header>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.goBack()}
            rightContent={[<Icon key="1" type="ellipsis" />]}
          >
            账号注册
          </NavBar>
        </header>
        <div className="login-section">
          <InputItem
            clear
            placeholder="请输入手机号/QQ"
            onChange={(value) => {
              this.handleUsernameChange(value);
            }}
          />
          <InputItem
            type="password"
            clear
            placeholder="请输入密码"
            onChange={(value) => {
              this.handlePasswordChange(value);
            }}
          />
          <WhiteSpace />
          <WhiteSpace />
          <Button
            type="primary"
            disabled={Boolean(!this.state.username && !this.state.password)}
            style={{
              backgroundImage:
                "linear-gradient(90deg,#f10000,#ff2000 73%,#ff4f18)",
            }}
            onClick={() => this.registry()}
          >
            注册
          </Button>
          <WhiteSpace />
          <div
            className="registry-wrap"
            onClick={() => {
              this.props.history.push({
                pathname: "registry",
              });
            }}
          ></div>
        </div>
      </div>
    );
  }

  /**
   * 注册
   */
  private async registry(): Promise<any> {
    if (this.state.username && this.state.password) {
      Toast.loading("努力加载中...", 0);
      const { data } = await registry({
        username: this.state.username,
        password: this.state.password,
      });
      const { code, content, message } = data;
      console.log(data, "哈哈哈");
      if (code === 0) {
        Toast.success(message, 1);
        const timer = setTimeout(() => {
          this.props.history.push({
            pathname: "/auth/login",
            query: { from: "registry" },
          });
          clearTimeout(timer);
        }, 1000);
      }
    }
  }

  /**
   *
   * @param username 账号
   */
  public handleUsernameChange(username: string): void {
    this.setState({
      username: username,
    });
  }

  /**
   *
   * @param password 密码
   */
  public handlePasswordChange(password: string): void {
    this.setState({
      password: password,
    });
  }

  public goBack() {
    this.props.history.goBack();
  }
}
