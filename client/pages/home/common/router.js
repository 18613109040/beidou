import React, { createElement } from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

let routerDataCache;
const dynamicWrapper = (component) => {
  if (component.toString().indexOf('.then(') < 0) {
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData();
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  return Loadable({
    loader: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData();
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
    loading: () => <Spin size="large" className="global-spin" />,
  });
};

const getRouterData = () => {
  const routerConfig = {
    '/operation/app/app-launch-ad': {
      component: dynamicWrapper(() => import('../container/AppLaunchAd')),
    },
    '/operation/app/app-launch-ad/create': {
      component: dynamicWrapper(() => import('../container/AppLaunchAd/create')),
    },

    '/operation/app/app-version': {
      component: dynamicWrapper(() => import('../container/AppVersion/list')),
    },
    '/operation/app/app-version/create': {
      component: dynamicWrapper(() => import('../container/AppVersion/create')),
    },
    '/operation/app/app-version/create/:id': {
      component: dynamicWrapper(() => import('../container/AppVersion/create')),
    },
    '/operation/app/app-version/:id': {
      component: dynamicWrapper(() => import('../container/AppVersion')),
    },

    '/system/manage/role': {
      component: dynamicWrapper(() => import('../container/Role/list')),
    },
    '/system/manage/role/create': {
      component: dynamicWrapper(() => import('../container/Role/create')),
    },
    '/system/manage/role/create/:id': {
      component: dynamicWrapper(() => import('../container/Role/create')),
    },
    '/system/manage/role/:id': {
      component: dynamicWrapper(() => import('../container/Role')),
    },
    '/system/manage/user': {
      component: dynamicWrapper(() => import('../container/User/list')),
    },
    '/system/manage/user/create': {
      component: dynamicWrapper(() => import('../container/User/create')),
    },
    '/system/manage/user/create/:id': {
      component: dynamicWrapper(() => import('../container/User/create')),
    },
    '/system/manage/user/:id': {
      component: dynamicWrapper(() => import('../container/User')),
    },

    '/system/exception/500': {
      component: dynamicWrapper(() => import('../container/Exception/500')),
    },
    '/system/exception/404': {
      component: dynamicWrapper(() => import('../container/Exception/404')),
    },
    '/system/exception/403': {
      component: dynamicWrapper(() => import('../container/Exception/403')),
    },

    '/operation/exception/500': {
      component: dynamicWrapper(() => import('../container/Exception/500')),
    },
    '/operation/exception/404': {
      component: dynamicWrapper(() => import('../container/Exception/404')),
    },
    '/operation/exception/403': {
      component: dynamicWrapper(() => import('../container/Exception/403')),
    },

    '/activites/exception/500': {
      component: dynamicWrapper(() => import('../container/Exception/500')),
    },
    '/activites/exception/404': {
      component: dynamicWrapper(() => import('../container/Exception/404')),
    },
    '/activites/exception/403': {
      component: dynamicWrapper(() => import('../container/Exception/403')),
    },

    '/options/exception/500': {
      component: dynamicWrapper(() => import('../container/Exception/500')),
    },
    '/options/exception/404': {
      component: dynamicWrapper(() => import('../container/Exception/404')),
    },
    '/options/exception/403': {
      component: dynamicWrapper(() => import('../container/Exception/403')),
    },
  };
  const routerData = {};
  Object.keys(routerConfig).forEach((path) => {
    let router = routerConfig[path];
    router = {
      ...router,
    };
    routerData[path] = router;
  });
  return routerData;
};

export default getRouterData;

