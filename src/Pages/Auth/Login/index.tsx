import * as React from "react";
import { login } from "./../../../Api/index";
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

@inject("RootStore")
@observer
export default class LoginPage extends React.PureComponent<Props, State> {
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
            登录
          </NavBar>
        </header>
        <div className="login-section">
          <InputItem
            clear
            placeholder="用户名/手机号"
            onChange={value => {
              this.handleUsernameChange(value);
            }}
          />
          <InputItem
            type="password"
            clear
            placeholder="请输入密码"
            onChange={value => {
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
            onClick={() => this.login()}
          >
            登录
          </Button>
        </div>
      </div>
    );
  }

  /**
   * 登录
   */
  private async login(): Promise<any> {
    if (this.state.username && this.state.password) {
      Toast.loading("努力加载中...", 0);
      const { data } = await login({
        username: this.state.username,
        password: this.state.password,
      });
      const { content, message } = data;
      console.log(data, "dasdsd");
      // return;
      if (content === 1) {
        Toast.fail(message, 2);
      } else if (content === 2) {
        Toast.fail(message, 2);
      } else {
        // 设置token 到本地缓存
        // localStorage.setItem("token", String(content.token));
        localStorage.setItem(
          "userInfo",
          JSON.stringify(
            Object.assign(
              {
                token: content.token,
              },
              content.userInfo,
            ),
          ),
        );
        // this.props.RootStore.setUserInfo(content.userInfo);
        Toast.success("登录成功", 2);
        const loginTimer = setTimeout(() => {
          clearTimeout(loginTimer);
          this.props.history.go(-1);
        }, 800);
        this.props.RootStore.setLogin(true);
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
