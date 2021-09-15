const WebFramework = require('@midwayjs/koa').Framework;
const web = new WebFramework().configure({});

const { Bootstrap } = require('@midwayjs/bootstrap');
Bootstrap.load(web).run();
