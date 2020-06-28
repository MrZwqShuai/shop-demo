import * as React from "react";
import { inject, observer } from "mobx-react";
import "./index.scss";
interface Props {
  RootStore?: any;
  modalVisibleType: string;
}

interface State {}

@inject("RootStore")
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
    const { modalVisibleType, RootStore } = this.props;
    const { modalVisible } = RootStore;
    return (
      <div>
        {modalVisible[modalVisibleType] ? (
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
    const { modalVisibleType, RootStore } = this.props;
    RootStore.toggleModalVisible(modalVisibleType);
  }
}
