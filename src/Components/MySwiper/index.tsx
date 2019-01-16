import * as React from 'react';
import styles from './index.scss';
import BScroll from 'better-scroll';
import { Banner } from './shared/banner.interface';
import bannerImg from './assets/images/banner.jpg';

interface Props {
  loop?: boolean;
  bannerList: Array<Banner>;
};

interface State {
  currentPage: number;
  dots: Array<any>;
};

export default class MySwiperComponent extends React.Component<Props, State> {
  static defaultProps = {
    bannerList: [{name: 'banner1'},{name: 'banner2'}],
    autoPlay: true,
    interval: 4000,
    loop: true
  };

  private initTimer: number | any;
  private swiper: any;
  private mySwiper: any;
  private mySwiperGroup: any;
  private mySwiperChildren: any;
  // 小圆点

  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      currentPage: 0,
      dots: []
    };
    this.mySwiper = React.createRef();
    this.mySwiperGroup = React.createRef();
  }
  
  public render() {
    const { bannerList } = this.props;
    return (
      <div ref={this.mySwiper} className={styles.swiperWrapper}>
        <div ref={this.mySwiperGroup} className={styles.swiperGroup}>
          {bannerList.map((item: Banner, index: number) => {
            return (
              <div key={index} className={styles.sliderItem}>
                <img src={bannerImg} alt="banner"/>
              </div>
            )
          })}
        </div>
    <div className={styles.dots}>
    {this.state.dots.map((dot, index) => {
      return (
        <span key={dot} className={`${styles.dot} ${this.state.currentPage === index ? styles.active : ''}`} ></span>
      );
    })}
    </div>
      </div>
    );
  }

  public componentDidMount() {
    this.update();
  }

  public shouldComponentUpdate(newProps: Props): boolean {
    return true;
  }

  public componentWillMount() {
    // 清楚内存;
    clearTimeout(this.initTimer);
  }

  /**
   * 初始化swiper的小圆点
   */
  private initDots(): void {
    let dots = [];
    this.props.bannerList.map((banner, index) => {
      dots.push(index);
    })
    this.setState({
      dots: dots
    })
  }
  /**
   * 初始化swiper
   */
  private initSwiper(){
    this.swiper = new BScroll(this.mySwiper.current, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
          loop: true,
          speed: 400
      },
      stopPropagation: true
  });
  this.swiper.on('scrollEnd', this.onScrollEnd.bind(this));

  }

  /**
   * 计算banner的宽度
   */
  private initSwiperWidth() {
   function hasClass(el: any, className: string) {
      return el.classList.contains(className)
  }
    function addClass(el: any, className: string) {
      if (hasClass(el, className)) {
          return;
      }
      el.classList.add(className)
  }
    this.mySwiperChildren = this.mySwiperGroup.current.children;
    let width = 0;
    const sliderWidth = this.mySwiper.current.clientWidth;
    for (const child of this.mySwiperChildren) {
        addClass(child, 'slider-item');
        width += sliderWidth;
        child.style.width = `${sliderWidth}px`
    }
    this.mySwiperGroup.current.style.width = `${width}px`
  }

  private update():void {
    if(this.swiper) {
      this.swiper.deqstory();
    }
    
    this.initSwiperWidth();
    this.initTimer = setTimeout(() => {
      this.initDots();
      this.initSwiper();
    }, 20);
  }

  private onScrollEnd(): void {
    let pageIndex = this.swiper.getCurrentPage().pageX;
    this.setState({
      currentPage: pageIndex
    });
    // if (this.autoPlay) {
    //   this._play()
    // }
  }
  
}
