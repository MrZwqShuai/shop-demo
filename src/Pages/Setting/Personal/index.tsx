import * as React from "react";
import "./index.scss";
import MyHeader from "../../../Components/MyHeader";
import MyCell from "../../../Components/MyCell";
import { PickerView, DatePicker, List, Picker } from "antd-mobile";
import { fetchAppAuth, updatePersonalInfo } from "../../../Api";

interface Props {}

interface State {
  value: string;
  date: Date;
  datePickerVisible: boolean;
  genderPickerVisible: boolean;
  personalInfo: PersonalInfo;
}

interface PersonalInfo {
  avatar?: string;
  username?: string;
  gender?: number;
  birthday?: string;
  // 所在迪
  location?: string;
}

function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => (n < 10 ? `0${n}` : n);
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${dateStr}`;
}

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

export default class SettingPersonalPage extends React.PureComponent<
  Props,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      date: now,
      datePickerVisible: false,
      genderPickerVisible: false,
      personalInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
    };
  }

  render() {
    const {
      value,
      date,
      datePickerVisible,
      genderPickerVisible,
      personalInfo,
    } = this.state;
    const { username, avatar, birthday, location, gender } = personalInfo;
    return (
      <div className="setting-personal-page" style={{ marginTop: "45px" }}>
        <MyHeader centerContent={<span>个人信息</span>} rightContent={null} />
        <MyCell
          title="头像"
          rightContent={this.renderRightContent(avatar)}
          onCellClick={() => {
            this.goToUploadAvatarPage();
          }}
        />
        <MyCell
          title="用户名"
          rightContent={this.renderUsernameRightContent(username)}
        />
        <Picker
          visible={genderPickerVisible}
          data={[
            { label: "男", value: 1 },
            { label: "女", value: 0 },
          ]}
          onOk={value => this.handleGenderPickerChangeOK(value)}
          onDismiss={() =>
            this.setState({
              genderPickerVisible: false,
            })
          }
          cols={1}
          className="forss"
        >
          <MyCell
            title="性别"
            onCellClick={() => {
              this.updateGender();
            }}
            rightContent={this.renderGenderRightContent(gender)}
          />
        </Picker>
        <DatePicker
          visible={datePickerVisible}
          mode="date"
          title="选择日期"
          extra="Optional"
          value={date}
          onOk={date => this.handleDatePickerChangeOK(date)}
          onDismiss={() =>
            this.setState({
              datePickerVisible: false,
            })
          }
        >
          <MyCell
            title="出生日期"
            rightContent={<div>{(birthday || "").split(" ")[0]}</div>}
            onCellClick={() => {
              this.handleDatePickerClick();
            }}
          />
        </DatePicker>
        <MyCell title="所在地" rightContent={<div>{location}</div>} />
      </div>
    );
  }

  componentDidMount() {
    // this.setState({
    //   personalInfo: {
    //     gender: "男",
    //     username: "admin",
    //     location: "安徽芜湖",
    //     birthday: "1994-08-27",
    //   },
    // });
  }

  private renderRightContent(avatar: string): JSX.Element {
    return (
      <div className="avatar">
        <img src={avatar} alt="头像" />
      </div>
    );
  }

  private renderGenderRightContent(gender: number): JSX.Element {
    return <div>{gender == 1 ? "男" : "女"}</div>;
  }

  private renderUsernameRightContent(username: string): JSX.Element {
    return <div>{username}</div>;
  }

  /**
   * 修改头像
   */
  private goToUploadAvatarPage(): void {
    this.props.history.push({
      pathname: "/setting/personal/avatar",
    });
  }

  /**
   *
   * @param date 选中的日期OK状态
   */
  private async handleDatePickerChangeOK(date): Promise<void> {
    const { data } = await updatePersonalInfo({
      birthday: formatDate(date),
    });
    if (data.code == 0) {
      this.setState({
        datePickerVisible: false,
        personalInfo: {
          ...this.state.personalInfo,
          birthday: formatDate(date),
        },
      });
      this.fetchAuth();
    }
  }

  /**
   *
   * @param gender 选中的性别
   */
  private async handleGenderPickerChangeOK(gender: number): Promise<void> {
    const { data } = await updatePersonalInfo({
      gender: gender[0],
    });
    if (data.code == 0) {
      this.setState({
        genderPickerVisible: false,
        personalInfo: {
          ...this.state.personalInfo,
          gender: gender,
        },
      });
      this.fetchAuth();
    }
  }

  private handleDatePickerClick(): void {
    this.setState({
      datePickerVisible: !this.state.datePickerVisible,
    });
  }

  /**
   * 修改性别
   */
  private updateGender(): void {
    this.setState({
      genderPickerVisible: !this.state.genderPickerVisible,
    });
  }

  /**
   * 刷新获取用户登录信息
   */
  private async fetchAuth(): Promise<void> {
    // const { user_id } = JSON.parse(localStorage.getItem("userInfo")) || {};
    const { data } = await fetchAppAuth({});
    if (data.code === 0) {
      const refreshUserInfo = Object.assign(
        JSON.parse(localStorage.getItem("userInfo")) || {},
        data.content,
      );
      localStorage.setItem("userInfo", JSON.stringify(refreshUserInfo));
    }
  }
}
