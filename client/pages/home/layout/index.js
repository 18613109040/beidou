import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Layout } from 'antd';
// import Loadable from 'react-loadable';
// import store from 'store';
import SiderMenu from '../components/SiderMenu';
import GlobalHeader from '../components/GlobalHeader';
import { getMenuData, getRouters } from '../common/menu';
import { getUser } from '../actions/user';

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

  }

  componentDidMount() {
    this.props.dispatch(getUser());
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
    const { history, modules, avatar, email } = this.props;
    const { location } = history;
    const logo = 'http://lb.sit.igola.com:9000/assets/images/igola_logo.png';
    const pathname = location.pathname.split('/')[1] ? `/${location.pathname.split('/')[1]}` : '/operation';


    const currentUser = {
      avatar,
      name: email,
    };

    let silderData = modules.find(item => item.path === pathname);
    if (silderData && silderData.children) {
      silderData = silderData.children;
    }
    return (
      <Layout>
        <SiderMenu
          menuData={silderData}
          location={location}
          collapsed={collapsed}
        />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} location={location}>
            <GlobalHeader
              logo={logo}
              menuData={modules}
              currentUser={currentUser}
              collapsed={collapsed}
              isMobile={false}
              onCollapse={this.handleMenuCollapse}
            />
          </Header>
          <Content style={{ margin: '24px 24px', height: '100%', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    modules: state.user.modules,
    avatar: state.user.avatar,
    email: state.user.email,
  };
}
export default withRouter(connect(mapStateToProps)(BasicLayout));
