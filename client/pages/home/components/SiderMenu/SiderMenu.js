import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';

const { Sider } = Layout;
const { SubMenu } = Menu;
const getIcon = (icon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className="icon sider-menu-item-img" />;
  }
  if (typeof icon === 'string') {
    return <i className={`icon iconfont ${icon}`} />;
  }
  return icon;
};

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.menus = props.menuData;
    this.state = {
    };
  }

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map((item) => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return ItemDom;
        // return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => item);
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item) => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span className="menu-name">{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
    }
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = (item) => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span className="menu-name">{name}</span>
        </a>
      );
    }
    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
              onCollapse(true);
            }
            : undefined
        }
      >
        {icon}
        <span className="menu-name">{name}</span>
      </Link>
    );
  };

  // conversion Path
  // 转化路径
  conversionPath = (path) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  };

 // permission to check
 checkPermissionItem = (authority, ItemDom) => {
   const { Authorized } = this.props;
   if (Authorized && Authorized.check) {
     const { check } = Authorized;
     return check(authority, ItemDom);
   }
   return ItemDom;
 };

 render() {
   console.dir(this.props);
   const { collapsed } = this.props;
   return (
     <Sider
       trigger={null}
       collapsible
       collapsed={collapsed}
       className="sider"
     >
       <div className="logo" key="logo">
         <Link to="/">
           <img src="http://lb.sit.igola.com:9000/assets/images/igola_logo.png" alt="logo" />
           <h1>iGola CMS</h1>
         </Link>
       </div>
       <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ width: '100%' }}>
         {this.getNavMenuItems(this.menus)}
       </Menu>
     </Sider>
   );
 }
}
