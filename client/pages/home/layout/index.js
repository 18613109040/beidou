import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import SiderMenu from '../components/SiderMenu';
import GlobalHeader from '../components/GlobalHeader';
import { getMenuData } from '../common/menu';


const { Header, Content } = Layout;

class BasicLayout extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  handleMenuCollapse = (collapsed) => {
    this.setState({
      collapsed,
    });
  }

  render() {
    const {
      collapsed,
    } = this.state;
    const { router } = this.context;
    const { location } = router.history;
    const currentUser = {
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
      name: '曲丽丽',
    };
    const logo = 'http://lb.sit.igola.com:9000/assets/images/igola_logo.png';
    const pathname = location.pathname.split('/')[1] ? `/${location.pathname.split('/')[1]}` : '/operation';
    console.dir(pathname);
    const menuData = getMenuData().find(item => item.path === pathname).children;
    return (
      <Layout>
        <SiderMenu
          menuData={menuData}
          location={location}
          collapsed={collapsed}
        />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} location={location}>
            <GlobalHeader
              logo={logo}
              currentUser={currentUser}
              collapsed={collapsed}
              isMobile={false}
              onCollapse={this.handleMenuCollapse}
            />
          </Header>
          <Content style={{ margin: '24px 24px', background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default BasicLayout;
