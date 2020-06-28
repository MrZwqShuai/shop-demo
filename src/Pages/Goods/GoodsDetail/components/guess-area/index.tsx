import * as React from 'react'
import { Tabs } from 'antd-mobile'
import './index.scss'
const tabs2 = [
    { title: '产品介绍', sub: '1' },
    { title: '规格参数', sub: '2' },
    { title: '售后保障', sub: '3' },
]
interface Props {}
export default class GuessAreaComponent extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props)
    }

    public render() {
        return (
            <div className="guess-area-wrapper">
                <Tabs
                    swipeable={false}
                    useOnPan={false}
                    tabBarUnderlineStyle={{
                        backgroundColor: 'red',
                        margin: '0 52px',
                        width: '26px',
                        height: '4px',
                        textAlign: 'center',
                        border: 'none',
                        background: 'linear-gradient(90deg,#f5503a,#fad1cb)',
                    }}
                    tabBarActiveTextColor="#262626"
                    tabBarInactiveTextColor="#999"
                    tabBarTextStyle={{ fontSize: '13px' }}
                    tabs={tabs2}
                    initialPage={1}
                    renderTab={(tab) => <span>{tab.title}</span>}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '150px',
                            backgroundColor: '#fff',
                        }}
                    >
                        产品详情 产品详情 产品详情 产品详情
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '150px',
                            backgroundColor: '#fff',
                        }}
                    >
                        包装清单 篮球*1 塑料膜*1 防伪标签*1
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '150px',
                            backgroundColor: '#fff',
                            fontSize: '13px',
                        }}
                    >
                        服务承诺
                        京东商城向您保证所售商品均为正品行货，京东自营商品开具机打发票或电子发票。凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和
                    </div>
                </Tabs>
            </div>
        )
    }
}
