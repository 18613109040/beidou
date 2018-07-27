import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
// import Home from './container/Home';
// import RoleCreate from './container/Role/create';
// import RoleList from './container/Role/list';
// import MenuManage from './container/MenuManage';
// import User from './container/User';
import Loadable from 'react-loadable';

export const MenuManage = Loadable({
  loader: () => import('./container/MenuManage'),
  loading: () => (<div>loading</div>),
});
export const Home = Loadable({
  loader: () => import('./container/Home'),
  loading: () => (<div>loading</div>),
});
export const RoleCreate = Loadable({
  loader: () => import('./container/Role/create'),
  loading: () => (<div>loading</div>),
});
export const RoleList = Loadable({
  loader: () => import('./container/Role/list'),
  loading: () => (<div>loading</div>),
});
export const User = Loadable({
  loader: () => import('./container/User'),
  loading: () => (<div>loading</div>),
});
function getRouter(data, routers, path = '') {
  data.map((item) => {
    const rootPath = `${path}/${item.linkurl}`;
    let redirectPath = `${path}/${item.linkurl}`;
    if (item.children && item.children.length > 0) {
      redirectPath = `${path}/${item.linkurl}/${item.children[0].linkurl}`;
    }
    if (item.type === '1') {
      routers.push(<Route
        exact
        path={redirectPath}
        component={Loadable({
          loader: () => require(item.key),
          loading: () => (<div>loading</div>),
        })}
      />);
    } else {
      routers.push(<Route
        exact
        path={rootPath}
        render={() => (
          <Redirect to={redirectPath} />
        )}
      />);
    }
    if (item.children && item.children.length > 0) { getRouter(item.children, routers, rootPath); }
  });
}
// const router = request('/api/menu', {
//   type: 'json',
//   method: 'GET',
//   body: {},
//   contentType: 'application/json',
// }).then((json) => {
//   const routers = [];
//   if (json.code === 0) {
//     getRouter(json.data, routers);
//     return routers;
//   }
// });

// export default router;
export default (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (
        <Redirect to="/operation/home" />
      )}
    />
    <Route
      exact
      path="/operation"
      render={() => (
        <Redirect to="/operation/home" />
      )}
    />
    <Route exact path="/operation/home" component={Home} />


    <Route
      exact
      path="/activites"
      render={() => (
        <Redirect to="/activites/home" />
      )}
    />
    <Route exact path="/activites/home" component={Home} />

    <Route exact path="/system/manage/role" component={RoleList} />
    <Route exact path="/system/manage/role/create" component={RoleCreate} />

    <Route exact path="/system/manage/user" component={User} />

    <Route exact path="/system/menuManage" component={MenuManage} />
  </Switch>
);
