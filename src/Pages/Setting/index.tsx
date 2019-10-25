import * as React from "react";
import MyHeader from "../../Components/MyHeader";

export default class SettingPage extends React.PureComponent {
  render() {
    return (
      <div>
        <MyHeader centerContent={<span>账号管理</span>} rightContent={null} />
        <div style={{ marginTop: "45px" }}>个人设置中心</div>
      </div>
    );
  }
}
