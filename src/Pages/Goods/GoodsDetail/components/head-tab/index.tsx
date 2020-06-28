import * as React from 'react'
import './index.scss'
interface Tab {
    label: string
    id: number
    active: number
}
interface Props {
    list?: Array<Tab>
    active?: number
    onTabClick?: (index: number) => void
}

interface State {}

export default class HeadTabComponent extends React.PureComponent<
    Props,
    State
> {
    static defaultProps = {
        list: [
            { label: '商品', id: 0, active: true },
            { label: '评价', id: 0, active: true },
            { label: '详情', id: 0, active: true },
            { label: '推荐', id: 0, active: true },
        ],
    }

    constructor(props: Props) {
        super(props)
        this.state = {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(
            nextProps,
            prevState,
            'prevStateprevStateprevStateprevState'
        )
    }

    render() {
        const { active } = this.props
        return (
            <div className="component-toggle-tab">
                <ul className="tab-ul">
                    {this.props.list.map((item, index) => {
                        return (
                            <li
                                className="tab-li"
                                onClick={() => this.handleTabClick(index)}
                            >
                                <span
                                    className={`${
                                        index == active
                                            ? 'detail-tab-item-cur'
                                            : ''
                                    }`}
                                >
                                    {item.label}
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    private moveUnderline() {}

    private handleTabClick(index) {
        this.props.onTabClick(index)
    }
}
