import * as React from "react";
import { ListView } from "antd-mobile";
import "./index.scss";
import ReactDOM from "react-dom";
function mockWait(time: number): Promise<any> {
  return new Promise(res => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      res();
    }, time);
  });
}
type Props = {
  renderRow: (
    rowData: any,
    sectionID: string | number,
    rowID: string | number,
    highlightRow?: boolean,
  ) => React.ReactElement<any>;
  data?: Array<object>;
  loadMore: (event: any) => void;
  noMore: boolean;
};
type State = {};
// export default class ScrollerViewComponent extends React.PureComponent<
//   Props,
//   State
// > {
//   constructor(props: Props) {
//     super(props);
//   }

//   render() {
//     return <div className="scroller-view-wrap">scrollerview</div>;
//   }
// }

function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: "none" }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

const NUM_SECTIONS = 1;
const NUM_ROWS_PER_SECTION = 1;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
// function genData(pIndex = 0) {
//   for (let i = 0; i < NUM_SECTIONS; i++) {
//     const ii = pIndex * NUM_SECTIONS + i;
//     const sectionName = `Section ${ii}`;
//     sectionIDs.push(sectionName);
//     dataBlobs[sectionName] = sectionName;
//     rowIDs[ii] = [];
//     for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
//       const rowName = `S${ii}, R${jj}`;
//       rowIDs[ii].push(rowName);
//       dataBlobs[rowName] = rowName;
//     }
//   }
//   sectionIDs = [...sectionIDs];
//   rowIDs = [...rowIDs];
// }
export default class ScrollerViewComponent extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);

    const dataSource = new ListView.DataSource({
      // getRowData,
      // getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
  }

  componentWillReceiveProps(props) {
    console.log(props, "willreceive");

    const hei =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(props.data),
      isLoading: false,
      height: hei,
    });
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  private onEndReached = async event => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    await mockWait(500);
    this.props.loadMore(event);
    console.log("reach end", event);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        this.props.data,
        // sectionIDs,
        // rowIDs,
      ),
      isLoading: false,
    });
  };

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: "#F5F5F9",
          height: 8,
          borderTop: "1px solid #ECECED",
          borderBottom: "1px solid #ECECED",
        }}
      />
    );
    return (
      <ListView
        className="scroller-view-wrap"
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: "center" }}>
            {this.props.noMore
              ? "我也是有底线的~"
              : this.state.isLoading
              ? "加载中..."
              : "加载数据完成"}
          </div>
        )}
        // renderSectionHeader={sectionData => (
        //   <div>{`Task ${sectionData.split(" ")[1]}`}</div>
        // )}
        // renderBodyComponent={() => <MyBody />}
        // renderRow={(rowData, sectionID, rowID) => {
        //   console.log(rowData, sectionID, rowID, "rowDatarowDatarowData");
        //   return this.props.children;
        // }}
        renderRow={this.props.renderRow}
        // renderSeparator={separator}
        style={{
          height: this.state.height,
          overflow: "auto",
        }}
        pageSize={1}
        onScroll={() => {
          console.log("scroll");
        }}
        scrollRenderAheadDistance={500}
        onEndReached={event => {
          this.onEndReached(event);
        }}
        onEndReachedThreshold={10}
      />
    );
  }
}