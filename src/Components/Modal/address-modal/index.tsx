import * as React from "react";
import { inject, observer } from "mobx-react";
import "./index.scss";
import CommonModalComponent from "./../common-modal/index";
import SettingShoppingAddressPage from "../../../Pages/Setting/ShoppingAddress";
import { withRouter } from "react-router";
import MyAddressCell from "../../MyAddressCell";
import { userShoppingAddressList } from "../../../Api";
import { Toast } from "antd-mobile";
interface Props {
  RootStore?: any;
}
interface State {
  addressList: Array<object>;
}

@inject("RootStore")
@observer
@withRouter
export default class AddressModalComponent extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addressList: [],
    };
  }

  public render() {
    const { addressList } = this.state;
    return (
      <CommonModalComponent modalVisibleType="ADDRESS">
        <div className="address-header">配送至</div>
        <div className="body">
          {/* <SettingShoppingAddressPage {...this.props} /> */}
          {addressList.map((address, index) => {
            return <MyAddressCell forChoose addressInfo={address} />;
          })}
        </div>
        <div
          className="address-sure-btn"
          onClick={() => {
            this.goToNewAddress();
          }}
        >
          新增收货地址
        </div>
      </CommonModalComponent>
    );
  }

  componentDidMount() {
    this.fetchUserShoppingAddressList();
  }
  private fetchAddressList(): void {}

  private async fetchUserShoppingAddressList(): Promise<void> {
    // Toast.loading("加载中...", 0);
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
  private goToNewAddress(): void {
    this.props.history.push({
      pathname: "/setting/my_address/detail",
    });
  }
}
