import * as React from "react";
import "./index.scss";
export default class NavBarComponent extends React.PureComponent {
  public render() {
    return (
      <div className="navWrapper">
        <ul>
          <li className="navItem">
            <span className="itemIcon">
              <img
                src="//gw.alicdn.com/tfs/TB1ISdWSFXXXXbFXXXXXXXXXXXX-146-147.png_110x10000.jpg"
                alt="导航"
              />
            </span>
            <span>服装</span>
          </li>
          <li className="navItem">
            <span className="itemIcon">
              <img
                src="//gw.alicdn.com/tfs/TB1wSoFa5qAXuNjy1XdXXaYcVXa-196-196.png?avatar=1_110x10000.jpg"
                alt="导航"
              />
            </span>
            <span>服装</span>
          </li>
          <li className="navItem">
            <span className="itemIcon">
              <img
                src="//gw.alicdn.com/tfs/TB1Jc0fSFXXXXXTapXXXXXXXXXX-146-147.png_110x10000.jpg"
                alt="导航"
              />
            </span>
            <span>服装</span>
          </li>
          <li className="navItem">
            <span className="itemIcon">
              <img
                src=" //gw.alicdn.com/tfs/TB15lhOSFXXXXaKXpXXXXXXXXXX-147-147.png_110x10000.jpg"
                alt="导航"
              />
            </span>
            <span>服装</span>
          </li>
          <li className="navItem">
            <span className="itemIcon">
              <img
                src="https://s10.mogucdn.com/mlcdn/c45406/190903_3a3ig0h35k5kbil97k65lfg65l90d_150x150.jpg "
                alt="导航"
              />
            </span>
            <span>服装</span>
          </li>
          <li className="navItem">
            <span className="itemIcon">
              <img
                src=" https://s10.mogucdn.com/mlcdn/c45406/190903_71ih092j1k9chh2bjdghh2jl054a4_150x150.jpg"
                alt="导航"
              />
            </span>
            <span>服装</span>
          </li>
          <li className="navItem">
            <span className="itemIcon">
              <img
                src="https://s10.mogucdn.com/mlcdn/c45406/190903_0572el03440fllf207k3g5kfe6g35_150x150.jpg "
                alt="导航"
              />
            </span>
            <span>服装</span>
          </li>
          <li className="navItem">
            <span className="itemIcon">
              <img
                src=" https://s10.mogucdn.com/mlcdn/c45406/190903_5d6kbh7jc3k4i3c639i77d12i2ai6_150x150.jpg"
                alt="导航"
              />
            </span>
            <span>服装</span>
          </li>
        </ul>
      </div>
    );
  }
}
