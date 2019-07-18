import * as React from 'react';
import {inject, observer} from 'mobx-react';
import './index.scss';
import CommonModalComponent from './../common-modal/index';
interface Props {
  RootStore?: any;
}
interface State {}

@inject('RootStore')
@observer
export default class CartModalComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <CommonModalComponent>
        <div className="header">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <div className="body">
          <div className="sku-kind">
            <div className="sku-color">
              <span>颜222色</span>
              <div>
                <span>玫瑰红</span>
              </div>
            </div>
            <div className="sku-val">
              <span>规格</span>
              <div>
                <span>大的</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="sure-btn"
          onClick={() => {
            this.closeCartModal();
          }}
        >
          确认
        </div>
      </CommonModalComponent>
    );
  }

  private closeCartModal(): void {
    this.props.RootStore.toggleCartModalVisbile();
  }
}
