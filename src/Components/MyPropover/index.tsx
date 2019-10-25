import { Popover, NavBar, Icon } from "antd-mobile";
import * as React from "react";
import { withRouter } from "react-router-dom";

const Item = Popover.Item;

const myImg = src => (
  <img
    src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`}
    className="am-icon am-icon-xs"
    alt=""
  />
);
@withRouter
export default class MyPropover extends React.Component {
  state = {
    visible: false,
    selected: "",
  };

  onSelect = opt => {
    console.log(opt.props);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
    this.props.history.push({
      pathname: opt.props.value,
    });
  };

  handleVisibleChange = visible => {
    this.setState({
      visible,
    });
  };

  render() {
    return (
      <div>
        <Popover
          overlayClassName="fortest"
          overlayStyle={{ color: "currentColor" }}
          visible={this.state.visible}
          overlay={this.getOverlayData()}
          align={{
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [-10, 0],
          }}
          onVisibleChange={this.handleVisibleChange}
          onSelect={this.onSelect}
        >
          <div
            style={{
              height: "100%",
              padding: "0 15px",
              marginRight: "-15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon type="ellipsis" />
          </div>
        </Popover>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      visible: false,
    });
  }

  private getOverlayData(): Array<JSX.Element> {
    return [
      <Item
        key="4"
        value="/home"
        icon={myImg("tOtXhkIWzwotgGSeptou")}
        data-seed="logId"
      >
        首页
      </Item>,
      // <Item
      //   key="3"
      //   value="/search"
      //   icon={myImg("PKAgAqZWJVNwKsAJSmXd")}
      //   style={{ whiteSpace: "nowrap" }}
      // >
      //   搜索
      // </Item>,
      <Item
        key="5"
        value="/channel"
        icon={myImg("PKAgAqZWJVNwKsAJSmXd")}
        style={{ whiteSpace: "nowrap" }}
      >
        分类
      </Item>,
      <Item
        key="8"
        value="/auth/favourite"
        icon={myImg("PKAgAqZWJVNwKsAJSmXd")}
        style={{ whiteSpace: "nowrap" }}
      >
        我的关注
      </Item>,
      <Item key="7" value="/my" icon={myImg("uQIYTFeRrjPELImDRrPt")}>
        <span style={{ marginRight: 5 }}>功能反馈</span>
      </Item>,
    ];
  }
}
