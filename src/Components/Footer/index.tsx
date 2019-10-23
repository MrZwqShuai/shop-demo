import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import "./index.scss";
import { hideFooterPath } from "../../Config/common-route";
interface TabBar {
  path: string;
  name: string;
  clsName: string;
}
interface Props {}
interface State {
  tabbars: Array<TabBar>;
  activeIdx: number;
}
@withRouter
export default class FooterComponent extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tabbars: [
        {
          path: "/home",
          name: "首页",
          clsName: "home",
        },
        {
          path: "/channel",
          name: "分类",
          clsName: "channel",
        },
        {
          path: "/cart",
          name: "购物车",
          clsName: "cart",
        },
        {
          path: "/my",
          name: "我的",
          clsName: "my",
        },
      ],
      activeIdx: 0,
    };
  }
  /**
   * render
   */
  public render() {
    const { pathname } = this.props.location;
    const { tabbars, activeIdx } = this.state;
    const shouldHideFooter = hideFooterPath.some((path: string) => {
      return pathname == path;
    });
    return shouldHideFooter ? null : (
      <footer className="footerWrapper">
        <ul className="tabUl">
          {tabbars.map((tabbar: TabBar, index: number) => {
            return (
              <li
                onClick={() => {
                  this.handleTabBarChange(index);
                }}
                key={index}
              >
                <Link className="tabLink" to={tabbar.path}>
                  <div
                    className={`tabIcon ${
                      index == activeIdx
                        ? tabbar.clsName + "-active"
                        : tabbar.clsName
                    }`}
                  ></div>
                  <span>{tabbar.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </footer>
    );
  }

  componentDidMount() {
    console.log(this.props, "------");
    const { pathname } = this.props.location;
    this.state.tabbars.forEach((tab: TabBar, index: number) => {
      if (tab.path == pathname) {
        this.setState({
          activeIdx: index,
        });
      }
    });
  }

  /**
   * foot tab toggle
   * @param {number} index tabbar的下标
   */
  handleTabBarChange(index: number) {
    this.setState({
      activeIdx: index,
    });
  }
}
