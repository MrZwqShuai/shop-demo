import * as React from "react";
import "./index.scss";
interface Props {
  onChange?: (count: number) => void;
}

interface State {
  count: number;
}

// 加减器
export default class MyAdderSubtracter extends React.PureComponent<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 1,
    };
  }
  render() {
    return (
      <div className="my-adder-subtracter">
        <div className="add-more">
          <span className="minus" onClick={() => this.removeGoodsNumber()}>
            ➖
          </span>
          <div className="input-wrap">
            <input
              type="tel"
              onChange={e => this.handleChange(e)}
              value={this.state.count}
            />
          </div>
          <span className="plus" onClick={() => this.addGoodsNumber()}>
            ➕
          </span>
        </div>
      </div>
    );
  }

  private handleChange(e): void {
    this.setState({
      count: e.target.value,
    });
    this.props.onChange(this.state.count);
  }

  private addGoodsNumber(): void {
    const addCount = this.state.count + 1;
    this.setState({
      count: addCount,
    });
    this.props.onChange(this.state.count);
  }

  private removeGoodsNumber(): void {
    const subCount = this.state.count - 1;
    this.setState({
      count: subCount,
    });
    this.props.onChange(this.state.count);
  }
}
