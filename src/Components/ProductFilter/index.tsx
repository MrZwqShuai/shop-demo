import * as React from "react";
import { List, Checkbox, Radio } from "antd-mobile";
const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;
import "./index.scss";
import { OnChangeParams } from "antd-mobile/lib/checkbox/PropsType";
interface IOption {
  label: string;
  value: string;
  checked?: boolean;
}
interface FilterTabView {
  viewShow: boolean;
  viewList: Array<IOption>;
  currentValue?: string | Array<string>;
}
interface FilterTab {
  key: string;
  title: string;
  label?: string;
  value?: string;
  sort: boolean;
  hasUpDownIcon: boolean;
  options?: Array<IOption>;
}
type Props = {
  filterTabs: Array<FilterTab>;
};
type State = {
  showMore: boolean;
  sortStatus: number;
  // 多选筛选下拉
  checkboxView: FilterTabView;
  // 单选筛选下拉
  radioView: FilterTabView;
  // 右侧筛选screnn
  showFilterSliderView: boolean;
  filterTabs: Array<FilterTab>;
  currentTabIndex: number;
};
export default class ProductFilterComponent extends React.PureComponent<
  Props,
  State
> {
  static defaultProps: Props = {
    filterTabs: [
      {
        key: "ZH",
        title: "综合",
        sort: false,
        hasUpDownIcon: true,
      },
      {
        key: "XL",
        title: "销量",
        value: "XL",
        sort: true,
        hasUpDownIcon: false,
      },
      {
        key: "FW",
        title: "服务",
        sort: false,
        hasUpDownIcon: true,
      },
      {
        key: "SX",
        title: "筛选",
        value: "SX",
        sort: false,
        hasUpDownIcon: false,
      },
    ],
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      showMore: false,
      sortStatus: 0,
      radioView: {
        viewShow: false,
        viewList: [
          { label: "综合", value: "1", checked: true },
          { label: "最新上架", value: "2", checked: false },
          { label: "价格最低", value: "3", checked: false },
          { label: "价格最高", value: "4", checked: false },
          { label: "评价最多", value: "5", checked: false },
        ],
      },
      checkboxView: {
        viewShow: false,
        viewList: [
          { label: "有货优先", value: "6", checked: false },
          { label: "货到付款", value: "7", checked: false },
          { label: "海囤全球", value: "8", checked: false },
          { label: "PLUS专享价", value: "9", checked: false },
          { label: "促销商品", value: "10", checked: false },
          { label: "配送全球", value: "11", checked: false },
        ],
      },
      showFilterSliderView: false,
      filterTabs: [],
    };
  }

  public componentDidMount() {
    this.setState({
      filterTabs: this.props.filterTabs,
    });
  }

  public render(): JSX.Element {
    return (
      <div className="product-filter-wrap">
        <ul>
          {this.state.filterTabs.map((filterTab: FilterTab, index) => {
            return this.renderFilterTab(filterTab, index);
          })}
        </ul>
        <div
          className="filter-mask"
          style={{
            display:
              this.state.checkboxView.viewShow || this.state.radioView.viewShow
                ? "block"
                : "none",
          }}
          onClick={() => {
            this.setState({
              checkboxView: {
                ...this.state.checkboxView,
                viewShow: false,
              },
              radioView: {
                ...this.state.radioView,
                viewShow: false,
              },
            });
          }}
        />
        <div className="filter-options">{this.renderFilterOption()}</div>
      </div>
    );
  }

  /**
   * render each filtertab
   * @param filterTab filtertabs item
   */
  private renderFilterTab(filterTab: FilterTab, index: number): JSX.Element {
    return (
      <li
        onClick={() => {
          this.handlerFilterTabClick(filterTab, index);
        }}
        key={filterTab.key}
      >
        <a>{filterTab.title}</a>
        {filterTab.hasUpDownIcon ? (
          <span
            className={`${
              filterTab.hasUpDownIcon ? "sort-up" : "sort-down"
            } sort-icon`}
          />
        ) : null}
      </li>
    );
  }

  /**
   * render filter view
   */
  private renderFilterOption(option?: State): JSX.Element {
    if (this.state.radioView.viewShow) {
      return this.renderRadioSelection();
    } else if (this.state.checkboxView.viewShow) {
      return this.renderCheckboxSelection();
    }
  }

  /**
   * render the radio select options
   * @returns {JSX.Element}
   */
  private renderRadioSelection(): JSX.Element {
    return (
      <ul className="radio-options">
        {this.state.radioView.viewList ? (
          <List>
            {this.state.radioView.viewList.map((option, index) => (
              <RadioItem
                key={option.value}
                checked={option.checked}
                onChange={() => {
                  this.handlerRadioItemCLick(option, index);
                }}
                className={`${option.checked ? "my-check-item" : ""}`}
              >
                {option.label}
              </RadioItem>
            ))}
          </List>
        ) : (
          <li>暂无数据</li>
        )}
      </ul>
    );
  }

  /**
   * render checkbox select options
   */
  private renderCheckboxSelection(): JSX.Element {
    return (
      <ul className="checkbox-options">
        {/* <li className="checkbox-item">有货优先</li> */}
        <List>
          {this.state.checkboxView.viewList.map((option: IOption, index) => (
            <CheckboxItem
              key={option.value}
              onChange={() => {
                this.handlerCheckItemCLick(option, index);
              }}
              checked={option.checked}
              className={`${option.checked ? "my-check-item" : ""}`}
            >
              {option.label}
            </CheckboxItem>
          ))}
          {/* <CheckboxItem key="disabled" data-seed="logId" disabled defaultChecked multipleLine>
          Undergraduate<List.Item.Brief>Auxiliary text</List.Item.Brief>
        </CheckboxItem> */}
        </List>
        <div className="btns">
          <a
            href="javascript:"
            onClick={() => {
              this.handlerReset();
            }}
            className="reset-btn"
          >
            重置
          </a>
          <a
            href="javascript:"
            onClick={() => {
              this.handlerSure();
            }}
            className="sure-btn"
          >
            确认
          </a>
        </div>
      </ul>
    );
  }

  /**
   *
   * @param showMore  是否展示更多筛选条件
   * @param sortStatus 升序或降序 0 降序 1 升序
   */
  private sort(showMore: boolean, sortStatus?: number): void {
    if (showMore) {
      this.setState({
        showMore: !this.state.showMore,
      });
    }
    console.log(showMore, this.state.showMore);
  }

  /**
   * search the product by params
   * @param params search params
   */
  private fetchProducts(params: object): void {
    console.log(params, "dsadlsdk");
  }

  /**
   *
   * @param filterTab
   * @param index current tab inx
   */
  private handlerFilterTabClick(filterTab: FilterTab, index: number): void {
    console.log(filterTab, "dasdsadas");
    if (filterTab.key == "ZH") {
      // 第一个tab
      this.setState({
        radioView: {
          ...this.state.radioView,
          viewShow: !this.state.radioView.viewShow,
        },
        checkboxView: {
          ...this.state.checkboxView,
          viewShow: false,
        },
      });
    } else if (filterTab.key == "FW") {
      // 第三个tab
      this.setState({
        checkboxView: {
          ...this.state.checkboxView,
          viewShow: !this.state.checkboxView.viewShow,
        },
        radioView: {
          ...this.state.radioView,
          viewShow: false,
        },
      });
    }
    this.setState({
      currentTabIndex: index,
    });
  }

  /**
   *
   * @param option current radio item
   * @param index current item index
   */
  private handlerRadioItemCLick(option: IOption, index: number): void {
    this.state.filterTabs[this.state.currentTabIndex].title = option.label;
    this.state.radioView.viewList.forEach((item: IOption, index) => {
      item.checked = false;
    });
    this.state.radioView.viewList[index].checked = !this.state.radioView
      .viewList[index].checked;
    this.setState({
      radioView: {
        ...this.state.radioView,
        viewShow: false,
      },
    });
  }

  /**
   * checkitem has been clicked
   * @param option current checkbox item
   * @param index current checkbox item index
   */
  private handlerCheckItemCLick(option: IOption, index: number): void {
    this.state.checkboxView.viewList[index].checked = !this.state.checkboxView
      .viewList[index].checked;
    this.setState({
      checkboxView: {
        ...this.state.checkboxView,
      },
    });
  }

  private handlerReset(): void {
    this.state.checkboxView.viewList.map((item: IOption) => {
      item.checked = false;
    });
    console.log(this.state.checkboxView.viewList);

    this.setState({
      checkboxView: {
        ...this.state.checkboxView,
      },
    });
  }

  private handlerSure(): void {
    const checkedArrsStr = this.state.checkboxView.viewList
      .filter((item: IOption) => {
        return item.checked;
      })
      .map((item: IOption) => {
        return item.label;
      })
      .join(",");
    this.state.filterTabs[this.state.currentTabIndex].title = checkedArrsStr;
    this.setState({
      checkboxView: {
        ...this.state.checkboxView,
        viewShow: false,
      },
    });
  }
}
