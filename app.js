
const path = require('path');

module.exports = (app) => {
  app.beforeStart(async () => {
    // 配置环境变量
    await require('dotenv').config({ path: (path.join(__dirname, 'env/cms.config')) });
  });
};
