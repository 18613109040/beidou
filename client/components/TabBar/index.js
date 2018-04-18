import React from 'react'
import PropTypes from 'prop-types';
import './index.less'
import Item from './Item'

class TabBar extends React.PureComponent {
    static propTypes = {
        tabs: PropTypes.array
    };
    static defaultProps = {
        tabs: [

        ]
    };
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const {tabs} = this.props;
        return (
            <div className="tab-bar">
                {
                    tabs.map((item, id) => (
                        <div className="tab-bar-bar" key={id}>
                            <Item {...item}/>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default TabBar