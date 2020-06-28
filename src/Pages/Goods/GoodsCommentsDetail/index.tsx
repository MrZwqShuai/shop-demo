import * as React from 'react'
import './index.scss'
import { stringify } from 'querystring'
interface User {
    id?: string
    name: string
    avatar: string
}
interface Props {}

interface State {
    user: User
    subComments: Array<string>
    // 评价星数
    starNumber: number
    createTime: string
}

export default class GoodsCommentsDetailPage extends React.PureComponent<
    Props,
    State
> {
    constructor(props: Props) {
        super(props)
        this.state = {
            user: {
                name: '小铁盒',
                avatar: '',
            },
            subComments: [],
            starNumber: 0,
            createTime: '',
        }
    }
    render() {
        return <div className="page-goods-comments-detail">商品详情</div>
    }

    private fetchGoodsSpuCommentsDetail(): void {
        if (true) {
            console.log(222)
        }
    }

    componentDidMount() {
        this.fetchGoodsSpuCommentsDetail()
    }
}
