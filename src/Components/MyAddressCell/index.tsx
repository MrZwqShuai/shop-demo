import * as React from "react";
import "./index.scss";
import addressEditIcon from "./assets/images/address-edit.png";
import positionIcon from "./assets/images/position.png";
import { Toast } from "antd-mobile";
import { withRouter } from "react-router";
import { observer, inject } from "mobx-react";
interface Address {
  // address id 用于删除编辑
  id: number;
  concat: string;
  detail_address: string;
  phone: string;
  address_tag_name?: string;
  constom_dic_name?: string;
}
interface Props {
  // 如果forchoose是true的话则是用来商品详情里面的选择 否则是收货地址
  forChoose: boolean;
  address: Address;
  addressInfo: Address;
  showMask: boolean;
  onMaskClick?: (e) => void;
  onCopyAddress?: () => void;
  onSetDefaultAddress?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onLongPress?: () => void;
}

interface State {}
@inject("RootStore", "ModalStore")
@observer
@withRouter
export default class MyAddressCell extends React.PureComponent<Props, State> {
  static defaultProps = {
    address: {},
    showMask: false,
    onCopyAddress: () => {},
    onSetDefaultAddress: () => {},
    onDelete: () => {},
    forChoose: false,
  };
  private longPressTimer: any = undefined;
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    // const { hasLongPress } = this.state;
    const {
      forChoose,
      showMask,
      addressInfo,
      onMaskClick,
      onCopyAddress,
      onSetDefaultAddress,
      onDelete,
      onEdit,
    } = this.props;
    const {
      concat,
      phone,
      detail_address,
      address_tag_name,
      constom_dic_name,
    } = addressInfo;
    return (
      <div
        className={`my-address-cell ${forChoose ? "for-choose" : ""}`}
        onTouchStart={e => this.handleTouchStart(e)}
        onTouchEnd={e => this.handleTouchEnd(e)}
      >
        <div className="cell-left">
          {forChoose ? (
            <span className="position-icon">
              <img src={positionIcon} alt="位置" />
            </span>
          ) : null}
          <div>
            {!forChoose ? (
              <div>
                {concat} {phone}
              </div>
            ) : null}
            <div style={{ fontSize: "15px" }}>
              <span className="address-tag-name">
                {forChoose ? "" : constom_dic_name || address_tag_name}
              </span>
              {detail_address}
            </div>
          </div>
        </div>

        {!forChoose ? (
          <div
            className="cell-right"
            onClick={() => {
              onEdit();
            }}
          >
            <img src={addressEditIcon} alt="编辑" />
          </div>
        ) : null}
        {showMask ? (
          <div className="mask-wrap" onClick={e => onMaskClick(e)}>
            <div
              className="copy m1"
              onClick={() => {
                onCopyAddress();
              }}
            >
              复制地址
            </div>
            <div
              className="default m1"
              onClick={() => {
                onSetDefaultAddress();
              }}
            >
              设置默认
            </div>
            <div
              className="delete m1"
              onClick={() => {
                onDelete();
              }}
            >
              删除
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  componentWillUnmount() {
    clearTimeout(this.longPressTimer);
  }

  private showMask() {
    document.querySelector(".mask-wrap").style.display = "flex";
  }
  private hideMask() {
    document.querySelector(".mask-wrap").style.display = "none";
  }

  private handleTouchStart(e: any): void {
    e.stopPropagation();
    if (this.props.forChoose) {
      const addressVal = this.props.addressInfo.detail_address;
      this.props.ModalStore.setAddressVal(addressVal);
      return this.props.RootStore.setToggleModalVisible("ADDRESS", false);
    }
    this.longPressTimer = setTimeout(() => {
      this.props.onLongPress();
      clearTimeout(this.longPressTimer);
    }, 1000);
  }

  private handleTouchEnd(e: any): void {
    e.stopPropagation();
    clearTimeout(this.longPressTimer);
  }
}
