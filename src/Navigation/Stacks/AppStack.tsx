import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import HomePage from './../../Pages/Home/index';
import MyPage from './../../Pages/My/index';
import ChannelPage from './../../Pages/Channel/index';
import ShoppingCartPage from './../../Pages/ShoppingCart/index';
import HeaderComponent from './../../Components/Header/index';
import FooterComponent from './../../Components/Footer/index';
import styles from '../../App.scss'
export default class AppStack extends React.PureComponent {
  public render() {
    return (
      <div>
        <HeaderComponent />
        <div className={styles.appWrapper}>
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <Route
            path="/home"
            children={(props) => {
              console.log(this.props,props, '-----home------');
              return <HomePage {...props} />;
            }}
          />
          <Route
            path="/channel"
            children={(props) => {
              console.log(this.props,props, '-----channel------');
              return <ChannelPage {...props} />;
            }}
          />
          <Route
            path="/cart"
            children={(props) => {
              return <ShoppingCartPage {...props} />;
            }}
          />

          <Route
            path="/my"
            children={(props) => {
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
  public componentDidMount() {
  }

}
