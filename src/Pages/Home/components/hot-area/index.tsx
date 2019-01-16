import * as React from 'react';
import styles from './index.scss';
export default class HotAreaComponent extends React.PureComponent {
  public render() {
    return (
      <div className={styles.hotWrapper}>
        <div className={styles.hotTitle}>
          <h5>热卖专区</h5>
          <span>更多精彩></span>
        </div>
        <div className={styles.hotContent}>
          <div className={styles.hotContentLeft}>
          <img src="http://mcdn.pinduoduo.com/assets/img/mpdd_global.png" alt=""/></div>
          <div className={styles.hotContentRight}>
          <img src="http://mcdn.pinduoduo.com/assets/img/cat_girlshoes_2.jpg" alt=""/></div>
        </div>
      </div>
    )
  }
}