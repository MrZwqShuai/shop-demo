import * as React from 'react'
import MyHeader from '../../../Components/MyHeader'
import MyGoodsComments from '../../../Components/MyGoodsComments'
import './index.scss'
interface GoodsSku {
    value: string
}

interface FilterOptions {
    label: string
    value: number
}
interface User {
    id?: string
    name: string
    avatar: string
}
interface Comments {
    user: User
    content: any
    subComments: Array<string>
    // 评价星数
    starNumber: number
    createTime: string
    goodsSku: GoodsSku
}
interface Props {}
interface State {
    list: Array<Comments>
    goodsFilterOptions: Array<FilterOptions>
}
export default class GoodsCommentsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            list: [
                {
                    user: {
                        name: 'zwq222',
                        avatar: '',
                    },
                    content:
                        '这款相当大气，*  真的很不错 不管是手感还是外观都很喜欢 颜色也多 选了喜欢的     速度快 特别是音效 ',
                    subComments: [''],
                    starNumber: 0,
                    createTime: String(new Date()),
                    goodsSku: {
                        value: '黑色',
                    },
                },
                {
                    user: {
                        name: 'zwq222',
                        avatar: '',
                    },
                    content:
                        '这款相当大气，*  真的很不错 不管是手感还是外观都很喜欢 颜色也多 选了喜欢的     速度快 特别是音效 ',
                    subComments: [''],
                    starNumber: 0,
                    createTime: String(new Date()),
                    goodsSku: {
                        value: '黑色',
                    },
                },
                {
                    user: {
                        name: 'zwq222',
                        avatar: '',
                    },
                    content:
                        '这款相当大气，*  真的很不错 不管是手感还是外观都很喜欢 颜色也多 选了喜欢的     速度快 特别是音效 ',
                    subComments: [''],
                    starNumber: 0,
                    createTime: String(new Date()),
                    goodsSku: {
                        value: '黑色',
                    },
                },
                {
                    user: {
                        name: 'zwq222',
                        avatar: '',
                    },
                    content:
                        '这款相当大气，*  真的很不错 不管是手感还是外观都很喜欢 颜色也多 选了喜欢的     速度快 特别是音效 ',
                    subComments: [''],
                    starNumber: 0,
                    createTime: String(new Date()),
                    goodsSku: {
                        value: '黑色',
                    },
                },
                {
                    user: {
                        name: 'zwq222',
                        avatar: '',
                    },
                    content:
                        '这款相当大气，*  真的很不错 不管是手感还是外观都很喜欢 颜色也多 选了喜欢的     速度快 特别是音效 ',
                    subComments: [''],
                    starNumber: 0,
                    createTime: String(new Date()),
                    goodsSku: {
                        value: '黑色',
                    },
                },
                {
                    user: {
                        name: 'zwq222',
                        avatar: '',
                    },
                    content:
                        '这款相当大气，*  真的很不错 不管是手感还是外观都很喜欢 颜色也多 选了喜欢的     速度快 特别是音效 ',
                    subComments: [''],
                    starNumber: 0,
                    createTime: String(new Date()),
                    goodsSku: {
                        value: '黑色',
                    },
                },
                {
                    user: {
                        name: 'zwq222',
                        avatar: '',
                    },
                    content:
                        '这款相当大气，*  真的很不错 不管是手感还是外观都很喜欢 颜色也多 选了喜欢的     速度快 特别是音效 ',
                    subComments: [''],
                    starNumber: 0,
                    createTime: String(new Date()),
                    goodsSku: {
                        value: '黑色',
                    },
                },
                {
                    user: {
                        name: 'zwq222',
                        avatar: '',
                    },
                    content:
                        '这款相当大气，*  真的很不错 不管是手感还是外观都很喜欢 颜色也多 选了喜欢的     速度快 特别是音效 ',
                    subComments: [''],
                    starNumber: 0,
                    createTime: String(new Date()),
                    goodsSku: {
                        value: '黑色',
                    },
                },
                {
                    user: {
                        name: 'zwq222',
                        avatar: '',
                    },
                    content:
                        '这款相当大气，*  真的很不错 不管是手感还是外观都很喜欢 颜色也多 选了喜欢的     速度快 特别是音效 ',
                    subComments: [''],
                    starNumber: 0,
                    createTime: String(new Date()),
                    goodsSku: {
                        value: '黑色',
                    },
                },
            ],
            goodsFilterOptions: [
                {
                    label: '差评',
                    value: 1,
                },
            ],
        }
    }
    public render() {
        const { list } = this.state
        return (
            <div className="page-goods-comments">
                <MyHeader centerContent={<span>商品评价</span>} />
                <div className="goods-comments-body">
                    <div className="filter-wrap">筛选器</div>
                    <div className="list-wrap">
                        {list.map((item) => {
                            return <MyGoodsComments></MyGoodsComments>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
