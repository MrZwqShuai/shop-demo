import React from 'react';
import {Route} from 'react-router-dom';
interface Props {
  path: string;
  component: any;
}
class AppRoute extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  componentWillMount() {}
  render() {
    const {component: Component, ...rest} = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          return <Component {...props} />;
        }}
      />
    );
  }
}
// function PrivateRoute({ component: Component, ...rest }) {
//   return <Route {...rest} render={(props) => <Component {...props} />} />;
// }

export default AppRoute;
