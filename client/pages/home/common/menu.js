import { isUrl } from '../../../utils/tools';

const menuData = [
  {
    name: '运营管理',
    icon: 'icon-operation-management',
    path: 'operation',
    children: [
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

    ],
  },
  {
    name: '活动管理',
    icon: 'form',
    path: 'activites',
    children: [
      {
        name: 'Event',
        path: '',
        children: [
          {
            name: 'Coupon',
            path: 'coupon',
          },
          {
            name: 'Coupon Crossoer',
            path: 'coupon-cross',
          },
          {
            name: 'Lucky Draw',
            path: 'lucky-draw',
          },
          {
            name: 'Mini',
            path: 'mini',
          },
        ],
      },
      {
        name: 'Hotel Event',
        path: '',
        children: [
          {
            name: 'Special Event',
            path: 'special-event',
          },
          {
            name: 'Special Event2',
            path: 'special-event2',
          },
        ],
      },
      {
        name: '组件管理',
        authority: 'admin',
        path: '',
        children: [
          {
            name: '商品墙组件',
            path: 'commodity-wall',
          },
        ],
      },
    ],
  },
  {
    name: 'PC配置',
    icon: 'form',
    path: 'options',
    children: [
      {
        name: 'WEB',
        path: '',
        children: [
          {
            name: 'Flight Section',
            path: 'flight-section',
          },
          {
            name: 'Hotel Section',
            path: 'hotel-section',
          },
          {
            name: 'Where to Go背景',
            path: 'background',
          },
          {
            name: 'Find Flights背景',
            path: 'backgroundFlights',
          },
          {
            name: 'When to Go背景',
            path: 'backgroundGo',
          },
          {
            name: '维护公告',
            path: 'notice',
          },
        ],
      },
      {
        name: 'News',
        path: 'news',
      },
      {
        name: 'About iGola',
        path: '',
        children: [
          {
            name: 'About Us',
            path: 'about-us',
          },
          {
            name: 'Faq',
            path: 'faq',
          },
          {
            name: 'Join Us',
            path: 'join-us',
          },
          {
            name: 'Our Team',
            path: 'our-team',
          },
        ],
      },
    ],
  },
  {
    name: '系统配置',
    icon: 'form',
    path: 'system',
    children: [
      {
        name: 'OTA Airline Logo',
        path: '',
        children: [
          {
            name: 'OTA Logo',
            path: 'ota-logo',
          },
          {
            name: 'Airline Logo',
            path: 'airline-logo',
          },
        ],
      },
      {
        name: 'i18n',
        path: '',
        children: [
          {
            name: 'PC-Flights-Web',
            path: 'languageWeb',
          },
          {
            name: 'PC-Hotel-Web',
            path: 'languageHotel',
          },
          {
            name: 'Mobile-Flights-Web',
            path: 'languageMobile',
          },
          {
            name: 'Member-Web',
            path: 'languageMember',
          },
          {
            name: 'B2B',
            path: 'languageB2B',
          },
          {
            name: 'H5-Web',
            path: 'languageH5',
          },
          {
            name: 'Hybrid-Hotel-APP',
            path: 'languageHotelAPP',
          },
          {
            name: 'Hybrid-Flights-APP',
            path: 'languageFlightsAPP',
          },
        ],
      },
      {
        name: '用户管理',
        icon: 'icon-user',
        path: '',
        children: [
          {
            name: '角色',
            path: 'role',
          },
          {
            name: '用户',
            path: 'users',
          },
        ],
      },
    ],
  },
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
