import * as React from "react";
import "./index.scss";
interface Props {}
interface State {}
export default class ProductFilterMoreComponent extends React.PureComponent<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="product-filter-more-wrap">
        <ul className="table-bar">
          <li>
            <a className="bar-item">京东物流</a>
          </li>
          <li>
            <a className="bar-item">京东物流</a>
          </li>
          <li>
            <a className="bar-item">京东物流</a>
          </li>
          <li>
            <a className="bar-item">
              <span>京东物流</span>
              <i />
            </a>
          </li>
          <li>
            <a className="bar-item">京东物流2</a>
          </li>
          <li>
            <a className="bar-item">京东物流3</a>
          </li>
          <li>
            <a className="bar-item">京东物流4</a>
          </li>
        </ul>
      </div>
    );
  }
}
