import * as React from 'react'
import { withRouter } from 'react-router-dom'
import qs from 'qs'
import MySwiperComponent from './../../../Components/MySwiper/index'
import { Banner } from './../../../Components/MySwiper/shared/banner.interface'
import BuyAreaComponent from './components/buy-area/index'
import CommentsAreaComponent from './components/comments-area/index'
import GuessAreaComponent from './components/guess-area/index'
import './index.scss'
import BuyBarComponent from './../../../Components/BuyBar/index'
import { fetchGoodsDetail } from '../../../Api'
import { GoodsSpuDetail } from '../../../Interface/goods'
import { observer, inject } from 'mobx-react'
import MyHeader from '../../../Components/MyHeader'
import HeadTabComponent from './components/head-tab'
import RecommendAreaComponent from './components/recommend-area'

interface PageScrollInfo {
    goodsAreaHeight: number
    commentAreaFromPageTopHeight: number
    detailAreaFromPageTopHeight: number
}

interface Tab {
    label: string
    id: number
    active: boolean
}

interface Props {}

interface State {
    active: number
    tabs: Array<Tab>
    banners: Array<Banner>
    // goodsSpuDetail: GoodsSpuDetail;
}

@inject('GoodsSpuStore')
@observer
export default class GoodsDetailPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            active: 0,
            tabs: [
                { label: '商品', id: 0, active: true },
                { label: '评价2', id: 0, active: true },
                { label: '详情', id: 0, active: true },
                { label: '推荐', id: 0, active: true },
            ],
            banners: [
                {
                    name: 'banner1',
                    src: '',
                    url: '',
                },
            ],
        }
    }
    public render() {
        const { goodsSpuDetail } = this.props.GoodsSpuStore
        const { active, tabs } = this.state
        return (
            <div className="goods-detail-wrapper">
                <MyHeader
                    centerContent={
                        <HeadTabComponent
                            active={active}
                            list={tabs}
                            onTabClick={(index) => this.handleTabClick(index)}
                        ></HeadTabComponent>
                    }
                />
                <div className="swiper-area" ref="swiperAreaRef">
                    <MySwiperComponent
                        datasource={
                            goodsSpuDetail.banners &&
                            goodsSpuDetail.banners.split(',')
                        }
                    />
                </div>
                <div className="goods-area" ref="goodsAreaRef">
                    <BuyAreaComponent goodsSpuDetail={goodsSpuDetail} />
                </div>
                <div className="comments-area" ref="commentAreaRef">
                    <CommentsAreaComponent />
                </div>
                <div className="detail-area" ref="detailAreaRef">
                    <GuessAreaComponent />
                </div>
                <div className="recommend-area" ref="recommendAreaRef">
                    <RecommendAreaComponent />
                </div>
                <BuyBarComponent />
            </div>
        )
    }

    public componentDidMount() {
        const { spu_no } = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true,
        })
        // this.fetchGoodsDetail(spu_no);
        this.props.GoodsSpuStore.fetchGoodsSpuDetail(spu_no)
        this.initScrollEvent()
    }

    public componentWillUnmount() {
        this.destoryScrollEvent()
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps, '----newProps---')
        const { spu_no } = qs.parse(newProps.location.search, {
            ignoreQueryPrefix: true,
        })
        this.props.GoodsSpuStore.fetchGoodsSpuDetail(spu_no)
    }

    private handleTabClick(index): void {
        const HEAD_HEIGHT = 45
        let _this = this
        const myheight = Object.values(_this.pageScrollInfo())[index - 1]
        let timer = requestAnimationFrame(function fn() {
            const currentScrollTop =
                document.documentElement.scrollTop + document.body.scrollTop
            if (
                currentScrollTop >= myheight - HEAD_HEIGHT + 150 ||
                currentScrollTop <= myheight - HEAD_HEIGHT - 150
            ) {
                const currentScrollTop =
                    document.documentElement.scrollTop + document.body.scrollTop
                currentScrollTop < myheight - HEAD_HEIGHT
                    ? window.scrollTo(0, currentScrollTop + 150)
                    : window.scrollTo(0, currentScrollTop - 150)
                timer = requestAnimationFrame(fn)
            } else {
                window.scrollTo(0, myheight - HEAD_HEIGHT + 2)
                cancelAnimationFrame(fn)
            }
        })
    }

    /**
     * 滚动信息
     */
    private pageScrollInfo(): PageScrollInfo {
        const swiperAreaRef = this.refs.swiperAreaRef || {}
        const goodsAreaRef = this.refs.goodsAreaRef || {}
        const commentAreaRef = this.refs.commentAreaRef || {}
        const detailAreaRef = this.refs.detailAreaRef || {}
        const recommendAreaRef = this.refs.recommendAreaRef || {}
        const goodsAreaHeight =
            swiperAreaRef.offsetHeight + goodsAreaRef.offsetHeight
        const commentAreaFromPageTopHeight =
            commentAreaRef.offsetHeight + goodsAreaHeight
        const detailAreaFromPageTopHeight =
            detailAreaRef.offsetHeight + commentAreaFromPageTopHeight
        // const recommendAreaHeight = recommendAreaRef.offsetHeight;
        return {
            goodsAreaHeight: goodsAreaHeight,
            commentAreaFromPageTopHeight: commentAreaFromPageTopHeight,
            detailAreaFromPageTopHeight: detailAreaFromPageTopHeight,
        }
    }

    private handlePageScroll() {
        const HEAD_HEIGHT = 45
        const scrollTop =
            document.body.scrollTop + document.documentElement.scrollTop
        if (scrollTop <= this.pageScrollInfo().goodsAreaHeight - HEAD_HEIGHT) {
            this.setState({
                active: 0,
            })
        } else if (
            scrollTop >= this.pageScrollInfo().goodsAreaHeight - HEAD_HEIGHT &&
            scrollTop <=
                this.pageScrollInfo().commentAreaFromPageTopHeight - HEAD_HEIGHT
        ) {
            this.setState({
                active: 1,
            })
        } else if (
            scrollTop >=
                this.pageScrollInfo().commentAreaFromPageTopHeight -
                    HEAD_HEIGHT &&
            scrollTop <=
                this.pageScrollInfo().detailAreaFromPageTopHeight - HEAD_HEIGHT
        ) {
            this.setState({
                active: 2,
            })
        } else if (
            scrollTop >=
            this.pageScrollInfo().detailAreaFromPageTopHeight - HEAD_HEIGHT
        ) {
            this.setState({
                active: 3,
            })
        }
    }

    /**
     * 在didmount钩子初始化监听页面scroll事件
     */
    private initScrollEvent() {
        window.addEventListener('scroll', () => this.handlePageScroll())
    }
    private destoryScrollEvent() {
        window.removeEventListener('scroll', () => this.handlePageScroll())
    }
}
