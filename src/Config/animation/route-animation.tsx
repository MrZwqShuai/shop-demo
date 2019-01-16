import * as React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import styles from './route-animation.scss';
interface Props {
  path: string,
  show: boolean,
  match: any,
}
interface State {
}
const routeAnimation = function(WrappedComponent: any): any {
  return class extends React.Component<Props, State> {

    constructor(props: Props) {
      super(props);
      this.state = {
      };
    }
    render() {
      return (
        <CSSTransition
          in={this.props.match !== null}
          classNames={{
            enter: styles.starEnter,
            enterActive: styles.starEnterActive,
            exit: styles.starExit,
            exitActive: styles.starExitActive,
          }}
          timeout={500}
          mountOnEnter={true}
          unmountOnExit={true}
        >
        <div className={styles.appWrapperContent}>
            <WrappedComponent {...this.props} />
        </div>
        </CSSTransition>
      );
    }
    public componentDidMount(): void {}
  };
};

export default routeAnimation;
