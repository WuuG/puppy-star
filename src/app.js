const path = require("path");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const Koa = require("koa");
const app = new Koa();
// swagger
const { koaSwagger } = require("koa2-swagger-ui");
const swaggerRouter = require("./utils/swagger");

// router
const todoRouter = require("./routers/todo");
const messageRouter = require("./routers/messageCode");
const articleRouter = require("./routers/article");
const passportRouter = require("./routers/passport");
const fileRouter = require("./routers/fileUpload");
const userRouter = require("./routers/user");

// 为应用使用中间件
// 静态文件中间件
app.use(koaStatic(path.join(__dirname, "../public")));
// 请求体 parse 中间件，用于 parse json 格式请求体
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 30 * 1024 * 1024, // 设置上传文件大小最大限制，默认30M
    },
  })
);

/** 若后面的路由抛错，则封装为错误响应返回
 * 错误响应格式为
 * {
 *   error: message
 * }
 */
app.use(async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    // 抛出的错误可以附带 status 字段，代表 http 状态码
    // 若没有提供，则默认状态码为 500，代表服务器内部错误
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
  }
});

/**
 * swagger配置
 */
app.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods());
const swaggerOption = {
  routePrefix: "/swagger", // host at /swagger instead of default /docs
  swaggerOptions: {
    url: "/swagger/swagger.json", // example path to json 其实就是之后swagger-jsdoc生成的文档地址,这个地址是通过@koa/router生成的
  },
};
app.use(koaSwagger(swaggerOption));

// 为应用使用路由定义
// 使用待办事项业务路由
app.use(todoRouter);
app.use(messageRouter);
app.use(articleRouter);
app.use(passportRouter);
app.use(userRouter);
app.use(fileRouter);

module.exports = app;
