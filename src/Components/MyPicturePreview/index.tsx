import * as React from "react";
import "./index.scss";
import "./mui/mui.scss";
import "./common/common.scss";
import "./common/clip.scss";
import "./dist/image-clip.scss";

interface Props {
  base64Photo: string;
  onSave: (newBase64Str) => void;
  onClearBase64Str: () => void;
}

interface State {}

let chooseGallery;
let chooseCamera;
let cropImage;
let imgData;
let clipContent;
let clipAction;
let showContent;
let showImg;
// let targetImg;
// let targetImgCamera;

export default class MyPicturePreview extends React.PureComponent<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { base64Photo } = this.props;
    return (
      <div
        className="picture-preview"
        style={{ display: base64Photo ? "block" : "none" }}
      >
        <div
          className="clip-content"
          style={{ position: base64Photo ? "absolute" : "static" }}
        >
          <div className="upload-container choose-gallery">
            {/* <div className="upload-pretty button-three-dimen">
              <input type="file" id="targetImg" />
              本地上传
            </div> */}
          </div>
          <div className="upload-container choose-camera">
            {/* <div className="upload-pretty button-three-dimen">
              <input type="file" id="targetImgCamera" capture="camera" />
              手机拍摄
            </div> */}
          </div>
          <div className="img-clip"></div>

          <nav className="clip-action nav-bar nav-bar-tab hidden">
            <a
              className="tab-item"
              id="btn-reload"
              onClick={() => {
                document.querySelector(".clip-content").style.display = "none";
                this.props.onClearBase64Str();
              }}
            >
              <span className="mui-icon mui-icon-arrowleft tab-icon"></span>
              <span className="tab-label hidden">取消</span>
            </a>
            <a className="tab-item " id="btn-rotate-anticlockwise">
              <span className="mui-icon mui-icon-refreshempty tab-icon rotate90"></span>
              <span className="tab-label hidden">逆时针旋转</span>
            </a>
            <a className="tab-item " id="btn-rotate-clockwise">
              <span className="mui-icon mui-icon-refreshempty tab-icon"></span>
              <span className="tab-label hidden">顺时针旋转</span>
            </a>
            <a className="tab-item hidden" id="btn-maxrect">
              <span className="mui-icon mui-icon-navigate tab-icon"></span>
              <span className="tab-label hidden">最大选择</span>
            </a>
            <a className="tab-item" id="btn-verify">
              <span className="mui-icon mui-icon-checkmarkempty tab-icon"></span>
              <span className="tab-label hidden">确定</span>
            </a>
          </nav>
        </div>

        <div className="show-content hidden">
          <div className="img-wrap">
            <img
              className="show-img"
              data-preview-src=""
              data-preview-group="2"
            ></img>
          </div>

          <nav className="nav-bar nav-bar-tab">
            <a className="tab-item" id="btn-back">
              <span className="mui-icon mui-icon-arrowleft tab-icon"></span>
              <span className="tab-label hidden">取消</span>
            </a>
            <a className="tab-item" id="btn-detail">
              <span className="mui-icon mui-icon-more-filled tab-icon"></span>
              <span className="tab-label hidden">详情</span>
            </a>
            <a className="tab-item" id="btn-save">
              <span className="mui-icon mui-icon-checkmarkempty tab-icon"></span>
              <span className="tab-label hidden">确定</span>
            </a>
          </nav>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.initPage();
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps, "=====newProps====");
    if (newProps.base64Photo) {
      document.querySelector(".clip-content").style.display = "block";
    }
  }

  initPage() {
    this.initParams();
    this.initListeners();
    this.loadImg(this.props.base64Photo);
  }

  initParams() {
    // targetImg = document.querySelector("#targetImg");
    // targetImgCamera = document.querySelector("#targetImgCamera");
    chooseGallery = document.querySelector(".choose-gallery");
    chooseCamera = document.querySelector(".choose-camera");
    clipContent = document.querySelector(".clip-content");
    clipAction = document.querySelector(".clip-action");
    showContent = document.querySelector(".show-content");
    showImg = document.querySelector(".show-img");
  }

  loadImg(b64) {
    this.changeImgClipShow(true);
    var img = new Image();
    img.src = b64;
    img.onload = function() {
      EXIF.getData(img, () => {
        var orientation = EXIF.getTag(this, "Orientation");

        cropImage && cropImage.destroy();
        cropImage = new ImageClip({
          container: ".img-clip",
          img,
          // 0代表按下才显示，1恒显示，-1不显示
          sizeTipsStyle: 0,
          // 为1一般是屏幕像素x2这个宽高
          // 最终的大小为：屏幕像素*屏幕像素比（手机中一般为2）*compressScaleRatio
          compressScaleRatio: 1.1,
          // iphone中是否继续放大：x*iphoneFixedRatio
          // 最好compressScaleRatio*iphoneFixedRatio不要超过2
          iphoneFixedRatio: 1.8,
          // 减去顶部间距，底部bar,以及显示间距
          maxCssHeight: window.innerHeight - 100 - 50 - 20,
          // 放大镜捕获的图像半径
          captureRadius: 30,
          // 是否采用原图像素（不会压缩）
          isUseOriginSize: false,
          // 增加最大宽度，增加后最大不会超过这个宽度
          maxWidth: 0,
          // 是否固定框高，优先级最大，设置后其余所有系数都无用直接使用这个固定的宽，高度自适应
          forceWidth: 0,
          // 同上，但是一般不建议设置，因为很可能会改变宽高比导致拉升，特殊场景下使用
          forceHeight: 0,
          // 压缩质量
          quality: 0.92,
          mime: "image/jpeg"
        });

        // 6代表图片需要顺时针修复（默认逆时针处理了，所以需要顺过来修复）
        switch (orientation) {
          case 6:
            cropImage.rotate(true);
            break;
          default:
            break;
        }
      });
    };
  }

  resizeShowImg(b64) {
    var img = new Image();
    img.src = b64;
    img.onload = this.showImgOnload;
  }

  showImgOnload() {
    // 必须用一个新的图片加载，否则如果只用showImg的话永远都是第1张
    // margin的话由于有样式，所以自动控制了
    var width = this.width;
    var height = this.height;
    var wPerH = width / height;
    var MAX_WIDTH = Math.min(window.innerWidth, width);
    var MAX_HEIGHT = Math.min(window.innerHeight - 50 - 100, height);
    var legalWidth = MAX_WIDTH;
    var legalHeight = legalWidth / wPerH;

    if (MAX_WIDTH && legalWidth > MAX_WIDTH) {
      legalWidth = MAX_WIDTH;
      legalHeight = legalWidth / wPerH;
    }
    if (MAX_HEIGHT && legalHeight > MAX_HEIGHT) {
      legalHeight = MAX_HEIGHT;
      legalWidth = legalHeight * wPerH;
    }

    var marginTop = (window.innerHeight - 50 - legalHeight) / 2;

    showImg.style.marginTop = marginTop + "px";
    showImg.style.width = legalWidth + "px";
    showImg.style.height = legalHeight + "px";
  }

  changeImgClipShow(isClip) {
    if (isClip) {
      // chooseGallery.classList.add("hidden");
      // chooseCamera.classList.add("hidden");
      clipAction.classList.remove("hidden");
    } else {
      // chooseGallery.classList.remove("hidden");
      // chooseCamera.classList.remove("hidden");
      clipAction.classList.add("hidden");
      // 需要改变input，否则下一次无法change
      // targetImg.value = "";
      // targetImgCamera.value = "";
    }
  }

  initListeners() {
    document.querySelector("#btn-reload").addEventListener("click", () => {
      cropImage && cropImage.destroy();
      this.changeImgClipShow(false);
    });
    document.querySelector("#btn-back").addEventListener("click", () => {
      this.changeContent(false);
    });
    document.querySelector("#btn-save").addEventListener("click", () => {
      // downloadFile(imgData);
      // this.upload(() => {
      //   this.tips("上传成功");
      // });
      this.props.onSave(imgData);
    });
    document.querySelector("#btn-detail").addEventListener("click", () => {
      this.showImgDataLen(imgData);
    });

    document.querySelector("#btn-maxrect").addEventListener("click", () => {
      if (!cropImage) {
        this.tips("请选择图片");
        return;
      }
      cropImage.resetClipRect();
    });

    document
      .querySelector("#btn-rotate-anticlockwise")
      .addEventListener("click", () => {
        if (!cropImage) {
          this.tips("请选择图片");
          return;
        }
        cropImage.rotate(false);
      });

    document
      .querySelector("#btn-rotate-clockwise")
      .addEventListener("click", () => {
        if (!cropImage) {
          this.tips("请选择图片");
          return;
        }
        cropImage.rotate(true);
      });

    document.querySelector("#btn-verify").addEventListener("click", () => {
      if (!cropImage) {
        this.tips("请选择图片");
        return;
      }

      var isConfirm = confirm("是否裁剪图片并处理？");

      if (isConfirm) {
        cropImage.clip(false);
        imgData = cropImage.getClipImgData();
        this.recognizeImg(
          () => {
            this.changeContent(true);
          },
          error => {
            this.tips(JSON.stringify(error), true);
          }
        );
      }
    });
  }

  showImgDataLen(imgData) {
    var len = imgData.length;
    var sizeStr = len + "B";

    if (len > 1024 * 1024) {
      sizeStr = Math.round(len / (1024 * 1024)).toString() + "MB";
    } else if (len > 1024) {
      sizeStr = Math.round(len / 1024).toString() + "KB";
    }

    this.tips("处理后大小：" + sizeStr);
  }

  tips(msg, isAlert) {
    if (isAlert) {
      alert(msg);
    } else {
      this.toast(msg);
    }
  }

  toast(message) {
    var CLASS_ACTIVE = "mui-active";
    var duration = 2000;
    var toastDiv = document.createElement("div");

    toastDiv.classList.add("mui-toast-container");
    toastDiv.innerHTML = `<div class="mui-toast-message">${message}</div>`;
    toastDiv.addEventListener("webkitTransitionEnd", () => {
      if (!toastDiv.classList.contains(CLASS_ACTIVE)) {
        toastDiv.parentNode.removeChild(toastDiv);
        toastDiv = null;
      }
    });
    // 点击则自动消失
    toastDiv.addEventListener("click", () => {
      toastDiv.parentNode.removeChild(toastDiv);
      toastDiv = null;
    });
    document.body.appendChild(toastDiv);
    toastDiv.classList.add(CLASS_ACTIVE);
    setTimeout(function() {
      toastDiv && toastDiv.classList.remove(CLASS_ACTIVE);
    }, duration);
  }

  changeContent(isShowContent) {
    if (isShowContent) {
      showContent.classList.remove("hidden");
      clipContent.classList.add("hidden");
      this.resizeShowImg(imgData);
      showImg.src = imgData;
    } else {
      showContent.classList.add("hidden");
      clipContent.classList.remove("hidden");
    }
  }

  b64ToBlob(urlData) {
    var arr = urlData.split(",");
    var mime = arr[0].match(/:(.*?);/)[1] || "image/png";
    // 去掉url的头，并转化为byte
    var bytes = window.atob(arr[1]);

    // 处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }

    return new Blob([ab], {
      type: mime
    });
  }

  downloadFile(content) {
    // Convert image to 'octet-stream' (Just a download, really)
    var imageObj = content.replace("image/jpeg", "image/octet-stream");
    window.location.href = imageObj;
  }

  recognizeImg(success, error) {
    // 里面正常有：裁边，摆正，梯形矫正，锐化等算法操作
    success();
  }

  upload(success, error) {
    success();
  }

  private uploadAvatar(): void {
    setTimeout(() => {});
  }
}
