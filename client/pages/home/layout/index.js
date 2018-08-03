import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Redirect, Route } from 'react-router';
import { connect } from 'react-redux';
import { Layout, Breadcrumb } from 'antd';
import SiderMenu from '../components/SiderMenu';
import GlobalHeader from '../components/GlobalHeader';
import { getUser } from '../actions/user';
import getRouterData from '../common/router';
import NotFound from '../container/Exception/404';
import { getRoutes, formatter } from '../../../utils/utils';
import { getMenuData } from '../common/menu';
// import { getAuthority } from '../../../utils/authority';
// import store from 'store';

const { Header, Content } = Layout;
/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};

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

  componentDidMount() {
    this.props.dispatch(getUser());
  }

  getBaseRedirect = () => '/operation'

  render() {
    const {
      collapsed,
    } = this.state;
    const { history, modules, avatar, email, match } = this.props;
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
    const routerData = getRouterData();
    const bashRedirect = this.getBaseRedirect();
    formatter(getMenuData()).forEach(getRedirect);
    return (
      <Layout>
        <SiderMenu
          menuData={silderData}
          location={location}
          collapsed={collapsed}
          // onCollapse={this.handleMenuCollapse}
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
            <Switch>
              <Redirect exact from="/" to={bashRedirect} />
              {redirectData.map(item => (
                <Redirect key={item.from} exact from={item.from} to={item.to} />
              ))}
              {getRoutes(match.path, routerData).map(item => (
                <Route exact key={item.path} path={item.path} component={item.component} />
              ))}
              <Route render={NotFound} />
            </Switch>
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
