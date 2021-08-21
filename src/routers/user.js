const Router = require("@koa/router");
// Koa 的路由在被 use 时是无法指定前缀的, 需要在定义时就指定前缀
const router = Router({
  prefix: "/api/user",
});

const userControl = require("../controllers/userControl");

/**
 * @swagger
 *  /api/user/:
 *    get:
 *      summary: 根据id获取用户数据,目前无法在swagger中使用
 *      tags:
 *        - user
 *      parameters:
 *        - name: id
 *          in: url
 *          type: number
 *      responses:
 *        200:
 *          description: 成功获取
 */
router.get("/", userControl.getUserInfo);

module.exports = router.routes(); // router.routes 返回一个函数
