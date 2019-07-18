import * as React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import './route-animation.scss';
interface Props {
  path: string;
  show: boolean;
  match: any;
}
interface State {}
const routeAnimation = function(WrappedComponent: any): any {
  return class extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {};
    }
    render() {
      return (
        <CSSTransition
          in={this.props.match !== null}
          classNames={{
            enter: 'starEnter',
            enterActive: 'starEnterActive',
            exit: 'starExit',
            exitActive: 'starExitActive',
          }}
          timeout={500}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div className="appWrapperContent">
            <WrappedComponent {...this.props} />
          </div>
        </CSSTransition>
      );
    }
    public componentDidMount(): void {}
  };
};

export default routeAnimation;
