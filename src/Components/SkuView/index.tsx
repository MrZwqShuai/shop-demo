import * as React from "react";
import "./index.scss";
import { convertListToArray } from "../../Utils/common";
import MyAdderSubtracter from "../MyAdderSubtracter";
function hasClass(elem, cls) {
  cls = cls || "";
  if (cls.replace(/\s/g, "").length == 0) return false; //当cls没有参数时，返回false
  return new RegExp(" " + cls + " ").test(" " + elem.className + " ");
}

function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className == "" ? cls : ele.className + " " + cls;
  }
}

function removeClass(elem, cls) {
  if (hasClass(elem, cls)) {
    var newClass = " " + elem.className.replace(/[\t\r\n]/g, "") + " ";
    while (newClass.indexOf(" " + cls + " ") >= 0) {
      newClass = newClass.replace(" " + cls + " ", " ");
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, "");
  }
}

interface Props {
  datasource: Array<object>;
  onChange?: (value: Array<string>) => void;
  onCountChange?: (value: number) => void;
}

interface State {
  attrs: Array<string>;
  // 当前spu商品的所有sku属性集合
  skus: Array<object>;
}
let spliter = "\u2299";

export default class SkuView extends React.PureComponent<Props, State> {
  static defaultProps = {
    datasource: [
      { 颜色: "红色", 尺码: "大", 型号: "A", skuId: "3158055" },
      { 颜色: "白色", 尺码: "大", 型号: "A", skuId: "3158054" },
      { 颜色: "白色", 尺码: "中", 型号: "B", skuId: "3133859" },
      { 颜色: "蓝色", 尺码: "小", 型号: "D", skuId: "3133859" },
      { 颜色: "蓝色", 尺码: "小", 型号: "C", skuId: "3516833" },
    ],
  };

  initSkuKeys: string = "";
  res: object = {};
  // 属性 如["颜色", "型号", "尺寸"]
  keys: string[] = [];
  attrs: object[] = [];

  constructor(props: Props) {
    super(props);
    this.state = {
      attrs: [],
      skus: [],
    };
  }

