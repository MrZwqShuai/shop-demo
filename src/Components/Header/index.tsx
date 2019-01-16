import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';
import categoryIcon from './assets/images/category.png';
import searchIcon from './assets/images/search.png';
export default class HeaderComponent extends React.PureComponent {

  private currentSearch: string | number = "搜索你想要的商品"
  /**
     * render
     */
  public render() {
    return (
      <header className={styles.headerWrapper}>
        <ul className={styles.headerUl}>
          <li className={styles.headerLeft}>
            <Link to="/channel">
              <div>
                <img src={categoryIcon} alt="分类"/>
              </div>
            </Link>
          </li>
          <li className={styles.headerCenter}>
            <Link to="/search">
            <div className={styles.search}>
            <div className={styles.searchBtn}>
            <img src={searchIcon} alt="搜索"/>
            </div>
            <span className={styles.searchInp}>
             {this.currentSearch}
            </span>
            </div>
            </Link>
          </li>
          <li className={styles.headerRight}>
            <Link to="/auth">登陆</Link>
          </li>
        </ul>
      </header>
    );
  }
}
