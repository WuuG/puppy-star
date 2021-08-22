const Router = require("@koa/router");
// Koa 的路由在被 use 时是无法指定前缀的, 需要在定义时就指定前缀
const router = Router({
  prefix: "/api/article",
});

const articleControl = require("../controllers/articleControl");
const auth = require("../controllers/authControl");

// 组装路由
/**
 * @swagger
 * /api/article/:
 *   get:
 *     summary: 获取最新的动态
 *     description: 获取最新动态
 *     tags:
 *       - article
 *     parameters:
 *       - name: skip
 *         in: query
 *         required: false
 *         description: 跳过的动态数
 *         type: string
 *       - name: limit
 *         in: query
 *         description: 获取的动态数
 *         type: string
 *     responses:
 *       200:
 *         description: 成功获取
 */
router.get("/", articleControl.listArticle);

/**
 * @swagger
 * /api/article/:
 *  post:
 *     summary: 推送一条动态
 *     tags:
 *       - article
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: "object"
 *           required:
 *           - id
 *           properties:
 *             id:
 *               type: string
 *             text:
 *               type: string
 *             image:
 *               type: Array
 *             video:
 *               type: string
 *     responses:
 *       200:
 *         description: 成功获取
 *
 */
router.post("/", auth.checkPass, articleControl.createArticel);

// Koa 的路由需要调用 routes 函数获取实际用于 use 的函数
module.exports = router.routes(); // router.routes 返回一个函数
