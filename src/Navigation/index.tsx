import * as React from 'react';
import AppStack from './Stacks/AppStack';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AppRoute from './AppRoute';
import AuthStack from './Stacks/AuthStack';
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
