import { isUrl } from '../../../utils/tools';

const menuData = [
  {
    name: '运营管理',
    icon: 'icon-operation-management',
    path: 'operation',
    id: '0',
    children: [
      {
        name: 'APP',
        icon: 'icon-app',
        path: 'app',
        id: '0-0',
        children: [
          {
            name: '开屏广告',
            icon: 'icon-advert',
            id: '0-0-0',
            operating: 12,
            path: 'app-launch-ad',
          },
          {
            name: 'Banner',
            icon: 'icon-banner',
            path: 'banner',
            id: '0-0-1',
            children: [
              {
                id: '0-0-1-0',
                name: '机票首页',
                operating: 12,
                path: 'airTickets',
              },
              {
                id: '0-0-1-1',
                name: '酒店首页',
                operating: 12,
                path: 'hotel',
              },
              {
                id: '0-0-1-2',
                name: '探索页',
                operating: 12,
                path: 'explorationPage',
              },
            ],
          },
          {
            name: '探索页界面管理',
            icon: 'icon-explore',
            path: 'exploration',
            id: '0-0-2',
            children: [
              {
                id: '0-0-2-0',
                name: '栏目模块',
                operating: 12,
                path: 'column',
              },
              {
                id: '0-0-2-1',
                name: '何时出发',
                operating: 12,
                path: 'leave',
              },
              {
                id: '0-0-2-2',
                name: '动态航线',
                operating: 12,
                path: 'route',
              },
              {
                id: '0-0-2-3',
                name: '目的地推荐',
                operating: 12,
                path: 'destination',
              },
              {
                id: '0-0-2-4',
                name: '自定义栏目',
                operating: 12,
                path: 'custom',
              },
            ],
          },
          {
            id: '0-0-3',
            name: '航线配置',
            operating: 12,
            icon: 'icon-route',
            path: 'routeConfig',
          },
          {
            id: '0-0-4',
            name: '酒店推荐',
            icon: 'icon-hotel',
            operating: 12,
            path: 'hotelRecommendation',
            children: [
              {
                id: '0-0-4-0',
                name: '推荐名单',
                operating: 12,
                path: 'recommended',
              },
              {
                id: '0-0-4-1',
                name: '酒店列表',
                operating: 12,
                path: 'list',
              },
            ],
          },
          {
            id: '0-0-5',
            name: '运营推送',
            operating: 12,
            icon: 'icon-operation',
            path: 'operationalPush',
          },
        ],
      },
      {
        name: 'M站',
        icon: 'icon-m',
        path: 'mWebsite',
        id: '0-1',
        children: [
          {
            id: '0-1-0',
            name: '引导下载层',
            operating: 12,
            path: 'download',
          },
        ],
      },
      {
        id: '0-2',
        name: 'Where to Go City',
        icon: 'icon-go',
        operating: 12,
        path: 'wheretoGoCity',
      },
      {
        id: '0-3',
        name: '文章管理',
        operating: 12,
        icon: 'icon-article',
        path: 'article',
      },

    ],
  },
  {
    name: '活动管理',
    icon: 'form',
    path: 'activites',
    id: '1',
    children: [
      {
        id: '1-0',
        name: 'Event',
        path: 'event',
        children: [
          {
            id: '1-0-0',
            operating: 12,
            name: 'Coupon',
            path: 'coupon',
          },
          {
            id: '1-0-1',
            operating: 12,
            name: 'Coupon Crossoer',
            path: 'coupon-cross',
          },
          {
            id: '1-0-2',
            operating: 12,
            name: 'Lucky Draw',
            path: 'lucky-draw',
          },
          {
            id: '1-0-3',
            operating: 12,
            name: 'Mini',
            path: 'mini',
          },
        ],
      },
      {
        id: '1-1',
        name: 'Hotel Event',
        path: 'hotelEvent',
        children: [
          {
            id: '1-1-0',
            operating: 12,
            name: 'Special Event',
            path: 'special-event',
          },
          {
            id: '1-1-1',
            operating: 12,
            name: 'Special Event2',
            path: 'special-event2',
          },
        ],
      },
      {
        id: '1-2',
        name: '组件管理',
        authority: 'admin',
        path: 'commodity',
        children: [
          {
            id: '1-2-0',
            operating: 12,
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
    id: '2',
    children: [
      {
        name: 'WEB',
        path: 'web',
        id: '2-0',
        children: [
          {
            id: '2-0-0',
            operating: 12,
            name: 'Flight Section',
            path: 'flight-section',
          },
          {
            id: '2-0-1',
            operating: 12,
            name: 'Hotel Section',
            path: 'hotel-section',
          },
          {
            id: '2-0-2',
            operating: 12,
            name: 'Where to Go背景',
            path: 'background',
          },
          {
            id: '2-0-3',
            operating: 12,
            name: 'Find Flights背景',
            path: 'backgroundFlights',
          },
          {
            id: '2-0-4',
            operating: 12,
            name: 'When to Go背景',
            path: 'backgroundGo',
          },
          {
            id: '2-0-5',
            operating: 12,
            name: '维护公告',
            path: 'notice',
          },
        ],
      },
      {
        id: '2-1',
        name: 'News',
        path: 'news',
        operating: 12,
      },
      {
        id: '2-2',
        name: 'About iGola',
        path: 'about',
        children: [
          {
            id: '2-2-0',
            operating: 12,
            name: 'About Us',
            path: 'about-us',
          },
          {
            id: '2-2-1',
            name: 'Faq',
            operating: 12,
            path: 'faq',
          },
          {
            id: '2-2-2',
            operating: 12,
            name: 'Join Us',
            path: 'join-us',
          },
          {
            id: '2-2-3',
            operating: 12,
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
    id: '3',
    children: [
      {
        id: '3-0',
        name: 'OTA Airline Logo',
        path: 'ota',
        children: [
          {
            id: '3-0-0',
            operating: 12,
            name: 'OTA Logo',
            path: 'ota-logo',
          },
          {
            id: '3-0-1',
            operating: 12,
            name: 'Airline Logo',
            path: 'airline-logo',
          },
        ],
      },
      {
        id: '3-1',
        name: 'i18n',
        path: 'i18n',
        children: [
          {
            id: '3-1-0',
            operating: 12,
            name: 'PC-Flights-Web',
            path: 'languageWeb',
          },
          {
            id: '3-1-1',
            operating: 12,
            name: 'PC-Hotel-Web',
            path: 'languageHotel',
          },
          {
            id: '3-1-2',
            operating: 12,
            name: 'Mobile-Flights-Web',
            path: 'languageMobile',
          },
          {
            id: '3-1-3',
            operating: 12,
            name: 'Member-Web',
            path: 'languageMember',
          },
          {
            id: '3-1-4',
            operating: 12,
            name: 'B2B',
            path: 'languageB2B',
          },
          {
            id: '3-1-5',
            operating: 12,
            name: 'H5-Web',
            path: 'languageH5',
          },
          {
            id: '3-1-6',
            operating: 12,
            name: 'Hybrid-Hotel-APP',
            path: 'languageHotelAPP',
          },
          {
            id: '3-1-7',
            operating: 12,
            name: 'Hybrid-Flights-APP',
            path: 'languageFlightsAPP',
          },
        ],
      },
      {
        name: '用户管理',
        icon: 'icon-user',
        path: 'manage',
        id: '3-2',
        children: [
          {
            id: '3-2-0',
            name: '角色',
            operating: 12,
            path: 'role',
          },
          {
            id: '3-2-1',
            name: '用户',
            operating: 12,
            path: 'user',
          },
        ],
      },
      {
        name: '菜单管理',
        icon: 'icon-user',
        path: 'menuManage',
        id: '3-3',
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
