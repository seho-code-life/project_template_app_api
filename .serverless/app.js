// 获取框架
const WebFramework = require('@midwayjs/koa').Framework;
// 初始化 web 框架并传入启动参数
const web = new WebFramework().configure({});
const { Bootstrap } = require('@midwayjs/bootstrap');

module.exports = async () => {
  // 加载框架并执行
  await Bootstrap.load(web).run();
  // 返回 app 对象
  return web.getApplication();
};
