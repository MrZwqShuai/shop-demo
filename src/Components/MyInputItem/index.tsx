import { InputItem } from "antd-mobile";
import * as React from "react";
import "./index.scss";
interface Props {
  onChange?: (val: string) => void;
  onFocus?: (val: string) => void;
}

interface State {}

export default class MyInputItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { onChange, onFocus } = this.props;
    return (
      <div className="search-wrap">
        <span className="search-btn"></span>
        <InputItem
          onChange={val => onChange(val)}
          onFocus={val => onFocus(val)}
          clear
          placeholder="搜索内容"
        ></InputItem>
      </div>
    );
  }
}
