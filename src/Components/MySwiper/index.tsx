// import * as React from "react";
// import "./index.scss";
// import { Banner } from "./shared/banner.interface";

// interface Props {
//   loop?: boolean;
//   banners: Array<Banner>;
// }

// interface State {
//   currentPage: number;
//   dots: Array<any>;
// }

// export default class MySwiperComponent extends React.Component<Props, State> {
//   static defaultProps = {
//     banners: [
//       { name: "banner1", src: "http://47.98.137.213/uploads/shop/banner1.jpg" },
//       { name: "banner2", src: "http://47.98.137.213/uploads/shop/banner2.jpg" },
//       { name: "banner4", src: "http://47.98.137.213/uploads/shop/banner4.jpg" },
//     ],
//     autoPlay: true,
//     interval: 4000,
//     loop: true,
//   };

//   private initTimer: number | any;
//   private swiper: any;
//   private mySwiper: any;
//   private mySwiperGroup: any;
//   private mySwiperChildren: any;
//   // 小圆点

//   constructor(props: Props, state: State) {
//     super(props);
//     this.state = {
//       currentPage: 0,
//       dots: [],
//     };
//     this.mySwiper = React.createRef();
//     this.mySwiperGroup = React.createRef();
//   }

//   public render() {
//     const { banners } = this.props;
//     return (
//       <div ref={this.mySwiper} className="swiperWrapper">
//         <div ref={this.mySwiperGroup} className="swiperGroup">
//           {banners.length &&
//             banners.map((item: Banner, index: number) => {
//               return (
//                 <div key={index} className="sliderItem">
//                   <img src={item.src} alt="banner" />
//                 </div>
//               );
//             })}
//         </div>
//         <div className="dots">
//           {this.state.dots.map((dot, index) => {
//             return (
//               <span
//                 key={dot}
//                 className={`dot ${
//                   this.state.currentPage === index ? "active" : ""
//                 }`}
//               />
//             );
//           })}
//         </div>
//       </div>
//     );
//   }

//   public componentDidMount() {
//     this.update();
//   }

//   public shouldComponentUpdate(newProps: Props): boolean {
//     return true;
//   }

//   public componentWillMount() {
//     // 清楚内存;
//     clearTimeout(this.initTimer);
//   }

//   /**
//    * 初始化swiper的小圆点
//    */
//   private initDots(): void {
//     let dots = [];
//     this.props.banners.map((banner, index) => {
//       dots.push(index);
//     });
//     this.setState({
//       dots: dots,
//     });
//   }
//   /**
//    * 初始化swiper
//    */
//   private initSwiper() {
//     this.swiper = new BScroll(this.mySwiper.current, {
//       click: true,
//       scrollX: true,
//       scrollY: false,
//       momentum: false,
//       snap: {
//         loop: true,
//         speed: 400,
//       },
//       stopPropagation: true,
//     });
//     this.swiper.on("scrollEnd", this.onScrollEnd.bind(this));
//   }

//   /**
//    * 计算banner的宽度
//    */
//   private initSwiperWidth() {
//     function hasClass(el: any, className: string) {
//       return el.classList.contains(className);
//     }
//     function addClass(el: any, className: string) {
//       if (hasClass(el, className)) {
//         return;
//       }
//       el.classList.add(className);
//     }
//     this.mySwiperChildren = this.mySwiperGroup.current.children;
//     let width = 0;
//     const sliderWidth = this.mySwiper.current.clientWidth;
//     for (const child of this.mySwiperChildren) {
//       addClass(child, "slider-item");
//       width += sliderWidth;
//       child.style.width = `${sliderWidth}px`;
//     }
//     this.mySwiperGroup.current.style.width = `${width}px`;
//   }

//   private update(): void {
//     if (this.swiper) {
//       this.swiper.deqstory();
//     }

//     this.initSwiperWidth();
//     this.initTimer = setTimeout(() => {
//       this.initDots();
//       this.initSwiper();
//     }, 20);
//   }

//   private onScrollEnd(): void {
//     let pageIndex = this.swiper.getCurrentPage().pageX;
//     this.setState({
//       currentPage: pageIndex,
//     });
//     // if (this.autoPlay) {
//     //   this._play()
//     // }
//   }
// }

import * as React from "react";
import { Carousel, WingBlank } from "antd-mobile";

interface Props {
  datasource: string[];
  layout: string;
}

interface State {}

export default class MySwiperComponent extends React.Component<Props, State> {
  state = {
    data: ["1", "2", "3"],
    imgHeight: 176,
  };
  static defaultProps = {
    datasource: [
      "http://47.98.137.213/uploads/shop/banner1.jpg",
      "http://47.98.137.213/uploads/shop/banner2.jpg",
      "http://47.98.137.213/uploads/shop/banner4.jpg",
    ],
    layout: "normal",
  };
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const { datasource, layout } = this.props;
    return (
      <WingBlank>
        <Carousel
          className="space-carousel"
          frameOverflow="visible"
          cellSpacing={layout == "normal" ? 0 : 10}
          slideWidth={layout == "normal" ? 1 : 0.8}
          autoplay
          infinite
          beforeChange={(from, to) =>
            console.log(`slide from ${from} to ${to}`)
          }
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {Array.isArray(datasource) &&
            datasource.length &&
            datasource.map((val, index) => (
              <a
                key={val}
                href="http://www.alipay.com"
                style={{
                  display: "block",
                  position: "relative",
                  top:
                    this.state.slideIndex === index
                      ? layout == "normal"
                        ? 0
                        : -10
                      : 0,
                  height: this.state.imgHeight,
                  boxShadow: "2px 1px 1px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src={val}
                  alt=""
                  style={{ width: "100%", verticalAlign: "top" }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event("resize"));
                    this.setState({ imgHeight: "auto" });
                  }}
                />
              </a>
            ))}
        </Carousel>
      </WingBlank>
    );
  }
}
