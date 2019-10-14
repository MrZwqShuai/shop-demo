import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import "./index.scss";
import categoryIcon from "./assets/images/category.png";
import searchIcon from "./assets/images/search.png";
import personalIcon from "./assets/images/personal.png";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { hideHeaderPath } from "../../Config/common-route";

@inject("RootStore")
// @observer
@withRouter
export default class HeaderComponent extends React.Component {
  private currentSearch: string | number = "搜索你想要的商品";
  /**
   * render
   */
  public render() {
    console.log(1111111111111);
    const { user_id } = toJS(this.props.RootStore.userInfo);
    const { pathname } = this.props.location;
    const shouldHideHeader = hideHeaderPath.some((path: string) => {
      return pathname == path;
    });

    return shouldHideHeader ? null : (
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
          {this.renderLoginEntry(user_id)}
        </ul>
      </header>
    );
  }

  public componentWillReceiveProps(newVal) {}

  /**
   *
   * @param user_id user_id
   */
  private renderLoginEntry(user_id: boolean): JSX.Element {
    if (user_id) {
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
