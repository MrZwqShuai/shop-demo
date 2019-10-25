import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./../../Pages/Auth/Login/index";
import LogoutPage from "./../../Pages/Auth/Logout/index";
import FavouritePage from "../../Pages/Auth/Favourite";

export default class AuthStack extends React.PureComponent {
  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/auth"
            exact
            render={() => <Redirect to="/auth/login" />}
          />
          <Route path="/auth/login" component={LoginPage} />
          <Route path="/auth/logout" component={LogoutPage} />
          <Route path="/auth/favourite" component={FavouritePage} />
        </Switch>
      </div>
    );
  }
}
