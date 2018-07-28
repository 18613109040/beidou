import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Layout } from 'antd';
// import Loadable from 'react-loadable';
// import store from 'store';
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

  componentWillMount() {
    // this.props.dispatch(getModules());
    // const token = store.get('token');
    // const menu = store.get('menu');
    // if (!menu) { window.location.href = '/login'; }
  }

  componentDidMount() {

  }

  // getRouter(data, routers, path = '') {
  //   data.map((item) => {
  //     const rootPath = `${path}/${item.path}`;
  //     let redirectPath = `${path}/${item.path}`;
  //     if (item.children && item.children.length > 0) {
  //       redirectPath = `${path}/${item.path}/${item.children[0].path}`;
  //     }
  //     if (item.type === '1') {
  //       const moduleid = Loadable({
  //         loader: () => import(`${item.moduleid}`),
  //         loading: () => (<div>loading</div>),
  //       });
  //       routers.push(<Route
  //         exact
  //         path={redirectPath}
  //         component={moduleid}
  //       />);
  //     } else {
  //       routers.push(<Route
  //         exact
  //         path={rootPath}
  //         render={() => (
  //           <Redirect to={redirectPath} />
  //         )}
  //       />);
  //     }
  //     if (item.children && item.children.length > 0) {
  //       this.getRouter(item.children, routers, rootPath);
  //     }
  //     return item;
  //   });
  // }

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
    const menuData = getMenuData().find(item => item.path === pathname).children;
    // const menu = store.get('menu');
    // console.dir(menu);
    // const data = [];
    // this.getRouter(menu, data);
    // const routes = (<Switch>{data}</Switch>);
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
          <Content style={{ margin: '24px 24px', background: '#fff', height: '100%', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default BasicLayout;
// function mapStateToProps(state) {
//   return {
//     menuTree: state.menuTree,
//   };
// }
// export default connect(mapStateToProps)(BasicLayout);
