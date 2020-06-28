import * as React from "react";
import {
  List,
  InputItem,
  Button,
  WhiteSpace,
  Modal,
  TextareaItem,
  Picker,
  Toast,
} from "antd-mobile";
const prompt = Modal.prompt;
import { withRouter } from "react-router";
import "./index.scss";
import MyLocation from "../../../Components/MyLocation";
import {
  userShoppingAddressDetail,
  editUserShoppingAddress,
  addUserShoppingAddress,
  removeUserShoppingAddress,
  getDictionaries,
  addCustomDictionaries,
} from "../../../Api";
import createUUIdNumber from "../../../Utils/uuid-number";

interface AddressPo {
  // 联系人
  concat: string;
  // 联系人电话
  phone: string;
  // 省份
  province: string;
  // 城市
  city: string;
  // 区/县
  area: string;
  // 详细地址
  detailAddress: string;
  // 地址标签 如 家住址 学校地址
  addressTag?: string;
  // 省市区的org code
  address_org?: string;
  // 标签code值
  address_tag?: number;
  address_tag_name?: string;
  //  自定义标签code值
  constom_dic_code?: number;
  constom_dic_name?: string;
}

interface Tag {
  code: number;
  name: string;
  selected?: boolean;
  isCustom?: boolean;
}

interface Props {}

interface State {
  addressPo: AddressPo;
  tags: Array<Tag>;
}
const alert = Modal.alert;

const CustomChildren = (props) => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: "#fff", paddingLeft: 15 }}
  >
    <div
      className="test"
      style={{
        display: "flex",
        height: "45px",
        lineHeight: "45px",
        position: "relative",
        borderBottom: 0,
      }}
    >
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {props.children}
      </div>
      <div style={{ textAlign: "right", color: "#888", marginRight: 15 }}>
        {props.extra}
      </div>
    </div>
  </div>
);

@withRouter
export default class SettingShoppingAddressDetailPage extends React.PureComponent<
  Props,
  State
