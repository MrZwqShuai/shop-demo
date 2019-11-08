import * as React from "react";
import "./index.scss";
import MyHeader from "../../../Components/MyHeader";
import routeAnimation from "../../../Config/animation/route-animation";
import { Icon, ActionSheet } from "antd-mobile";
const isIPhone = new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(
  window.navigator.userAgent,
);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
const SettingPersonalAvatarPage = routeAnimation(
  class SettingPersonalAvatarPage extends React.PureComponent {
    render() {
      return (
        <div className="personal-avatar-wrap">
          <MyHeader
            centerContent={<span>个人头像</span>}
            rightContent={[
              <Icon
                key="1"
                type="ellipsis"
                onClick={() => this.handleActionSheetChoose()}
              />,
            ]}
          />
          <div className="personal-avatar-content">
            <div className="view-content">
              <img
                src="https://img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png"
                alt=""
              />
            </div>
          </div>
          {/* 隐藏的dom */}
          <div>
            <input
              type="file"
              accept="image/*"
              capture="camera"
              id="camera-button"
            />
            <input
              type="file"
              accept="video/*"
              capture="camcorder"
              id="camcorder-button"
            />
            {/* <input type="file" accept="audio/*" capture="microphone" /> */}
          </div>
        </div>
      );
    }

    private handleActionSheetChoose(): void {
      const BUTTONS = [
        "拍照",
        "从手机相册选择",
        "查看上一张头像",
        "保存图片",
        "取消",
      ];
      ActionSheet.showActionSheetWithOptions(
        {
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          // destructiveButtonIndex: BUTTONS.length - 2,
          // title: 'title',
          // message: "I am description, description, description",
          maskClosable: true,
          "data-seed": "logId",
          wrapProps,
        },
        buttonIndex => {
          console.log(buttonIndex, "buttonIndexbuttonIndex");
          this.handleButtonIndexClick(buttonIndex);
        },
      );
    }

    /**
     *
     * @param buttonIndex 点击action optons 下标
     */
    private handleButtonIndexClick(buttonIndex: number): void {
      if (buttonIndex == 0) {
        // 拍照
        document.querySelector("#camera-button").click();
      } else if (buttonIndex == 1) {
        // 相册
        document.querySelector("#camcorder-button").click();
      }
    }
  },
);

export default SettingPersonalAvatarPage;
