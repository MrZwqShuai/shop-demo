import * as React from "react";
import "./index.scss";
import MyHeader from "../MyHeader";
import MyInputItem from "../MyInputItem";
import { string } from "prop-types";
interface Props {
  onSearch: (message: string) => void;
}
interface State {
  message: string;
  shouldShowSearch: boolean;
}

export default class MyHeaderForSearch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: "",
      shouldShowSearch: false,
    };
  }
  render() {
    const { shouldShowSearch } = this.state;
    const { onSearch } = this.props;
    return (
      <MyHeader
        centerContent={
          <MyInputItem
            onFocus={message => this.handleInputFocus(message)}
            onChange={message => this.handleInputChange(message)}
          />
        }
        rightContent={
          shouldShowSearch
            ? [
                <span
                  className="search-btn-1"
                  onClick={() => {
                    onSearch(this.state.message);
                    this.setState({
                      shouldShowSearch: false,
                    });
                  }}
                >
                  搜索
                </span>,
              ]
            : null
        }
      />
    );
  }

  /**
   *
   * @param message 输入框内容
   */
  private handleInputFocus(message: string): void {
    console.log(message, "大苏打撒旦");
    this.setState({
      shouldShowSearch: true,
    });
  }

  /**
   *
   * @param message 输入框内容
   */
  private handleInputChange(message: string): void {
    console.log(message, "大苏打撒旦");
    this.setState({
      message: message,
    });
  }
}
