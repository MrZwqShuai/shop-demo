import * as React from "react";
import { Switch, Route } from "react-router-dom";
import GoodsSearchPage from "../../Pages/Goods/GoodsSearch/index";

export default class SeatchStack extends React.PureComponent {
  public render() {
    return (
      <div>
        <Switch>
          <Route path="/search" component={GoodsSearchPage} />
        </Switch>
      </div>
    );
  }

  public componentDidMount() {}
}
