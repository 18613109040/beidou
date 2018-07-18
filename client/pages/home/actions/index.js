// 测试环境/本地环境
export const localhost = 'localhost:6001';

// 生产环境
export const prohost = 'http://120.77.6.187:8080';

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

const domains = {
  dev: `${localhost}/`,
  prod: `${prohost}/`,
};

export const host = domains[env];

