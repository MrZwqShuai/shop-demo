import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SettingPage from "../../Pages/Setting";
import SettingPersonalPage from "../../Pages/Setting/Personal";
import SettingPersonalAvatarPage from "../../Pages/Setting/PersonalAvatar";

export default class SettingStack extends React.PureComponent {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/setting" component={SettingPage} />
          <Route
            exact
            path="/setting/personal"
            component={SettingPersonalPage}
          />
          <Route
            path="/setting/personal/avatar"
            children={props => {
              return <SettingPersonalAvatarPage {...props} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