> {
  private customFocusInst: JSX.Element = undefined;

  constructor(props: Props) {
    super(props);
    this.state = {
      addressPo: {
        concat: "",
        phone: "",
        province: "",
        city: "",
        area: "",
        detailAddress: "",
        address_org: "",
      },
      tags: [],
    };
  }

  render() {
    const { addressPo, tags } = this.state;
    const {
      concat,
      phone,
      province,
      city,
      area,
      address_org,
      detailAddress,
    } = addressPo;
    return (
      <div className="shopping-address-detail-page">
        <List>
          <InputItem
            placeholder="姓名"
            type="text"
            value={concat}
            onChange={(e) => {
              this.handleNameChange(e);
            }}
          >
            收货人
          </InputItem>
          <InputItem
            placeholder="手机号码"
            type="text"
            value={phone}
            onChange={(e) => {
              this.handlePhoneChange(e);
            }}
          >
            联系方式
          </InputItem>
          <MyLocation
            initialValue={address_org && address_org.split(",")}
            onChange={(value) => this.handleLocationChange(value)}
            onOk={(value, extra) => {
              this.handleLocationOk(value, extra);
            }}
          />
          <TextareaItem
            title="详细地址"
            placeholder="详细地址需填写楼栋楼层或房间号信息"
            data-seed="logId"
            autoHeight
            value={detailAddress}
            // ref={el => (this.customFocusInst = el)}
            onChange={(e) => {
              this.handleChange(e);
            }}
          />
          <List.Item
            className="addres-tag"
            extra={
              <div className="tag-wrap">
                {tags.map((tag, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => {
                        this.handleTagItemSeleted(index, tag);
                      }}
                      className={`tag-item ${
                        tag.selected ? "tag-item-active" : ""
                      }`}
                    >
                      {tag.name}
                    </span>
                  );
                })}
              </div>
            }
          >
            地址标签
          </List.Item>
        </List>
        <div className="footer-btns">
          <Button
            type="warning"
            onClick={() => {
              this.editCompleted();
            }}
          >
            确认
          </Button>
          <WhiteSpace />
          <Button
            onClick={() => {
              alert("提示", "确认删除该收货地址吗?", [
                { text: "取消", onPress: () => console.log("cancel") },
                {
                  text: "确定",
                  onPress: () => {
                    this.deleteAddress();
                  },
                },
              ]);
            }}
          >
            删除收货地址
          </Button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // console.log(this.props.location, this.props.match.params.id);
    const address_id = this.props.match.params.id;
    address_id
      ? this.fetchAddressDetailById(address_id)
      : this.fetchAddressTags();
  }

  /**
   * 获取收货地址详情
   * @param address_id 收货地id
   */
  private async fetchAddressDetailById(address_id: number): Promise<void> {
    Toast.loading("加载中...", 0);
    let { data } = await userShoppingAddressDetail(address_id);
    if (data.code === 0) {
      let addressPo = data.content;
      addressPo.detailAddress = data.content.detail_address;
      const { constom_dic_code, address_tag } = data.content;
      this.fetchAddressTags(constom_dic_code || 0, address_tag);
      this.setState({
        addressPo: addressPo,
      });
      Toast.hide();
    }
  }

  private async fetchAddressTags(
    constomDicCode?: number,
    address_tag?: number,
  ): Promise<void> {
    let { data } = await getDictionaries({
      dicCode: "address_tag",
      constomDicCode: Number(constomDicCode),
    });
    if (data.code === 0) {
      if (constomDicCode) {
        const tags = data.content.map((item: Tag) => {
          return item.code == constomDicCode
            ? { ...item, selected: true }
            : item;
        });
        this.setState({
          tags: tags || [],
        });
      } else {
        const tags = data.content.map((item: Tag) => {
          return item.code == address_tag ? { ...item, selected: true } : item;
        });
        console.log(tags, "tagstagstags");
        this.setState({
          tags: tags.concat({
            name: "自定义➕",
            code: undefined,
            isCustom: true,
          }),
        });
      }
    }
  }

  /**
   * 联系人输入
   * @param concat 联系人
   */
  private handleNameChange(concat: string): void {
    this.setState({
      addressPo: {
        ...this.state.addressPo,
        concat: concat,
      },
    });
  }

  /**
   * 联系人电话输入
   * @param phone 联系人电话
   */
  private handlePhoneChange(phone: string): void {
    this.setState({
      addressPo: {
        ...this.state.addressPo,
        phone: phone,
      },
    });
  }

  /**
   * 详细地址输入
   * @param detailAddress 详细地址
   */
  private handleChange(detailAddress: any): void {
    this.setState({
      addressPo: {
        ...this.state.addressPo,
        detailAddress: detailAddress,
      },
    });
  }

  private handleLocationChange(value): void {}

  private handleLocationOk(value, extra): void {
    const locationArr = extra.split(",");
    const province = locationArr[0] || "未知";
    const city = locationArr[1] || "未知";
    const area = locationArr[2] || "未知";
    this.setState({
      addressPo: {
        ...this.state.addressPo,
        address_org: value.toString(),
        province: province,
        city: city,
        area: area,
      },
    });
  }

  /**
   * 设置地址标签
   * @param index 标签的下标
   */
  private handleTagItemSeleted(index: number, tag: Tag): void {
    if (tag.isCustom) {
      if (!tag.code) {
        // return;
        return prompt(
          "自定义标签名称",
          "",
          [
            {
              text: "取消",
              onPress: (value) => null,
            },
            {
              text: "确定",
              onPress: (value) => {
                this.handleCustomConfirmSure(value, index);
              },
            },
          ],
          "default",
          null,
          ["标签最多填写八个字"],
        );
      }
      this.setState({
        tags: this.state.tags.map((tag, _index) => {
          return index == _index
            ? { ...tag, selected: true }
            : { ...tag, selected: false };
        }),
        addressPo: {
          ...this.state.addressPo,
          constom_dic_code: tag.code,
          constom_dic_name: tag.name,
        },
      });
    } else {
      this.setState({
        tags: this.state.tags.map((tag, _index) => {
          return index == _index
            ? { ...tag, selected: true }
            : { ...tag, selected: false };
        }),
        addressPo: {
          ...this.state.addressPo,
          address_tag: tag.code,
          address_tag_name: tag.name,
        },
      });
    }
  }

  /**
   * 自定义标签弹窗确认点击
   * @param customName 自定义标签name
   * @param index 当前tags下标
   */
  private async handleCustomConfirmSure(
    customName: string,
    index: number,
  ): void {
    Toast.loading("请稍后...", 0);
    const customCode = Number(createUUIdNumber());
    let { data } = await addCustomDictionaries({
      code: customCode,
      name: customName,
    });
    if (data.code === 0) {
      this.setState({
        tags: this.state.tags.map((tag, _index) => {
          return index == _index
            ? { ...tag, name: customName, selected: true }
            : { ...tag, selected: false };
        }),
      });
      this.state.addressPo.constom_dic_code = customCode;
      this.state.addressPo.constom_dic_name = customName;
      Toast.hide();
    }
  }

  /**
   * 删除地址
   */
  private async deleteAddress(): Promise<void> {
    const address_id = this.props.match.params.id;
    if (address_id) {
      Toast.loading("正在删除...", 0);
      let { data } = await removeUserShoppingAddress({
        userShoppingAddressId: address_id,
      });
      if (data.code === 0) {
        Toast.info("已删除", 0.8);
        const timer = setTimeout(() => {
          this.props.history.go(-1);
        }, 800);
      }
    } else {
      Toast.info("已删除", 0.8);
      const timer = setTimeout(() => {
        this.props.history.go(-1);
      }, 800);
    }
  }

  /**
   * 编辑完成
   */
  private async editCompleted(): void {
    const address_id = this.props.match.params.id;
    Toast.loading("请稍后...", 0);
    address_id ? this.editAddress() : this.addAddress();
  }

  /**
   * 编辑
   */
  private async editAddress(): Promise<void> {
    this.state.addressPo.detail_address = this.state.addressPo.detailAddress;
    delete this.state.addressPo.detailAddress;
    let { data } = await editUserShoppingAddress({
      ...this.state.addressPo,
    });
    if (data.code == 0) {
      Toast.info("操作成功", 0.8);
      setTimeout(() => {
        this.props.history.go(-1);
      }, 800);
    }
  }
  /**
   * 新增
   */
  private async addAddress(): Promise<void> {
    this.state.addressPo.detail_address = this.state.addressPo.detailAddress;
    delete this.state.addressPo.detailAddress;
    let { data } = await addUserShoppingAddress({
      ...this.state.addressPo,
    });
    if (data.code == 0) {
      Toast.info("操作成功", 0.8);
      setTimeout(() => {
        this.props.history.go(-1);
      }, 800);
    }
  }
}
