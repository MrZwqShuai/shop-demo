import * as React from "react";
import { inject, observer } from "mobx-react";
import "./index.scss";
import MyHeader from "../../../Components/MyHeader";
import { Icon, ActionSheet, Toast } from "antd-mobile";
import MyActionSheet from "../../../Components/MyActionSheet";
import MyPicturePreview from "../../../Components/MyPicturePreview";
import { uploadAvatar, fetchAppAuth } from "../../../Api";
const isIPhone = new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(
  window.navigator.userAgent
);

let ImageClip: object;
let wrapProps;

if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault()
  };
}

const PHOTOGRAPH_INDEX = 0;
const PICTURE_INDEX = 1;
const PREV_PHOTO_INDEX = 2;
const SAVE_PCITURE_INDEX = 3;

@inject("MyActionSheetStore")
@observer
class SettingPersonalAvatarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionOptions: [
        {
          label: "拍照",
          element: (
            <div>
              <input
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                capture="camera"
                id="camera-button"
                onChange={e => this.handleCameraChange(e)}
              />
              <label htmlFor="camera-button">拍照</label>
            </div>
          )
        },
        {
          label: "从手机相册选择",
          element: (
            <div>
              <input
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                id="picture-button"
                onChange={e => this.handlePictureChange(e)}
              />
              <label htmlFor="picture-button">从手机相册选择</label>
            </div>
          )
        },
        { label: "查看上一张头像" },
        { label: "保存图片" }
      ],
      base64Photo: ""
    };
  }

  render() {
    const { base64Photo, actionOptions } = this.state;
    const { avatar } = JSON.parse(localStorage.getItem("userInfo")) || {};
    return (
      <div className="personal-avatar-wrap">
        <MyHeader
          centerContent={<span>个人头像</span>}
          rightContent={[
            <Icon
              key="1"
              type="ellipsis"
              onClick={() => this.toggleActionSheet()}
            />
          ]}
        />
        <div className="personal-avatar-content">
          <div className="view-content">
            <img src={avatar} alt="" />
          </div>
        </div>
        {/* 隐藏的dom */}
        <MyActionSheet
          visible={this.props.MyActionSheetStore.visible}
          onCancel={() => this.cancel()}
          datasource={actionOptions}
        />
        {base64Photo ? (
          <MyPicturePreview
            onSave={newBase64Str => this.handleSave(newBase64Str)}
            onClearBase64Str={() => {
              this.clearBase64Str();
            }}
            base64Photo={base64Photo}
          />
        ) : (
          ""
        )}
      </div>
    );
  }

  componentDidMount() {}

  private toggleActionSheet(): void {
    this.props.MyActionSheetStore.toggleActionSheet();
  }

  private cancel(): void {
    this.props.MyActionSheetStore.setActionSheetVisible(false);
  }

  private async handleSave(newBase64Str: string): Promise<any> {
    Toast.loading("");
    let { data } = await uploadAvatar({
      avatarBase64: newBase64Str
    });
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    userInfo.avatar = data.content;
    Toast.hide();
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    this.clearBase64Str();
  }

  /**
   * 清楚base图片值
   */
  private clearBase64Str() {
    this.setState({
      base64Photo: ""
    });
  }

  /**
   *
   * @param e 相册选取 图片文件
   */
  private handlePictureChange(e): void {
    console.log(e, e.target.value, "相册文件");
    const file = document.getElementById("picture-button").files[0];
    var oFReader = new FileReader();
    oFReader.readAsDataURL(file);
    oFReader.onload = oFREvent => {
      const base64 = oFREvent.target.result;
      this.setState({
        base64Photo: oFREvent.target.result
      });
    };
  }
  /**
   *
   * @param e 拍摄
   */
  private handleCameraChange(e): void {
    console.log(e, e.target.value, "拍摄");
    const file = document.getElementById("camera-button").files[0];
    var oFReader = new FileReader();
    oFReader.readAsDataURL(file);
    oFReader.onload = oFREvent => {
      const base64 = oFREvent.target.result;
      this.setState({
        base64Photo: oFREvent.target.result
      });
    };
  }
}

export default SettingPersonalAvatarPage;
