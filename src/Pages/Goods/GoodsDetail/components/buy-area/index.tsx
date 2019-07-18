import * as React from 'react';
import {inject, observer} from 'mobx-react';
import './index.scss';
import arrowRight from '../../../../../Assets/images/arrow-right.png';
interface Props {
  goodsId?: string;
}
interface State {
  followed: boolean;
}

@inject('RootStore')
@observer
export default class BuyAreaComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      followed: false,
    };
  }

  public render() {
    return (
      <div className="buy-area-wrapper ">
        <div className="goods-wrap m1">
          <div className="goods-name">
            A家 家具 沙发 布艺沙发
            可拆洗透气绒布客厅家具组合套装懒人北欧现代简约小户型布沙发 灰色
            三人位+中位+右贵妃位
          </div>
          <span className="goods-line" />
          <div
            className="goods-star"
            onClick={() => {
              this.follow(this.props.goodsId);
            }}
          >
            <span
              className={`goods-star-icon ${
                this.state.followed ? 'star-active' : null
              }`}
            />
            <span>关注</span>
          </div>
        </div>
        <div className="goods-price m1">
          <span className="price-prefix">￥</span>
          <em className="price-">1799</em>
          <span>.00</span>
        </div>
        <div className="goods-sku m1">
          {this.renderCell('规格', '已选: 4人座')}
        </div>
        <div className="goods-sku m1">
          {this.renderCell('参数', '品牌型号')}
        </div>
        <div className="goods-sku m1">
          {this.renderCell('送至', '芜湖市鸠江区龙山新苑')}
        </div>
      </div>
    );
  }

  private renderCell(textView: string, linearLayout: string) {
    return (
      <div
        className="cell-wrap"
        onClick={() => {
          this.showSku();
        }}
      >
        <div className="cell-left">
          <div className="text-view">{textView}</div>
          <div className="linear-layout">{linearLayout}</div>
        </div>
        <div className="icon-font-view">
          <img src={arrowRight} alt="" />
        </div>
      </div>
    );
  }

  /**
   * 商品关注
   * @param goodsId 商品id
   */
  private follow(goodsId: string): void {
    this.setState({
      followed: !this.state.followed,
    });
  }

  private showSku(): void {
    this.props.RootStore.toggleCartModalVisbile();
  }
}
