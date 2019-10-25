import * as React from "react";
import "./index.scss";

type Props = {
  current: number;
  defaultCurrent?: number;
  total: number;
};
type State = {
  visiable: boolean;
};
export default class MyPagination extends React.Component<Props, State> {
  beforeCountdownScrollTop: number = 0;
  afterCountdownScrollTop: number = 0;
  countdownTimer: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      visiable: false,
    };
  }

  render() {
    return (
      <div
        className="component-pagination-wrap"
        style={{ display: this.state.visiable ? "block" : "none" }}
      >
        <div>
          {this.props.current}/{this.props.total}
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.onscroll = e => this.handlerScroll(e);
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  private isScrollend(e): void {
    this.afterCountdownScrollTop = e.target.scrollTop;
    if (this.beforeCountdownScrollTop == this.afterCountdownScrollTop) {
      this.setState({
        visiable: false,
      });
    }
  }

  private handlerScroll(e: Event): void {
    clearTimeout(this.countdownTimer);
    this.beforeCountdownScrollTop = e.target.scrollTop;
    this.countdownTimer = setTimeout(() => {
      this.isScrollend(e);
    }, 1000);
    this.setState({
      visiable: true,
    });
  }
}
