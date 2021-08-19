const Router = require("@koa/router");
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

// 访问这个配置文件的路由
const router = new Router({
  prefix: "/swagger", // 路由前缀
});

const swaggerDefinition = {
  info: {
    title: "puppy start API",
    version: "v1",
  },
};
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "../routers/*.js")], // 写有注解的router的存放地址, 最好     path.join()
};
const swaggerSpec = swaggerJSDoc(options);

// 通过路由获取生成的注解文件, 配上路由前缀， 所以可以通过 /swagger/swagger.json访问这个文件
router.get("/swagger.json", async function (ctx) {
  ctx.set("Content-Type", "application/json");
  ctx.body = swaggerSpec;
});
module.exports = router;
