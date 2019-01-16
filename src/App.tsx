// tslint:disable
import * as React from "react";
import "./App.scss";
import logo from "./logo.svg";
import './Config/rem';
import AppRouter from './Navigation/index';
class App extends React.Component {
  public render() {
    return (
      <AppRouter />
    );
  }
}
export default App;
