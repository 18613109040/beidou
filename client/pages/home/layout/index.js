import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Redirect, Route } from 'react-router';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import SiderMenu from '../components/SiderMenu';
import GlobalHeader from '../components/GlobalHeader';
import { getUser } from '../actions/user';
import AppLaunchAd from '../container/AppLaunchAd';
// import { getMenuData } from '../common/menu';
import { getRouterData } from '../common/router';
import { getRoutes } from '../../../utils/utils';
// import Authorized from '../../../utils/Authorized';


// const { AuthorizedRoute, check } = Authorized;
const { Header, Content } = Layout;
/**
 * 根据菜单取得重定向地址.
 */
// const redirectData = [];
// const getRedirect = (item) => {
//   if (item && item.children) {
//     if (item.children[0] && item.children[0].path) {
//       redirectData.push({
//         from: `${item.path}`,
//         to: `${item.children[0].path}`,
//       });
//       item.children.forEach((children) => {
//         getRedirect(children);
//       });
//     }
//   }
// };
// function formatter(data, parentPath = '/', parentAuthority) {
//   return data.map((item) => {
//     let { path } = item;
//     if (!isUrl(path)) {
//       path = parentPath + item.path;
//     }
//     const result = {
//       ...item,
//       path,
//       authority: item.authority || parentAuthority,
//     };
//     if (item.children) {
//       result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
//     }
//     return result;
//   });
// }
// formatter(getMenuData()).forEach(getRedirect);

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

  // getBaseRedirect = () => {
  //   // According to the url parameter to redirect
  //   // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
  //   const urlParams = new URL(window.location.href);

  //   const redirect = urlParams.searchParams.get('redirect');
  //   // Remove the parameters in the url
  //   if (redirect) {
  //     urlParams.searchParams.delete('redirect');
  //     window.history.replaceState(null, 'redirect', urlParams.href);
  //   } else {
  //     const { routerData } = this.props;
  //     // get the first authorized route path in routerData
  //     const authorizedPath = Object.keys(routerData).find(
  //       item => check(routerData[item].authority, item) && item !== '/'
  //     );
  //     return authorizedPath;
  //   }
  //   return redirect;
  // };

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
    // const bashRedirect = this.getBaseRedirect();
    let silderData = modules.find(item => item.path === pathname);
    if (silderData && silderData.children) {
      silderData = silderData.children;
    }
    console.dir('===============');
    const routerData = getRouterData();
    getRoutes(match.path, routerData).map(item => (
      console.dir(item)
    ));
    return (
      <Layout>
        <SiderMenu
          menuData={silderData}
          location={location}
          collapsed={collapsed}
          onCollapse={this.handleMenuCollapse}
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
              <Route exact path="/" component={AppLaunchAd} />
            </Switch>
            {/* <Switch>
              {redirectData.map(item => (
                <Redirect key={item.from} exact from={item.from} to={item.to} />
              ))}
              {getRoutes(match.path, routerData).map(item => (
                <AuthorizedRoute
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                  authority={item.authority}
                  redirectPath="/exception/403"
                />
              ))}
              <Redirect exact from="/" to={bashRedirect} />
            </Switch> */}
            {/* {this.props.children} */}
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
