import * as React from "react";
import "./index.scss";
import routeAnimation from "../../../Config/animation/route-animation";
/* eslint no-nested-ternary:0 */
import { Tabs, Toast } from "antd-mobile";
import { render } from "react-dom";
import { fetchCategoryLit, fetchCategoryGrandsonLit } from "../../../Api";
import {
  Category,
  CategoryGrandsonMix,
  CategoryGrandson,
} from "../../../Interface";

interface Props {}
interface State {
  tabs: Array<object>;
  categoryGrandsonMixList: Array<CategoryGrandsonMix>;
}
const ChannelPage = routeAnimation(
  class ChannelPage extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        tabs: [],
        categoryGrandsonMixList: [],
      };
    }

    render() {
      return (
        <div className="channel-wrap">
          {this.renderChannelMenu()}
          {this.renderChannelContent(this.state.categoryGrandsonMixList)}
        </div>
      );
    }

    public componentDidMount() {
      this.fetchCategoryLit();
    }

    /**
     * 左边菜单
     */
    private renderChannelMenu() {
      return (
        <div className="channel-left-wrap">
          <Tabs
            tabs={this.state.tabs}
            initialPage={this.state.tabs.length && this.state.tabs[5].key}
            useOnPan={true}
            tabBarTextStyle={{
              width: "86px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              backgroundColor: "#f7f7f7",
            }}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={10} />}
            tabBarPosition="left"
            tabDirection="vertical"
            onTabClick={(data, index) => this.handleTabClick(data, index)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "250px",
                backgroundColor: "#fff",
              }}
            >
              Content of first tab
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "250px",
                backgroundColor: "#fff",
              }}
            >
              Content of second tab
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "250px",
                backgroundColor: "#fff",
              }}
            >
              Content of third tab
            </div>
          </Tabs>
          {/* <WhiteSpace /> */}
        </div>
      );
    }

    /**
     * 右边内容
     */
    private renderChannelContent(categoryGrandsonMixList) {
      const length = categoryGrandsonMixList.length;
      return (
        <div
          className={
            length
              ? "channel-right-wrap"
              : "channel-right-wrap channel-right-wrap-empty"
          }
        >
          {length
            ? categoryGrandsonMixList.map(categoryGrandsonMix => {
                return this.renderChannelCateContent(categoryGrandsonMix);
              })
            : "暂无数据"}
        </div>
      );
    }
    private renderChannelContentItem(categoryGrandson: CategoryGrandson) {
      return (
        <div className="channel-content-item">
          <div className="goods-img">
            <img src={categoryGrandson.category_thumbnail} alt="" />
          </div>
          <div className="goods-cate">{categoryGrandson.grandson_name}</div>
        </div>
      );
    }

    /**
     * 渲染一个分类的区域 如 家电区域
     */
    private renderChannelCateContent(categoryGrandsonMix: CategoryGrandsonMix) {
      return (
        <div className="channel-cate-content">
          <div className="head">
            <h4 className="title">{categoryGrandsonMix.name}</h4>
            <a className="head-link">排行榜></a>
          </div>
          <div
            className={
              categoryGrandsonMix.list.length
                ? "cate-content"
                : "cate-content-empty"
            }
          >
            {categoryGrandsonMix.list.length
              ? categoryGrandsonMix.list.map(categoryGrandson => {
                  return this.renderChannelContentItem(categoryGrandson);
                })
              : "暂无数据"}
          </div>
        </div>
      );
    }

    /**
     *
     * @param item {object} tab的数据
     * @param index {number} tab 下标
     */
    private handleTabClick(item: { id: number }, index): void {
      Toast.loading("加载中...", 0);
      this.fetchCategoryGrandsonLit(item.id);
    }

    /**
     * 获取一级分类所有列表（这个后期是固定的长度）
     */
    private async fetchCategoryLit() {
      Toast.loading("加载中...", 0);
      const { data } = await fetchCategoryLit<Array<Category>>();
      const tabs: Array<Object> = data.content.map(category => {
        return {
          title: category.category_name,
          key: category.id,
          id: category.id,
        };
      });
      this.setState({
        tabs: tabs,
      });
      data.content.length && this.fetchCategoryGrandsonLit(data.content[0].id);
    }

    /**
     *
     * @param categoryId 一级分类id
     */
    private async fetchCategoryGrandsonLit(categoryId: number) {
      const { data } = await fetchCategoryGrandsonLit<
        Array<CategoryGrandsonMix>
      >({
        categoryId: categoryId,
      });
      this.setState({
        categoryGrandsonMixList: data.content,
      });
    }
  },
);
export default ChannelPage;
