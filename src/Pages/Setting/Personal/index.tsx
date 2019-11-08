import * as React from "react";
import "./index.scss";
import MyHeader from "../../../Components/MyHeader";
import MyCell from "../../../Components/MyCell";

export default class SettingPersonalPage extends React.PureComponent {
  render() {
    return (
      <div className="setting-personal-page" style={{ marginTop: "45px" }}>
        <MyHeader centerContent={<span>个人信息</span>} rightContent={null} />
        <MyCell
          title="头像"
          rightContent={this.renderRightContent()}
          onCellClick={() => {
            this.goToUploadAvatarPage();
          }}
        />
        <MyCell title="头像" />
        <MyCell title="用户名" />
        <MyCell title="性别" />
        <MyCell title="出生日期" />
      </div>
    );
  }

  private renderRightContent(): JSX.Element {
    return (
      <div className="avatar">
        <img
          src="https://img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png"
          alt=""
        />
      </div>
    );
  }

  private goToUploadAvatarPage(): void {
    this.props.history.push({
      pathname: "/setting/personal/avatar",
    });
  }
}
