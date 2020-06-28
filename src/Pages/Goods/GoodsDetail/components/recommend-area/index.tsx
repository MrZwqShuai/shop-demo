import * as React from 'react'
import './index.scss'
import { Carousel } from 'antd-mobile'
interface Props {}

interface State {}

export default class RecommendAreaComponent extends React.PureComponent<
    Props,
    State
> {
    constructor(props: Props) {
        super(props)
        this.state = {
            data: ['1', '2', '3'],
            // imgHeight: 176,
        }
    }
    render() {
        return (
            <div className="component-recommend-area">
                <div className="title">
                    <span>猜你喜欢</span>
                </div>
                <Carousel
                    autoplay={false}
                    infinite
                    beforeChange={(from, to) =>
                        console.log(`slide from ${from} to ${to}`)
                    }
                    afterChange={(index) => console.log('slide to', index)}
                >
                    {this.state.data.map((val) => (
                        <div className="ul">
                            <ul className="recommend-ul">
                                {[0, 1, 2].map(() => {
                                    return (
                                        <li className="recommend-li">
                                            {this.renderRecommendItem()}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}
                </Carousel>
            </div>
        )
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: [
                    'AiyWuByWklrrUDlFignR',
                    'TekJlZRVCjLFexlOCuWn',
                    'IJOtIlfsYdTyaDTRVrLI',
                ],
            })
        }, 100)
    }

    private renderRecommendItem(): JSX.Element {
        return (
            <div className="li">
                <span className="img-wrap">
                    <img
                        src="//img14.360buyimg.com/mobilecms/s270x270_jfs/t1/115392/5/9267/185608/5ed88da9E3d32e28f/e3ea14c89a86fea1.jpg"
                        alt=""
                    />
                </span>
                <div className="name">
                    {this.nameStrIntercept(
                        '【618抢先购】迪奥（Dior）口红套装999/520烈艳蓝金唇膏滋润/哑光生日送女朋友情人节礼物 变色唇膏004# 橘色'
                    )}
                </div>
                <span className="price-wrap">
                    ￥<span className="int">228</span>
                    .00
                </span>
            </div>
        )
    }

    private nameStrIntercept(name: string): string {
        let newstr = ''
        newstr = name.length > 10 ? name.substring(0, 15) : newstr
        return newstr + '...'
    }
}
