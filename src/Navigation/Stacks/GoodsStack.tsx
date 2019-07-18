import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import GoodsDetailPage from './../../Pages/Goods/GoodsDetail/index';
import GoodsCommentsPage from './../../Pages/Goods/GoodsComments/index';

export default class GoodsStack extends React.PureComponent {
  public render() {
    return (
      <div className="goods-stack-wrapper">
        <div className="goods-wrapper">
          <Switch>
            <Route path="/" component={GoodsDetailPage} />
            <Route path="/comments" component={GoodsCommentsPage} />
          </Switch>
        </div>
      </div>
    );
  }
}
