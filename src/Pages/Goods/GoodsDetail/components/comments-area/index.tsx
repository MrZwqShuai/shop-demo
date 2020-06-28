import * as React from 'react'
import './index.scss'
import arrowRight from '../../../../../Assets/images/arrow-right.png'
import MyCell from '../../../../../Components/MyCell'
import { withRouter } from 'react-router-dom'

interface Props {}

@withRouter
export default class CommentsAreaComponent extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props)
        this.state = {
            tags: [
                {
                    name: '尺寸标准',
                    num: 544,
                },
                {
                    name: '尺寸标准',
                    num: 544,
                },
                {
                    name: '尺寸标准',
                    num: 544,
                },
                {
                    name: '尺寸标准',
                    num: 544,
                },
                {
                    name: '尺寸标准',
                    num: 544,
                },
                {
                    name: '尺寸标准',
                    num: 544,
                },
            ],
        }
    }

    public render() {
        return (
            <div className="comments-area-wrapper">
                <div
                    className="header"
                    onClick={() => {
                        this.props.history.push({
                            pathname: 'goods/comments',
                        })
                    }}
                >
                    <span className="comments-text">宝贝评价(999+)</span>
                    <span className="all">
                        <span>查看全部</span>
                        <img src={arrowRight} alt="" />
                    </span>
                </div>
                <div className="comments-tag-wrap">
                    {this.state.tags.map((tag) => {
                        return (
                            <div className="tag-item">
                                {tag.name}
                                {tag.num}
                            </div>
                        )
                    })}
                </div>
                <div className="body">
                    <div className="comments-wrap m3">
                        <div className="user">
                            <span className="avatar" />
                            <span className="name">张***</span>
                            <span className="name">2020-6-1</span>
                        </div>
                        <div className="comments">
                            一次非常满意的网购，性价比很高
                            ，这套很适合我的小客厅，客服很好，在春运这么紧张的时间段帮我们安排得妥妥的
                        </div>
                    </div>{' '}
                    <div className="comments-wrap m3">
                        <div className="user">
                            <span className="avatar" />
                            <span className="name">张***</span>
                            <span className="name">2020-6-1</span>
                        </div>
                        <div className="comments">
                            一次非常满意的网购，性价比很高
                            ，这套很适合我的小客厅，客服很好，在春运这么紧张的时间段帮我们安排得妥妥的
                        </div>
                    </div>{' '}
                    <div className="comments-wrap m3">
                        <div className="user">
                            <span className="avatar" />
                            <span className="name">张***</span>
                            <span className="name">2020-6-1</span>
                        </div>
                        <div className="comments">
                            一次非常满意的网购，性价比很高
                            ，这套很适合我的小客厅，客服很好，在春运这么紧张的时间段帮我们安排得妥妥的
                        </div>
                    </div>
                    <div className="picture-wrap m3">买家相册</div>
                    <div className="question-wrap m3">
                        <div className="header">
                            <span className="comments-text">问答</span>
                            <span className="all">
                                <span>查看全部</span>
                                <img src={arrowRight} alt="" />
                            </span>
                        </div>
                        <div className="question-list">
                            <span className="question-txt">有鼠标吗</span>
                            <span className="question-num">共0个回答</span>
                        </div>
                        <div className="question-list">
                            <span className="question-txt">
                                性能怎么样? 好用吗
                            </span>
                            <span className="question-num">共0个回答</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
