import * as React from 'react';
import MySwiperComponent from './../../Components/MySwiper/index';
import routeAnimation from '../../Config/animation/route-animation';
import NavBarComponent from './components/nav-bar/index';
import HotAreaComponent from './components/hot-area/index';
import CheapAreaComponent from './components/cheap-area/index';
import ActivityAreaComponent from './components/activity-area/index';
import styles from './index.scss';
interface Props {

}

interface State {
  show: boolean;
}
const HomePage = routeAnimation(
  class HomePage extends React.Component<Props, State> {

    constructor(props: Props) {
      super(props);
      this.state = {
        show: true
      };
    }

    public render() {
      return (
        <div className={styles.homeWrapper}>
          {/* <MySwiperComponent /> */}
          <NavBarComponent />
          <HotAreaComponent />
          <CheapAreaComponent />
          <ActivityAreaComponent />
        </div>
      );
    }
    
    private toggleState(): void {
      this.setState({
        show: !this.state.show
      })
    }
   }
);
export default HomePage;
