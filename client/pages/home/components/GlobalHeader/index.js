import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderSearch from '../HeaderSearch';
import { getMenuData } from '../../common/menu';
import './index.less';

export default class GlobalHeader extends PureComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
//   @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  onMenuClick(key){
  
    if (key === 'triggerError') {
     
      return;
    }
    if (key === 'logout') {
     
    }
  }
  handleMenuClick=(item)=>{
    this.context.router.history.push(item.key) 
  }
  getMenuItem = (data) => {
    console.dir(data)
    return data.map((item,index)=>{
      console.dir(item)
      return (
        <Menu.Item  key={item.path}>
          {/* <i className={`iconfont ${item.icon}`}/> */}
          {item.name}
        </Menu.Item>
      )
    })
  }
  render() {
    const {
      currentUser = {},
      collapsed,
      isMobile,
      logo
    } = this.props;
    const { pathname } = this.context.router.route.location
    const menu = (
      <Menu className="menu" selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />触发报错
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header">
        {isMobile && [
          <Link to="/" className="logo" key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className='menu-root'>
          <Menu
            onClick={this.handleMenuClick}
            mode="horizontal"
            
            selectedKeys={[`/${[pathname.split('/')[1]]}`]}
          >
            {this.getMenuItem(getMenuData())}
          </Menu>
        </div>
        <div className="right">
          <HeaderSearch
            placeholder="站内搜索"
            dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
            onSearch={value => {
              console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={value => {
              console.log('enter', value); // eslint-disable-line
            }}
          />
          <Tooltip title="使用文档">
            <a
              target="_blank"
              href=""
              rel="noopener noreferrer"
              className="action"
            >
              <Icon type="question-circle-o" />
            </a>
          </Tooltip>
          
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className="action account">
                <Avatar size="small" className="avatar" src={currentUser.avatar} />
                <span className="name">{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </div>
    );
  }
}
