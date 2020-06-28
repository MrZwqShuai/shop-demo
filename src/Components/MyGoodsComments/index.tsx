import * as React from 'react'
import './index.scss'
import unStarIcon from './assets/images/unstar.png'
import starIcon from './assets/images/unstar.png'
import commentIcon from './assets/images/comment-icon.png'
import { Toast } from 'antd-mobile'
interface Comment {
    username: string
    avatar: string
    createTime: string
    contentTxt: string
    contentImg: Array<string>
    starNumber: number
}
interface Props {
    comment: Comment
}

interface State {}

export default class MyGoodsComments extends React.PureComponent<Props, State> {
    static defaultProps = {
        comment: {
            username: 'wqzhang9',
            avatar:
                'https://img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png',
            createTime: '2020-6-17',
            contentTxt:
                '本人起亚买菜车，车龄9年一直用京东银美孚1号，这不双11搞活动又囤货上了，价格比之前有优惠，买了3瓶，生产日期是2019年3月的，保质期5年足够了。发现银美孚还真适合咱们这车，发动机很安静还非常省油，朋友结婚从上海去次盐城来回大概是750km，基本上高速定速110，来回1箱油还剩1格，电脑显示续航100km，这样算下来用这个机油可以挑战1箱油1000km，以前用别的机油800油表就亮，我还是信赖大品牌，毕竟大厂东西还是靠谱些。美孚是一个非常好的机油品牌，银美孚1号机油是一款全合成机油，目前为止应该算是最好的机油之一了，能提供很好的发动机抗磨保护，承受各种温度并且能提高发动机的清洁性，适合已经使用了一定里程的车辆，全合成1万公里换一次油也行。另外这次双11送货速度也很快，京东快递非常给力，推荐大家购买。经济实惠，省下了不少银两，嘿嘿。',
            contentImg: [
                '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/70621/26/15240/66066/5dcc01a7Ebce154df/ccf417e31af47c72.jpg',
                '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/70621/26/15240/66066/5dcc01a7Ebce154df/ccf417e31af47c72.jpg',
                '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/70621/26/15240/66066/5dcc01a7Ebce154df/ccf417e31af47c72.jpg',
                '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/70621/26/15240/66066/5dcc01a7Ebce154df/ccf417e31af47c72.jpg',
                '//img30.360buyimg.com/shaidan/s128x96_jfs/t1/70621/26/15240/66066/5dcc01a7Ebce154df/ccf417e31af47c72.jpg',
            ],
            starNumber: 5,
        },
    }

    constructor(props: Props) {
        super(props)
        this.state = {}
    }
    render() {
        const { comment } = this.props
        return (
            <div className="component-goods-comments">
                <div className="comments-header">
                    <div className="comment-user">
                        <span className="avatar">
                            <img src={comment.avatar} alt="" />
                        </span>
                        <span className="username">{comment.username}</span>
                        <span>{comment.starNumber}星</span>
                    </div>
                    <span className="comment-time">{comment.createTime}</span>
                </div>
                <div className="comments-body">
                    <div className="txt-wrap">
                        <p>{comment.contentTxt}</p>
                    </div>
                    <div className="img-wrap">
                        <ul className="img-ul">
                            {comment.contentImg.map((item) => {
                                return (
                                    <li className="img-li">
                                        <img src={item} alt="" />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="comments-footer">
                    <div className="sku-wrap">
                        <span>颜色：</span>
                        <span>天蓝色</span>
                        <span>型号：</span>
                        <span>1L</span>
                    </div>
                    <div className="sub-comments">
                        <div
                            className="star-wrap sub"
                            onClick={() => this.handleStarClick()}
                        >
                            <span>6</span>
                            <span className="icon">
                                <img src={unStarIcon} alt="点赞" />
                            </span>
                        </div>
                        <div className="comments-wrap sub">
                            <span>20</span>
                            <span className="icon">
                                <img src={commentIcon} alt="回复" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    private handleStarClick(): void {
        Toast.success('点赞成功', 0.8)
    }
}