  render() {
    const { attrs, skus } = this.state;
    return (
      <div className="sku-view">
        <div>
          {attrs.map((attrStr, index) => {
            return (
              <div key={index} className="sku-content">
                <div className="sku-kind">{attrStr}</div>
                <div className="sku-choose">
                  {skus[attrStr].map((item, subIndex) => {
                    return (
                      <span
                        key={subIndex}
                        className={`sku-item ${item.checked ? "active" : ""}`}
                        onClick={e =>
                          this.handleSkuValueChoose(attrStr, subIndex, e)
                        }
                      >
                        {item.value}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="adder-suber-wrap">
          <span className="title">数量</span>
          <MyAdderSubtracter
            onChange={value => this.handleAddSubtracterChange(value)}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.keys = this.filterKeysFromDS(this.props.datasource);
    this.attrs = this.combineAttr(this.keys, this.props.datasource);
    this.myRender(this.attrs.result);
    this.buildResult(this.attrs.items);
    this.keys.map(item => {
      this.attrs.result[item] = this.attrs.result[item].map(item => {
        return this.initSkuKeys.indexOf(item) != -1
          ? {
              value: item,
              checked: true,
            }
          : {
              value: item,
              checked: false,
            };
      });
    });
    this.setState({
      attrs: this.keys,
      skus: this.attrs.result,
    });
    const timer = setTimeout(() => {
      this.updateStatus(this.getSelectedItem());
      clearTimeout(timer);
    }, 0);
    console.log(this.keys, this.attrs.result, "resultresultresult");
  }

  /**
   * 初始化sku
   * @param data 初始化需要的sku数组
   */
  private myRender(data: Array<any>): void {
    console.log(this.attrs.result, "===");
    for (let i = 0; i < this.keys.length; i++) {
      let key = this.keys[i];
      let items = data[key];
      for (let j = 0; j < items.length; j++) {
        if (j == 0) {
          this.initSkuKeys += items[j];
        }
      }
    }
  }

  /**
   *
   * @param datasource 数据源
   * @param keys 数据属性 例如["颜色","型号"]
   */
  private combineAttr(keys: Array<string>, datasource: Array<object>) {
    var allKeys = [];
    var result = {};
    for (var i = 0; i < datasource.length; i++) {
      var item = datasource[i];
      var values = [];
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j]; //"颜色"
        if (!result[key]) result[key] = [];
        if (result[key].indexOf(item[key]) < 0) {
          result[key].push(item[key]);
        }
        values.push(item[key]);
      }
      // 生成数据例如 [{path: "红⊙大⊙A",sku: "315888"}, ...]
      allKeys.push({
        path: values.join(spliter),
        sku: item["skuId"],
      });
    }
    return {
      result: result,
      items: allKeys,
    };
  }

  /**
   * 筛选数据源的属性attr
   * @param datasource 数据远源
   */
  private filterKeysFromDS(datasource: Array<object>): Array<string> {
    return (
      (datasource &&
        Object.keys(datasource[0]).filter(item => item != "skuId")) ||
      []
    );
  }

  /**
   * 规格值选中
   * @param {string} attrStr 规格
   * @param {number} subIndex 当前规格值的下标
   */
  private handleSkuValueChoose(
    attrStr: string,
    subIndex: number,
    e: any,
  ): void {
    const { className, innerHTML } = e.target;
    // console.log(attrStr, subIndex, attrs, skus, className, "信息");
    if (!(className.indexOf("active") != -1)) {
      this.selectedCurrentSku(attrStr, subIndex);
      if (className.indexOf("disabled") != -1) {
        this.disabledClicked(attrStr, subIndex);
      }
    }
    const timer = setTimeout(() => {
      // this.chooseSkuValue();
      this.updateStatus(this.findActiveSkus());
      clearTimeout(timer);
    });
  }

  /**
   * 选中当前sku 并且渲染
   * @param attrStr
   * @param subIndex
   */
  private selectedCurrentSku(attrStr: string, subIndex: number): void {
    const { skus } = this.state;
    this.attrs.result[attrStr].forEach((item, index: number) => {
      if (subIndex === index) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
    let newSkus = JSON.parse(JSON.stringify(this.attrs.result));
    console.log("newSkus", this.attrs.result, newSkus);
    this.setState({
      skus: newSkus,
    });
  }

  private disabledClicked(attrStr: string, subIndex: number): void {
    console.log("禁用按钮点击", attrStr, subIndex);
    this.keys.map(item => {
      this.attrs.result[item].map($item => {
        $item.checked = false;
      });
    });
    console.log(this.attrs.result, this.keys, "嗡嗡嗡嗡嗡嗡");
    this.setState({
      skus: this.attrs.result,
    });
    this.selectedCurrentSku(attrStr, subIndex);
    setTimeout(() => {
      this.updateStatus(this.getSelectedItem());
    });
  }

  private chooseSkuValue(): void {
    const result = this.findActiveSkus();
    if (this.keys.length == result.length) {
      let curr = this.res[result.join(spliter)];
      let currentSkusVal = curr && curr.skus.toString();
      console.log(currentSkusVal, "dasdjaskldj");
    }
  }

  private findActiveSkus(): Array<string> {
    const result = [];
    const chooseNodeList = document.querySelectorAll(
      ".sku-content .sku-choose",
    );
    chooseNodeList.forEach((el, index) => {
      let currentSkuValStr = "";
      const chooseChildNodeList = convertListToArray(el.children);
      const hasActiveClassName = chooseChildNodeList.some(subEl => {
        if (subEl.className.indexOf("active") != -1) {
          currentSkuValStr = subEl.innerText;
        }
        return subEl.className.indexOf("active") != -1;
      });
      if (hasActiveClassName) {
        result.push(currentSkuValStr);
      } else {
        result.push("");
      }
    });
    return result;
  }

  /**
   * 幂集运算
   * 类如传入[1,2] 返回 0: []
          1: [1]
          2: [2]
          3: (2) [1, 2]
   * @param array 等待密集运算的数组
   */
  private powerset(array: Array<string>): Array<object> {
    let ps = [[]];
    for (var i = 0; i < array.length; i++) {
      for (var j = 0, len = ps.length; j < len; j++) {
        ps.push(ps[j].concat(array[i]));
      }
    }
    return ps;
  }

  /**
   * 生成所有子集可选，库存状态 map 例如 {{"": {sku: ["123456"]}},{"中-B": {sku: [123456]}}
   * @param items
   */
  private buildResult(items): void {
    // allKeys 应该是["红⊙大⊙A",...]
    let allKeys = this.getAllKeys(items);
    for (let i = 0; i < allKeys.length; i++) {
      let curr = allKeys[i];
      // sku值 如 315888
      let sku = items[i].sku;
      let values = curr.split(spliter);
      // 求幂集运算后所有可选属性
      let allSets = this.powerset(values);
      for (let j = 0; j < allSets.length; j++) {
        let set = allSets[j];
        let key = set.join(spliter);
        if (this.res[key]) {
          this.res[key].skus.push(sku);
        } else {
          this.res[key] = {
            skus: [sku],
          };
        }
      }
    }
  }

  private getAllKeys(arr): Array<string> {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      result.push(arr[i].path);
    }
    return result;
  }

  private getSelectedItem(): string[] {
    const result = this.findActiveSkus();
    // $("dl[data-type]").each(function() {
    //   var $selected = $(this).find(".active");
    //   if ($selected.length) {
    //     result.push($selected.val());
    //   } else {
    //     result.push("");
    //   }
    // });
    return result;
  }

  /**
   * 更新属性集状态
   *
   * @param selected 选中的属性值
   */
  private updateStatus(selected): void {
    for (let i = 0; i < this.keys.length; i++) {
      let key = this.keys[i];
      let data = this.attrs.result[key];
      let copy = selected.slice();
      for (let j = 0; j < data.length; j++) {
        let item = data[j];
        if (selected[i] == item.value) continue;
        copy[i] = item.value;
        var curr = this.trimSpliter(copy.join(spliter), spliter);
        const $item = this.skuElementsFilter(key, item.value);
        if (this.res[curr]) {
          // console.log(curr, "-----有属性搭配");
          removeClass($item, "disabled");
        } else {
          addClass($item, "disabled");
          // console.log(curr, "无属性搭配");
        }
      }
    }
    this.props.onChange(selected);
  }

  /**
   *
   * @param key 颜色 大小
   * @param skuValue 红，白，中，小，A，B
   */
  private skuElementsFilter(key, skuValue): any {
    const $item = undefined;
    const els = document.querySelectorAll(".sku-content ");
    els.forEach(el => {
      const currentNode = el.childNodes[0];
      if (currentNode.innerText == key) {
        const chooseParentNode = currentNode.nextSibling;
        chooseParentNode.childNodes.forEach(chooseEl => {
          // console.log(chooseEl.innerText, skuValue, "skuValueskuValue");
          if (chooseEl.innerText == skuValue) {
            $item = chooseEl;
          }
        });
      }
    });
    return $item;
  }

  /**
   * 格式化 字符串
   * // ⊙abc⊙ => abc // ⊙a⊙⊙b⊙c⊙ => a⊙b⊙c
   * @param str
   * @param spliter
   */
  private trimSpliter(str, spliter) {
    var reLeft = new RegExp("^" + spliter + "+", "g");
    var reRight = new RegExp(spliter + "+$", "g");
    var reSpliter = new RegExp(spliter + "+", "g");
    return str
      .replace(reLeft, "")
      .replace(reRight, "")
      .replace(reSpliter, spliter);
  }

  /**
   * 购物车计数器
   * @param value count值
   */
  private handleAddSubtracterChange(value: number): void {
    this.props.onCountChange(value);
  }
}
