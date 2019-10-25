import * as React from "react";
import AppStack from "./Stacks/AppStack";
import { HashRouter as Router, Switch } from "react-router-dom";
import AppRoute from "./AppRoute";
import AuthStack from "./Stacks/AuthStack";
import CartModalComponent from "./../Components/Modal/cart-modal/index";
import GoodsStack from "./Stacks/GoodsStack";
import SeatchStack from "./Stacks/SearchStaack";
import SettingStack from "./Stacks/SettingStack";
class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <AppRoute path="/auth" component={AuthStack} />
            <AppRoute path="/goods" component={GoodsStack} />
            <AppRoute path="/search" component={SeatchStack} />
            <AppRoute path="/setting" component={SettingStack} />
            <AppRoute path="/" component={AppStack} />
          </Switch>
          <CartModalComponent />
        </div>
      </Router>
    );
  }
}
export default AppRouter;
