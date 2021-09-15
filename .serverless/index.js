const { asyncWrapper, start } = require('@midwayjs/serverless-fc-starter');
const SimpleLock  = require('@midwayjs/simple-lock').default;
const lock = new SimpleLock();
const layers = [];

try {
  const layer_npm_koaLayer = require('@midwayjs/koa-layer');
  layers.push(layer_npm_koaLayer);
} catch(e) { }


let runtime;
let inited = false;

const initializeMethod = async (initializeContext = {}) => {
  return lock.sureOnce(async () => {
    runtime = await start({
      layers: layers,
      isAppMode: true,
      initContext: initializeContext,
      runtimeConfig: {"service":{"name":"project-template-app-api"},"provider":{"name":"aliyun","initTimeout":10},"custom":{"customDomain":{"domainName":"auto"}},"deployType":"koa","functions":{"app_index":{"handler":"index.handler","events":[{"http":{"path":"/*"}}]}},"package":{"include":["dist"]},"layers":{"koaLayer":{"path":"npm:@midwayjs/koa-layer"}},"globalDependencies":{"@midwayjs/simple-lock":"*","@midwayjs/serverless-fc-starter":"*"}},
    });
  }, 'APP_START_LOCK_KEY');
};
 
exports.initializer = asyncWrapper(async (...args) => {
  if (!inited) {
    inited = true;
    await initializeMethod();
  }
});



 

  exports.handler = asyncWrapper(async (...args) => {
    if (!inited) {
      await initializeMethod();
    }

    return runtime.asyncEvent()(...args);
  });


