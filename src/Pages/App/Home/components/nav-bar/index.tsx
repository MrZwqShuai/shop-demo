import * as React from 'react';
import './index.scss';
export default class NavBarComponent extends React.PureComponent {
  public render() {
    return (
      <div className="navWrapper">
        <ul>
          <li className="navItem">
            <span className="itemIcon"><img src="http://47.98.137.213/uploads/shop/nav1.png" alt="导航"/></span><span>服装</span>
          </li>
          <li className="navItem">
            <span className="itemIcon"><img src="http://47.98.137.213/uploads/shop/nav2.png" alt="导航"/></span><span>服装</span>
          </li>
          <li className="navItem">
            <span className="itemIcon"><img src="http://47.98.137.213/uploads/shop/nav3.png" alt="导航"/></span><span>服装</span>
          </li>
          <li className="navItem">
            <span className="itemIcon"><img src="http://47.98.137.213/uploads/shop/nav4.png" alt="导航"/></span><span>服装</span>
          </li>
          <li className="navItem">
            <span className="itemIcon"><img src="http://47.98.137.213/uploads/shop/nav5.png" alt="导航"/></span><span>服装</span>
          </li>
          <li className="navItem">
            <span className="itemIcon"><img src="http://47.98.137.213/uploads/shop/nav6.png" alt="导航"/></span><span>服装</span>
          </li>
          <li className="navItem">
            <span className="itemIcon"><img src="http://47.98.137.213/uploads/shop/nav7.png" alt="导航"/></span><span>服装</span>
          </li>
          <li className="navItem">
            <span className="itemIcon"><img src="http://47.98.137.213/uploads/shop/nav8.png" alt="导航"/></span><span>服装</span>
          </li>
        </ul>
      </div>
    )
  }
}