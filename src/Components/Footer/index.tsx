import * as React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
export default class FooterComponent extends React.PureComponent {
  /**
     * render
     */
  public render() {
    return (
      <footer className="footerWrapper">
        <ul className="tabUl">
          <li>
            <Link className="tabLink" to="/home">
              <div className="tabIcon">
                <img src="http://47.98.137.213/uploads/shop/tab1.png" alt="首页" />
              </div>
              <span>首页</span>
            </Link>
          </li>
          <li>
            <Link className="tabLink" to="/channel">
              <div className="tabIcon">
                <img src="http://47.98.137.213/uploads/shop/tab2.png" alt="分类" />
              </div>
              <span>分类</span>
            </Link>
          </li>
          <li>
            <Link className="tabLink" to="/cart">
              <div className="tabIcon">
                <img src="http://47.98.137.213/uploads/shop/tab3.png" alt="购物车" />
              </div>
              <span>购物车</span>
            </Link>
          </li>
          <li>
            <Link className="tabLink" to="/my">
              <div className="tabIcon">
                <img src="http://47.98.137.213/uploads/shop/tab4.png" alt="个人中心" />
              </div>
              <span>我的</span>
            </Link>
          </li>
        </ul>
      </footer>
    );
  }
}
