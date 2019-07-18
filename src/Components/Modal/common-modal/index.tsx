import * as React from 'react';
import {inject, observer} from 'mobx-react';
import './index.scss';
interface Props {
  RootStore?: any;
}

interface State {}

@inject('RootStore')
@observer
export default class CommonModalComponent extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div>
        {this.props.RootStore.cartModalVisbile ? (
          <div
            className="cart-modal-wrapper"
            onClick={() => {
              this.closeCartModal();
            }}
          >
            <div
              className="cart-modal-main"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              {this.props.children}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  private closeCartModal(): void {
    this.props.RootStore.toggleCartModalVisbile();
  }
}
