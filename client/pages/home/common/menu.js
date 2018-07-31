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
        parentId: '0',
        children: [
          {
            name: '开屏广告',
            icon: 'icon-advert',
            id: '0-0-0',
            parentId: '0-0',
            path: 'app-launch-ad',
          },
          {
            name: 'Banner',
            icon: 'icon-banner',
            path: 'banner',
            parentId: '0-0',
            id: '0-0-1',
            children: [
              {
                id: '0-0-1-0',
                name: '机票首页',
                parentId: '0-0-1',
                path: 'airTickets',
              },
              {
                id: '0-0-1-1',
                name: '酒店首页',
                parentId: '0-0-1',
                path: 'hotel',
              },
              {
                id: '0-0-1-2',
                name: '探索页',
                parentId: '0-0-1',
                path: 'explorationPage',
              },
            ],
          },
          {
            name: '探索页界面管理',
            icon: 'icon-explore',
            path: 'exploration',
            id: '0-0-2',
            parentId: '0-0',
            children: [
              {
                id: '0-0-2-0',
                name: '栏目模块',
                parentId: '0-0-2',
                path: 'column',
              },
              {
                id: '0-0-2-1',
                name: '何时出发',
                parentId: '0-0-2',
                path: 'leave',
              },
              {
                id: '0-0-2-2',
                name: '动态航线',
                parentId: '0-0-2',
                path: 'route',
              },
              {
                id: '0-0-2-3',
                name: '目的地推荐',
                parentId: '0-0-2',
                path: 'destination',
              },
              {
                id: '0-0-2-4',
                name: '自定义栏目',
                parentId: '0-0-2',
                path: 'custom',
              },
            ],
          },
          {
            id: '0-0-3',
            name: '航线配置',
            parentId: '0-0',
            icon: 'icon-route',
            path: 'routeConfig',
          },
          {
            id: '0-0-4',
            name: '酒店推荐',
            icon: 'icon-hotel',
            parentId: '0-0',
            path: 'hotelRecommendation',
            children: [
              {
                id: '0-0-4-0',
                name: '推荐名单',
                parentId: '0-0-4',
                path: 'recommended',
              },
              {
                id: '0-0-4-1',
                name: '酒店列表',
                parentId: '0-0-4',
                path: 'list',
              },
            ],
          },
          {
            id: '0-0-5',
            name: '运营推送',
            parentId: '0-0',
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
        parentId: '0',
        children: [
          {
            id: '0-1-0',
            name: '引导下载层',
            parentId: '0-1',
            path: 'download',
          },
        ],
      },
      {
        id: '0-2',
        name: 'Where to Go City',
        icon: 'icon-go',
        parentId: '0',
        path: 'wheretoGoCity',
      },
      {
        id: '0-3',
        name: '文章管理',
        parentId: '0',
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
        parentId: '1',
        children: [
          {
            id: '1-0-0',
            parentId: '1-0',
            name: 'Coupon',
            path: 'coupon',
          },
          {
            id: '1-0-1',
            parentId: '1-0',
            name: 'Coupon Crossoer',
            path: 'coupon-cross',
          },
          {
            id: '1-0-2',
            parentId: '1-0',
            name: 'Lucky Draw',
            path: 'lucky-draw',
          },
          {
            id: '1-0-3',
            parentId: '1-0',
            name: 'Mini',
            path: 'mini',
          },
        ],
      },
      {
        id: '1-1',
        parentId: '1',
        name: 'Hotel Event',
        path: 'hotelEvent',
        children: [
          {
            id: '1-1-0',
            parentId: '1-1',
            name: 'Special Event',
            path: 'special-event',
          },
          {
            id: '1-1-1',
            parentId: '1-1',
            name: 'Special Event2',
            path: 'special-event2',
          },
        ],
      },
      {
        id: '1-2',
        parentId: '1',
        name: '组件管理',
        authority: 'admin',
        path: 'commodity',
        children: [
          {
            id: '1-2-0',
            parentId: '1-2',
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
        parentId: '2',
        children: [
          {
            id: '2-0-0',
            parentId: '2-0',
            name: 'Flight Section',
            path: 'flight-section',
          },
          {
            id: '2-0-1',
            parentId: '2-0',
            name: 'Hotel Section',
            path: 'hotel-section',
          },
          {
            id: '2-0-2',
            parentId: '2-0',
            name: 'Where to Go背景',
            path: 'background',
          },
          {
            id: '2-0-3',
            parentId: '2-0',
            name: 'Find Flights背景',
            path: 'backgroundFlights',
          },
          {
            id: '2-0-4',
            parentId: '2-0',
            name: 'When to Go背景',
            path: 'backgroundGo',
          },
          {
            id: '2-0-5',
            parentId: '2-0',
            name: '维护公告',
            path: 'notice',
          },
        ],
      },
      {
        id: '2-1',
        name: 'News',
        path: 'news',
        parentId: '2',
      },
      {
        id: '2-2',
        name: 'About iGola',
        path: 'about',
        parentId: '2',
        children: [
          {
            id: '2-2-0',
            parentId: '2-2',
            name: 'About Us',
            path: 'about-us',
          },
          {
            id: '2-2-1',
            name: 'Faq',
            parentId: '2-2',
            path: 'faq',
          },
          {
            id: '2-2-2',
            parentId: '2-2',
            name: 'Join Us',
            path: 'join-us',
          },
          {
            id: '2-2-3',
            parentId: '2-2',
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
        parentId: '3',
        name: 'OTA Airline Logo',
        path: 'ota',
        children: [
          {
            id: '3-0-0',
            parentId: '3-0',
            name: 'OTA Logo',
            path: 'ota-logo',
          },
          {
            id: '3-0-1',
            parentId: '3-0',
            name: 'Airline Logo',
            path: 'airline-logo',
          },
        ],
      },
      {
        id: '3-1',
        parentId: '3',
        name: 'i18n',
        path: 'i18n',
        children: [
          {
            id: '3-1-0',
            parentId: '3-1',
            name: 'PC-Flights-Web',
            path: 'languageWeb',
          },
          {
            id: '3-1-1',
            parentId: '3-1',
            name: 'PC-Hotel-Web',
            path: 'languageHotel',
          },
          {
            id: '3-1-2',
            parentId: '3-1',
            name: 'Mobile-Flights-Web',
            path: 'languageMobile',
          },
          {
            id: '3-1-3',
            parentId: '3-1',
            name: 'Member-Web',
            path: 'languageMember',
          },
          {
            id: '3-1-4',
            parentId: '3-1',
            name: 'B2B',
            path: 'languageB2B',
          },
          {
            id: '3-1-5',
            parentId: '3-1',
            name: 'H5-Web',
            path: 'languageH5',
          },
          {
            id: '3-1-6',
            parentId: '3-1',
            name: 'Hybrid-Hotel-APP',
            path: 'languageHotelAPP',
          },
          {
            id: '3-1-7',
            parentId: '3-1',
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
        parentId: '3',
        children: [
          {
            id: '3-2-0',
            name: '角色',
            parentId: '3-2',
            path: 'role',
          },
          {
            id: '3-2-1',
            name: '用户',
            parentId: '3-2',
            path: 'user',
          },
        ],
      },
      {
        name: '菜单管理',
        icon: 'icon-user',
        path: 'menuManage',
        id: '3-3',
        parentId: '3',
      },
      {
        name: '测试',
        icon: 'icon-user',
        path: 'test',
        id: '3-4',
        parentId: '3',
      },
    ],
  },
];


function formatterRouter(data, ent) {
  data.map((item) => {
    if (item.children) {
      formatterRouter(item.children, ent);
    } else {
      ent.push(item);
    }
    return item;
  });
  return ent;
}
export const getRouters = () => formatterRouter([...menuData], []);

export const getMenuData = () => menuData;

