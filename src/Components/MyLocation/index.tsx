import * as React from "react";
import "./index.scss";
import { Picker, List } from "antd-mobile";
interface Props {
  onChange: (value) => void;
  onOk: (value, extra: string) => void;
  visible?: boolean;
  // 是否不使用组件自带的visible
  custom?: boolean;
  initialValue?: Array<string>;
}

interface State {
  antdDistrict: Array<any>;
  pickerValue: any;
  extraTxt: string;
}
const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: "#fff", paddingLeft: 15 }}
  >
    <div
      className="test"
      style={{ display: "flex", height: "45px", lineHeight: "45px" }}
    >
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: "14px",
        }}
      >
        {props.children}
      </div>
      <div
        className="extra-txt"
        style={{ textAlign: "right", color: "#888", marginRight: 15 }}
      >
        {props.extra}
      </div>
    </div>
  </div>
);

const CustomChildren2 = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: "#fff", paddingLeft: 15 }}
  >
    <div
      className="test"
      style={{ display: "flex", height: "45px", lineHeight: "45px" }}
    >
      <div
        style={{
          // flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: "18px",
        }}
      >
        {props.children}
      </div>
      <List.Item>
        <div className="extra-txt" style={{ marginLeft: "23px" }}>
          {props.extra}
        </div>
      </List.Item>
    </div>
  </div>
);

export default class MyLocation extends React.PureComponent<Props, State> {
  static defaultProps = {
    visible: false,
    custom: false,
  };
  private extraTxt: string = "请选择(可选)";
  constructor(props: Props) {
    super(props);
    this.state = {
      antdDistrict: [],
      pickerValue: "",
      extraTxt: "请选择(可选)",
    };
  }
  render() {
    // const { getFieldProps } = this.props.form;
    return (
      <div className="my-location-wrap">
        {this.props.custom ? (
          <Picker
            // visible={this.props.visible}
            title="选择地区"
            extra={this.extraTxt}
            data={this.state.antdDistrict}
            value={this.state.pickerValue}
            onChange={v => {
              this.handleLocationChange(v);
            }}
            onOk={v => this.handleLocationOk(v)}
            onClick={() => {
              // v => this.handleLocationClick(v)
            }}
          >
            {/* {this.props.children} */}
            <CustomChildren>所在地</CustomChildren>
          </Picker>
        ) : (
          <Picker
            title="选择地区"
            extra="请选择(可选)"
            data={this.state.antdDistrict}
            value={this.state.pickerValue}
            onChange={v => {
              this.handleLocationChange(v);
            }}
            onOk={v => this.handleLocationOk(v)}
            onClick={() => {
              // v => this.handleLocationClick(v)
            }}
          >
            <CustomChildren2>所在地</CustomChildren2>
          </Picker>
        )}
      </div>
    );
  }

  componentDidMount() {
    let districtData = require("./assets/json/location.json");
    this.initLocation(districtData);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      pickerValue: newProps.initialValue,
    });
  }

  /**
   * 初始化化全国省市区json
   * @param districtData 全国省市区json
   */
  private initLocation(districtData: Array<any>): void {
    let antdDistrict = [];
    Object.keys(districtData).forEach(index => {
      let itemLevel1 = {};
      let itemLevel2 = {};
      itemLevel1.value = districtData[index].code;
      itemLevel1.label = districtData[index].name;
      itemLevel1.children = [];
      let data = districtData[index].cities;
      Object.keys(data).forEach(index => {
        itemLevel2.value = data[index].code;
        itemLevel2.label = data[index].name;
        itemLevel2.children = [];
        let data2 = data[index].districts;
        let itemLevel3 = {};
        itemLevel3.children = [];
        Object.keys(data2).forEach(index => {
          itemLevel3.value = index;
          itemLevel3.label = data2[index];
          itemLevel2.children.push(itemLevel3);
          itemLevel3 = {};
        });
        itemLevel1.children.push(itemLevel2);
        itemLevel2 = {};
      });
      antdDistrict.push(itemLevel1);
    });
    this.setState({
      antdDistrict: antdDistrict,
      pickerValue: this.props.initialValue,
    });
  }

  private handleLocationChange(value): void {
    this.setState({
      pickerValue: value,
    });
    this.props.onChange(value);
  }

  private handleLocationOk(value): void {
    this.setState({
      pickerValue: value,
    });
    let timer = setTimeout(() => {
      const extra = document.querySelector(".extra-txt").innerHTML;
      this.props.onOk(value, extra);
      clearTimeout(timer);
    });
  }
}
