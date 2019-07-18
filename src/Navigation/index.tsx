import * as React from 'react';
import AppStack from './Stacks/AppStack';
import {HashRouter as Router, Switch} from 'react-router-dom';
import AppRoute from './AppRoute';
import AuthStack from './Stacks/AuthStack';
import CartModalComponent from './../Components/Modal/cart-modal/index';
import GoodsStack from './Stacks/GoodsStack';
class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <AppRoute path="/auth" component={AuthStack} />
            <AppRoute path="/goods" component={GoodsStack} />
            <AppRoute path="/" component={AppStack} />
          </Switch>
          <CartModalComponent />
        </div>
      </Router>
    );
  }
}
export default AppRouter;
