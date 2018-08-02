import React from 'react';
import { LocaleProvider } from 'antd';
import { Route, Switch, Redirect } from 'react-router';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import BasicLayout from './layout/index';


export default (
  <LocaleProvider locale={zhCN} >
    <Switch>
      <BasicLayout />
    </Switch>
  </LocaleProvider>
);


// import React from 'react';
// import { Route, Switch, Redirect } from 'react-router';
// import Loadable from 'react-loadable';
// export const Home = Loadable({
//   loader: () => import('./container/Home'),
//   loading: () => (<div>loading</div>),
// });
// export const RoleCreate = Loadable({
//   loader: () => import('./container/Role/create'),
//   loading: () => (<div>loading</div>),
// });
// export const RoleList = Loadable({
//   loader: () => import('./container/Role/list'),
//   loading: () => (<div>loading</div>),
// });
// export const RoleDetail = Loadable({
//   loader: () => import('./container/Role'),
//   loading: () => (<div>loading</div>),
// });
// export const AppLaunchAd = Loadable({
//   loader: () => import('./container/AppLaunchAd'),
//   loading: () => (<div>loading</div>),
// });

// export const UserList = Loadable({
//   loader: () => import('./container/User/list'),
//   loading: () => (<div>loading</div>),
// });
// export const UserCreate = Loadable({
//   loader: () => import('./container/User/create'),
//   loading: () => (<div>loading</div>),
// });
// export const UserDetail = Loadable({
//   loader: () => import('./container/User'),
//   loading: () => (<div>loading</div>),
// });


// export default (
//   <Switch>
//     <Route
//       exact
//       path="/"
//       render={() => (
//         <Redirect to="/operation/app/app-launch-ad" />
//       )}
//     />
//     <Route
//       exact
//       path="/operation"
//       render={() => (
//         <Redirect to="/operation/app/app-launch-ad" />
//       )}
//     />
//     {/* <Route exact path="/operation/home" component={Home} /> */}
//     <Route
//       exact
//       path="/activites"
//       render={() => (
//         <Redirect to="/activites/home" />
//       )}
//     />
//     <Route exact path="/activites/home" component={Home} />

//     <Route exact path="/system/manage/role" component={RoleList} />
//     <Route exact path="/system/manage/role/create" component={RoleCreate} />
//     <Route exact path="/system/manage/role/create/:id" component={RoleCreate} />
//     <Route exact path="/system/manage/role/:id" component={RoleDetail} />


//     <Route exact path="/system/manage/user" component={UserList} />
//     <Route exact path="/system/manage/user/create" component={UserCreate} />
//     <Route exact path="/system/manage/user/create/:id" component={UserCreate} />
//     <Route exact path="/system/manage/user/:id" component={UserDetail} />


//     <Route exact path="/operation/app/app-launch-ad" component={AppLaunchAd} />

//   </Switch>
// );
