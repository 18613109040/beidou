import { isUrl } from '../../../utils/tools';

const menuData = [
  // {
  //   name: '运营管理',
  //   icon: 'icon-operation-management',
  //   path: 'operation',
  //   children: [
  {
    name: 'APP',
    icon: 'icon-app',
    path: 'app',
    children: [
      {
        name: '开屏广告',
        icon: 'icon-advert',
        path: 'advert',
      },
      {
        name: 'Banner',
        icon: 'icon-banner',
        path: 'banner',
        children: [
          {
            name: '机票首页',
            path: 'airTickets',
          },
          {
            name: '酒店首页',
            path: 'hotel',
          },
          {
            name: '探索页',
            path: 'explorationPage',
          },
        ],
      },
      {
        name: '探索页界面管理',
        icon: 'icon-explore',
        path: 'exploration',
        children: [
          {
            name: '栏目模块',
            path: 'column',
          },
          {
            name: '何时出发',
            path: 'leave',
          },
          {
            name: '动态航线',
            path: 'route',
          },
          {
            name: '目的地推荐',
            path: 'destination',
          },
          {
            name: '自定义栏目',
            path: 'custom',
          },
        ],
      },
      {
        name: '航线配置',
        icon: 'icon-route',
        path: 'routeConfig',
      },
      {
        name: '酒店推荐',
        icon: 'icon-hotel',
        path: 'hotelRecommendation',
        children: [
          {
            name: '推荐名单',
            path: 'recommended',
          },
          {
            name: '酒店列表',
            path: 'list',
          },
        ],
      },
      {
        name: '运营推送',
        icon: 'icon-operation',
        path: 'operationalPush',
      },
    ],
  },
  {
    name: 'M站',
    icon: 'icon-m',
    path: 'mWebsite',
    children: [
      {
        name: '引导下载层',
        path: 'download',
      },
    ],
  },
  {
    name: 'Where to Go City',
    icon: 'icon-go',
    path: 'wheretoGoCity',
  },
  {
    name: '文章管理',
    icon: 'icon-article',
    path: 'article',
  },
  {
    name: '用户管理',
    icon: 'icon-user',
    path: '',
    children: [
      {
        name: '角色',
        path: 'role',
      }, {
        name: '用户',
        path: 'user',
      },
    ],

  },
  //   ],
  // },
  // {
  //   name: '活动管理',
  //   icon: 'form',
  //   path: 'form',
  //   children: [
  //     {
  //       name: 'Event',
  //       path: 'basic-form',
  //       children: [
  //         {
  //           name: 'Coupon',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Coupon Crossoer',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Lucky Draw',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Mini',
  //           path: 'login',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Hotel Event',
  //       path: 'step-form',
  //       children: [
  //         {
  //           name: 'Special Event',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Special Event2',
  //           path: 'login',
  //         },
  //       ],
  //     },
  //     {
  //       name: '组件管理',
  //       authority: 'admin',
  //       path: 'advanced-form',
  //       children: [
  //         {
  //           name: '商品墙组件',
  //           path: 'login',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: 'PC配置',
  //   icon: 'form',
  //   path: 'form',
  //   children: [
  //     {
  //       name: 'WEB',
  //       path: 'basic-form',
  //       children: [
  //         {
  //           name: 'Flight Section',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Hotel Section',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Where to Go背景',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Find Flights背景',
  //           path: 'login',
  //         },
  //         {
  //           name: 'When to Go背景',
  //           path: 'login',
  //         },
  //         {
  //           name: '维护公告',
  //           path: 'login',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'News',
  //       path: 'step-form',
  //     },
  //     {
  //       name: 'About iGola',
  //       authority: 'admin',
  //       path: 'advanced-form',
  //       children: [
  //         {
  //           name: 'About Us',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Faq',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Join Us',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Our Team',
  //           path: 'login',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: '系统配置',
  //   icon: 'form',
  //   path: 'form',
  //   children: [
  //     {
  //       name: 'OTA Airline Logo',
  //       path: 'basic-form',
  //       children: [
  //         {
  //           name: 'OTA Logo',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Airline Logo',
  //           path: 'login',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'i18n',
  //       path: 'step-form',
  //       children: [
  //         {
  //           name: 'PC-Flights-Web',
  //           path: 'login',
  //         },
  //         {
  //           name: 'PC-Hotel-Web',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Mobile-Flights-Web',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Member-Web',
  //           path: 'login',
  //         },
  //         {
  //           name: 'B2B',
  //           path: 'login',
  //         },
  //         {
  //           name: 'H5-Web',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Hybrid-Hotel-APP',
  //           path: 'login',
  //         },
  //         {
  //           name: 'Hybrid-Flights-APP',
  //           path: 'login',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'User Manage',
  //       authority: 'admin',
  //       path: 'advanced-form',
  //       children: [
  //         {
  //           name: 'Role',
  //           path: 'login',
  //         },
  //         {
  //           name: 'User',
  //           path: 'login',
  //         },
  //       ],
  //     },
  //   ],
  // },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
