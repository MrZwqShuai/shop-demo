import * as React from 'react';
import {Route, Redirect} from 'react-router-dom';
import HomePage from './../../Pages/App/Home/index';
import MyPage from './../../Pages/App/My/index';
import ChannelPage from './../../Pages/App/Channel/index';
import ShoppingCartPage from './../../Pages/App/ShoppingCart/index';
import HeaderComponent from './../../Components/Header/index';
import FooterComponent from './../../Components/Footer/index';
import '../../App.scss';
export default class AppStack extends React.PureComponent {
  public render() {
    return (
      <div>
        <HeaderComponent />
        <div className="appWrapper">
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <Route
            path="/home"
            children={props => {
              return <HomePage {...props} />;
            }}
          />
          <Route
            path="/channel"
            children={props => {
              return <ChannelPage {...props} />;
            }}
          />
          <Route
            path="/cart"
            children={props => {
              return <ShoppingCartPage {...props} />;
            }}
          />
          <Route
            path="/my"
            children={props => {
              return <MyPage {...props} />;
            }}
          />
        </div>
        <FooterComponent />
      </div>
    );
  }

  /**
   * componentDidMounted
   */
  public componentDidMount() {}
}
