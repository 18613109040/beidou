import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import { withRouter } from 'react-router';
import { urlToList } from '../_utils/pathTools';
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
export const getFlatMenuKeys = menu => menu.reduce((keys, item) => {
  keys.push(item.path);
  if (item.children) {
    return keys.concat(getFlatMenuKeys(item.children));
  }
  return keys;
}, []);
/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) => paths.reduce(
  (matchKeys, path) =>
    matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
  []
);
class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.menus = props.menuData;
    this.flatMenuKeys = getFlatMenuKeys(props.menuData);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    };
  }


  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    if (nextProps.location.pathname !== location.pathname) {
      this.menus = nextProps.menuData;
      this.flatMenuKeys = getFlatMenuKeys(nextProps.menuData);
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps),
      });
    }
  }

  getDefaultCollapsedSubMenus(props) {
    const {
      location: { pathname },
    } = props || this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
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
      })
      .filter(item => item);
  };

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
      if (item.auth === 0) {
        return null;
      }
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

  isMainMenu = key => this.menus.some(item => key && (item.key === key || item.path === key));

  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    });
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


  // Get the currently selected menu
  getSelectedMenuKeys = () => {
    const {
      location: { pathname },
    } = this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  };

  render() {
    const { collapsed, menuData, onCollapse } = this.props;
    const { openKeys } = this.state;
    const menuProps = collapsed
      ? {}
      : {
        openKeys,
      };
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        className="sider"
      >
        <div className="logo" key="logo">
          <Link to="/">
            <img src="http://lb.sit.igola.com:9000/assets/images/igola_logo.png" alt="logo" />
            <h1>iGola CMS</h1>
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          {...menuProps}
          selectedKeys={selectedKeys}
          style={{ width: '100%' }}
          onOpenChange={this.handleOpenChange}
        >
          {this.getNavMenuItems(menuData)}
        </Menu>
      </Sider>
    );
  }
}
export default withRouter(SiderMenu);

