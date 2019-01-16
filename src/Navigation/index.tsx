import * as React from 'react';
import AppStack from './Stacks/AppStack';
import LoginStack from './Stacks/LoginStack';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AppRoute from './AppRoute';
import LoginPage from './../Pages/Auth/Login/index';
import AuthStack from './Stacks/AuthStack';
import EmptyPage from './../Pages/Empty/index';
class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <AppRoute path="/auth" component={AuthStack} />
            <AppRoute path="/" component={AppStack} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default AppRouter;
