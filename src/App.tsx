// tslint:disable
import * as React from "react";
import "./App.scss";
import logo from "./logo.svg";
import "./Config/rem";
import AppRouter from "./Navigation/index";
import { inject, observer } from "mobx-react";
import { fetchAppAuth } from "./Api";
interface Props {
  RootStore?: any;
}
interface State {}

@inject("RootStore")
@observer
class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  public render() {
    return <AppRouter />;
  }
  public componentDidMount() {
    this.fetchAuth();
  }

  /**
   * 判断用户当前登录状态 可能token失效的情况 入口统一请求
   */
  private async fetchAuth(): Promise<void> {
    const { data } = await fetchAppAuth();
    console.log(data, "appauth");
    if (data.code === 0) {
      // 登录成功状态
      this.props.RootStore.setUserInfo(
        JSON.parse(localStorage.getItem("userInfo")) || {},
      );
    }
  }
}
export default App;
