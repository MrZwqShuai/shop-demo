import * as React from 'react';
import {withRouter} from 'react-router-dom';
import MySwiperComponent from './../../../Components/MySwiper/index';
import {Banner} from './../../../Components/MySwiper/shared/banner.interface';
import BuyAreaComponent from './components/buy-area/index';
import CommentsAreaComponent from './components/comments-area/index';
import GuessAreaComponent from './components/guess-area/index';
import './index.scss';
import BuyBarComponent from './../../../Components/BuyBar/index';
interface Props {}

interface State {
  banners: Array<Banner>;
}
interface State {}

export default class GoodsDetailPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      banners: [
        {
          name: 'banner1',
          src: '',
          url: '',
        },
      ],
    };
  }
  public render() {
    return (
      <div className="goods-detail-wrapper">
        <MySwiperComponent />
        <div className="buy-comments-area">
          <BuyAreaComponent />
          <CommentsAreaComponent />
        </div>
        <GuessAreaComponent />
        <BuyBarComponent />
      </div>
    );
  }

  public componentDidMount() {
    console.log(this.props.location.state, '--222---');
  }
}
