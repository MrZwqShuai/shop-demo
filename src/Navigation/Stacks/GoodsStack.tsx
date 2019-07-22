import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import GoodsDetailPage from "./../../Pages/Goods/GoodsDetail/index";
import GoodsCommentsPage from "./../../Pages/Goods/GoodsComments/index";
import GoodsSearchPage from "../../Pages/Goods/GoodsSearch/index";

export default class GoodsStack extends React.PureComponent {
  public render() {
    return (
      <div>
        <Switch>
          {/* <Route
            path="/goods"
            exact
            render={() => <Redirect to="/goods/comments" />}
          /> */}
          <Route path="/goods" exact component={GoodsDetailPage} />
          <Route path="/goods/comments" component={GoodsCommentsPage} />
        </Switch>
      </div>
    );
  }

  public componentDidMount() {}
}
