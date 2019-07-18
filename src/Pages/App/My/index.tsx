import * as React from 'react';
import routeAnimation from '../../../Config/animation/route-animation';
const MyPage = routeAnimation(
  class MyPage extends React.Component {
    public render() {
      return (
        <div>
          <h5>我的</h5>
          <h5>我的</h5>
          <h5>我的</h5>
          <h5>我的</h5>
          <h5>我的</h5>
          <h5>我的</h5>
        </div>
      );
    }
  }
);
export default MyPage;
