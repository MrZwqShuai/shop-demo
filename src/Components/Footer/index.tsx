import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';
import iconHome from './assets/images/icon-home.jpg';
export default class FooterComponent extends React.PureComponent {
  /**
     * render
     */
  public render() {
    return (
      <footer className={styles.footerWrapper}>
        <ul className={styles.tabUl}>
          <li>
            <Link className={styles.tabLink} to="/home">
              <div className={styles.tabIcon}>
                <img src={iconHome} alt="首页" />
              </div>
              <span>首页</span>
            </Link>
          </li>
          <li>
            <Link className={styles.tabLink} to="/channel">
              <div className={styles.tabIcon}>
                <img src={iconHome} alt="首页" />
              </div>
              <span>分类</span>
            </Link>
          </li>
          <li>
            <Link className={styles.tabLink} to="/cart">
              <div className={styles.tabIcon}>
                <img src={iconHome} alt="首页" />
              </div>
              <span>购物车</span>
            </Link>
          </li>
          <li>
            <Link className={styles.tabLink} to="/my">
              <div className={styles.tabIcon}>
                <img src={iconHome} alt="首页" />
              </div>
              <span>我的</span>
            </Link>
          </li>
        </ul>
      </footer>
    );
  }
}
