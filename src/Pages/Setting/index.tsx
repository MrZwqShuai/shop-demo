import * as React from "react";
import MyHeader from "../../Components/MyHeader";
import MyCell from "../../Components/MyCell";
import "./index.scss";
import { Modal } from "antd-mobile";
import { withRouter } from "react-router";
function closest(el, selector) {
  const matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

@withRouter
export default class SettingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowLogoutModal: false,
    };
  }
  render() {
    return (
      <div className="setting-page">
        <MyHeader centerContent={<span>账号管理</span>} rightContent={null} />
        <div style={{ marginTop: "45px" }}>
          <div className="setting-user">
            <MyCell
              leftContent={this.renderLeftContent()}
              onCellClick={() => {
                this.props.history.push({
                  pathname: "/setting/personal",
                });
              }}
            />
            <MyCell
              title="地址管理"
              onCellClick={() => {
                this.props.history.push({
                  pathname: "/setting/my_address",
                });
              }}
            />
          </div>
          <div className="setting-account">
            <MyCell title="账号登录密码" />
            <MyCell title="修改手机号" />
            <MyCell title="实名认证" rightContent={<span>未实名认证</span>} />
            <MyCell title="关联邮箱" />
          </div>
          <div className="setting-custom-service">
            <MyCell title="联系客服" />
          </div>
          <div
            className="setting-logout"
            onClick={() => this.showLogoutModal()}
          >
            退出登录
          </div>
        </div>
        <Modal
          visible={this.state.shouldShowLogoutModal}
          transparent
          maskClosable={false}
          title="提示"
          footer={[
            {
              text: "取消",
              onPress: () => {
                console.log("ok");
                this.hideLogoutModal();
              },
            },
            {
              text: "确定",
              onPress: () => {
                console.log("ok");
                this.onSure();
              },
            },
          ]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          // afterClose={() => {
          //   alert("afterClose");
          // }}
        >
          <div>确定退出登录</div>
        </Modal>
      </div>
    );
  }

  private renderLeftContent(): JSX.Element {
    const { username, nickname, avatar } =
      JSON.parse(localStorage.getItem("userInfo")) || {};
    return (
      <div className="user">
        <div className="avatar">
          <img src={avatar} alt="头像" />
        </div>
        <div className="user-info">
          <span className="nickname">{nickname}</span>
          <span className="username">用户名：{username}</span>
        </div>
      </div>
    );
  }

  private showLogoutModal(): void {
    this.setState({
      shouldShowLogoutModal: true,
    });
  }

  onSure = () => {
    localStorage.clear();
    this.props.history.push({
      pathname: "/auth/login",
    });
    this.hideLogoutModal();
  };

  private hideLogoutModal(): void {
    this.setState({
      shouldShowLogoutModal: false,
    });
  }

  onWrapTouchStart = e => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, ".am-modal-content");
    if (!pNode) {
      e.preventDefault();
    }
  };
}
