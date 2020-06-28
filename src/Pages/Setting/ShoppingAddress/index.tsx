import * as React from "react";
import { Switch, Toast, Button } from "antd-mobile";
import "./index.scss";
import MyAddressCell from "../../../Components/MyAddressCell";
import {
  userShoppingAddressList,
  removeUserShoppingAddress,
} from "../../../Api";
interface Props {}

interface State {
  addressList: Array<object>;
}

export default class SettingShoppingAddressPage extends React.PureComponent<
  Props,
  State
> {
  private deleteTimer: any = undefined;

  constructor(props: Props) {
    super(props);
    this.state = {
      addressList: [],
    };
  }
  render() {
    const { addressList } = this.state;
    return (
      <div
        className="shopping-address-page"
        onClick={e => this.handleAddressPageClick(e)}
      >
        {addressList.map((address, index) => {
          return (
            <MyAddressCell
              key={index}
              addressInfo={address}
              showMask={address.showMask || false}
              onEdit={() => {
                this.props.history.push({
                  pathname: "/setting/my_address/detail" + `/${address.id}`,
                });
              }}
              onMaskClick={e => {
                this.handleMaskClick(e);
              }}
              onCopyAddress={() => {
                this.handleCopyAddress(address.phone);
              }}
              onLongPress={() => {
                this.handleLongPress(index);
              }}
              onDelete={() => {
                this.handleDelete(address.id, index);
              }}
            />
          );
        })}
        {/* <Switch
          checked={this.state.checked}
          onChange={() => {
            this.setState({
              checked: !this.state.checked,
            });
          }}
        /> */}
        <div
          className="footer"
          onClick={() => {
            this.props.history.push({
              pathname: "/setting/my_address/detail",
            });
          }}
        >
          <Button type="warning">新增收货地址</Button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchUserShoppingAddressList();
  }

  componentWillUnmount() {
    clearTimeout(this.deleteTimer);
  }

  private async fetchUserShoppingAddressList(): Promise<void> {
    Toast.loading("加载中...", 0);
    let { data } = await userShoppingAddressList({});
    if (data.code === 0) {
      let addressList = data.content || [];
      addressList.map(address => {
        if (address) {
          return {
            ...address,
            showMask: false,
          };
        }
      });
      this.setState({
        addressList: addressList,
      });
      Toast.hide();
    }
  }

  private handleAddressPageClick(e): void {
    this.setState({
      addressList: this.state.addressList.map((item, _index) => {
        return { ...item, ["showMask"]: false };
      }),
    });
  }

  private handleMaskClick(e): void {
    e.stopPropagation();
    // 组织documen注册原生家
    // e.nativeEvent.stopImmediatePropagation();
    // console.log(111, e.stopPropagation, e, "----");
  }

  private handleLongPress(index: number): void {
    this.setState({
      addressList: this.state.addressList.map((item, _index) =>
        _index == index ? { ...item, ["showMask"]: true } : item,
      ),
    });
  }

  /**
   * 删除接口
   * @param addressId
   * @param index
   */
  private async handleDelete(addressId: number, index: number): Promise<void> {
    Toast.loading("正在删除...", 0);
    let { data } = await removeUserShoppingAddress({
      userShoppingAddressId: addressId,
    });
    if (data.code === 0) {
      this.state.addressList.splice(index, 1);
      this.setState({
        addressList: this.state.addressList.map((item, _index) => {
          return { ...item, ["showMask"]: false };
        }),
      });
      Toast.info("已删除", 0.8);
    }
  }

  private handleCopyAddress(addressId: number): void {
    alert("复制成功");
  }
}
