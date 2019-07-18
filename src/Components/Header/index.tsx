import * as React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import categoryIcon from "./assets/images/category.png";
import searchIcon from "./assets/images/search.png";
import personalIcon from "./assets/images/personal.png";
import { inject, observer } from "mobx-react";

@inject("RootStore")
@observer
export default class HeaderComponent extends React.PureComponent {
  private currentSearch: string | number = "搜索你想要的商品";
  /**
   * render
   */
  public render() {
    const { isLogin } = this.props.RootStore;
    return (
      <header className="headerWrapper">
        <ul className="headerUl">
          <li className="headerLeft">
            <Link to="/channel">
              <div>{/* <img src={categoryIcon} alt="分类" /> */}</div>
            </Link>
          </li>
          <li className="headerCenter">
            <Link to="/search">
              <div className="search">
                <div className="searchBtn">
                  <img src={searchIcon} alt="搜索" />
                </div>
                <span className="searchInp">{this.currentSearch}</span>
              </div>
            </Link>
          </li>
          {this.renderLoginEntry(isLogin)}
        </ul>
      </header>
    );
  }

  public componentDidMount() {}

  /**
   *
   * @param isLogin 当前登录状态
   */
  private renderLoginEntry(isLogin: boolean): JSX.Element {
    if (isLogin) {
      return (
        <li className="headerRight">
          <Link to="/my">
            <img className="personalIcon" src={personalIcon} alt="" />
          </Link>
        </li>
      );
    } else {
      return (
        <li className="headerRight">
          <Link to="/auth">登录</Link>
        </li>
      );
    }
  }

  // public navigateMyPage(): void {}
}
