import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SettingPage from "../../Pages/Setting";
import SettingPersonalPage from "../../Pages/Setting/Personal";
import SettingPersonalAvatarPage from "../../Pages/Setting/PersonalAvatar";
import SettingShoppingAddressPage from "../../Pages/Setting/ShoppingAddress";
import SettingShoppingAddressDetailPage from "../../Pages/Setting/ShoppingAddressDetail";

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
          <Route
            exact
            path="/setting/my_address"
            component={SettingShoppingAddressPage}
          />
          <Route
            exact
            path="/setting/my_address/detail/:id"
            component={SettingShoppingAddressDetailPage}
          />
          <Route
            exact
            path="/setting/my_address/detail"
            component={SettingShoppingAddressDetailPage}
          />
        </Switch>
      </div>
    );
  }
}
