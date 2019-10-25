import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SettingPage from "../../Pages/Setting";

export default class SettingStack extends React.PureComponent {
  render() {
    return (
      <div>
        <Switch>
          {/* <Route
            path="/setting"
            exact
            render={() => <Redirect to="/setting" />}
          /> */}
          <Route path="/setting" component={SettingPage} />
        </Switch>
      </div>
    );
  }
}
