'use strict';
import React from 'react'
import JRoll from './jroll'
import PropTypes from 'prop-types';
import objectAssign  from 'object-assign'
import classnames from 'classnames';
import './index.less'
export default class Layout extends React.Component {
    static propTypes = {
        height:PropTypes.string,
        width:PropTypes.string,
        widthItem:PropTypes.string,
        prefixCls:PropTypes.string,
        style:PropTypes.object,
        options:PropTypes.object,
        ID:PropTypes.string
    };
    static defaultProps = {
        height:"100vh",
        width:"100%",
      widthItem:"100%",
        prefixCls:"my-iscroll",
        style:{
            background:'#fff'
        },
        options:{},
        ID:"wrappers"
    };
    constructor(props) {
        super(props)
        this.jroll = null
    }
    componentDidMount() {
        const {options} = this.props;
        let wrappers = this.props.ID 
        this.jroll = new JRoll(`#${wrappers}`,options)
        this.jroll.refresh()
        this.jroll.on('scrollEnd', (e) => {
            this.jroll.refresh()
        })
        this.jroll.on('scroll', (e) => {
            console.dir(e)
        })
        
    }
    componentDidUpdate() {
        setTimeout(() =>  {
            if (!!this.jroll) {
                this.jroll.refresh()
            }
        }, 400)
    }
    componentWillUnmount() {
        this.jroll.destroy()
    }
    render() {
        
        let { height,style ,prefixCls} = this.props;
        style =  objectAssign({},style,{height:height});
        return (
            <div
                id={this.props.ID}
                style={style}
                className={prefixCls}
            >
                <div
                    className="clearfix scrollx-warp"
                    id="scroller"
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}