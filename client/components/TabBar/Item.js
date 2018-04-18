import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import './index.less'
class TabBarItem extends React.PureComponent {
		static contextTypes = {
			router: PropTypes.object.isRequired
		};
		static propTypes = {
			selectedColor:PropTypes.string,
			color:PropTypes.string,
			title:PropTypes.string,
			dot:PropTypes.bool,
			badge:PropTypes.bool,
			selectedIcon:PropTypes.oneOfType([PropTypes.element ,PropTypes.string]) ,
			icon:PropTypes.oneOfType([PropTypes.element ,PropTypes.string]),
      link:PropTypes.string
		};
		static defaultProps = {
			selectedColor:'rgb(255, 219, 83)',
			color:'rgb(148, 148, 148)',
			title:"首页",
			dot:false,
      link:"",
			badge:false,
			selectedIcon:"http://testxws.sibumbg.com/resources/client/images/35nXHFWYgg.png",
			icon:"http://testxws.sibumbg.com/resources/client/images/3BVdfCFikk.png"

		};
		constructor(props) {
				super(props)
        this.state = {}
    }
		renderIcon = () => {
			const {
				dot,
				badge,
				selectedIcon,
				icon,
				title,
        link
			} = this.props;
      const {pathname} = this.context.router.route.location;
      const selected = (pathname==link?true:false)
			const iconRes = selected ? selectedIcon : icon;
			const iconDom = React.isValidElement(iconRes) ? (
				iconRes
			) : (
				<img
					className="image"
					src={iconRes}
					alt={title}
				/>
			);
			if (badge) {
				return (
					<span className="tab-badge">
						{iconDom}
						<sup className="badge-text">{badge}</sup>
					</span>
				);
			}
			if (dot) {
				return (
					<span  className="tab-dot">
						{iconDom}
						<sup className="badge-dot"></sup>
					</span>
				);
			}
			return iconDom;
		}
    render() {
				const {selectedColor,color,title,link} = this.props;
				const {pathname} = this.context.router.route.location;
				const selected = (pathname==link?true:false)
        return (
            <Link className="tab-bar-item" to={link}>
							<div>
								{this.renderIcon()}
							</div>
							<div className="title" style={{color:selected?selectedColor:color}}>
								{title}
							</div>
            </Link>
        )
    }
}
export default TabBarItem