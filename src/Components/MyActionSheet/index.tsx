import * as React from "react";
import "./index.scss";

interface ActionSheetItem {
  label: string;
  element?: JSX.Element;
}

interface Props {
  visible: boolean;
  datasource?: Array<ActionSheetItem>;
  // 是否开启动画
  animated?: boolean;
  onCancel: () => void;
}

interface State {}

export default class MyActionSheet extends React.PureComponent<Props, State> {
  static defaultProps = {
    datasource: [
      {
        title: "options1"
      },
      {
        title: "options2"
      },
      {
        title: "options3"
      }
    ],
    animated: false
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { visible } = this.props;
    return (
      <div className="action-sheet-wrap">
        <div
          className="mask"
          style={{ opacity: visible ? 1 : 0 }}
          onClick={() => this.props.onCancel()}
        ></div>
        <div
          className="action-sheet-content"
          style={{
            transform: `translateY(${visible ? "0%" : "100%"})`
          }}
        >
          <div className="action-list">
            <ul className="action-ul">
              {this.props.datasource.map(
                (actionItem: ActionSheetItem, index: number) => {
                  return (
                    <li
                      className="action-li"
                      key={index}
                      onClick={() => this.props.onCancel()}
                    >
                      {actionItem.element
                        ? actionItem.element
                        : actionItem.label}
                    </li>
                  );
                }
              )}
            </ul>
          </div>
          <div
            className="action-foot action-list"
            onClick={() => {
              this.props.onCancel();
            }}
          >
            取消
          </div>
        </div>
      </div>
    );
  }
}
