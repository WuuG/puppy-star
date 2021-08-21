const articleService = require("../services/articleService");

/**
 * ArticleControl
 */
class ArticleControl {
  /**
   * 列出所有待办事项
   * 响应格式
   * {
   *   list: [todo1, todo2]
   * }
   * @param ctx Koa 的上下文参数
   */
  async listArticle(ctx) {
    const { skip, limit } = ctx.request.query;
    const params = {
      skip: Number(skip),
      limit: Number(limit),
    };
    const list = await articleService.getArticle(params, ctx);
    ctx.body = { data: list };
  }

  /**
   * 创建一条动态
   *
   * 响应格式
   * {
   * 	result
   * }
   */
  async createArticel(ctx) {
    const { text, images, video, id, theme, at, type } = ctx.request.body;
    if (!id) {
      ctx.status = 400;
      ctx.body = {
        message: "请登录再创建动态!",
      };
      return;
    }
    // 这个应该可以写成中间件放在路由前的
    try {
      // 规定上传时article表的结构
      const result = await articleService.create({
        id,
        text,
        images: images ? [...images] : [],
        video: video ? video : null,
        comments: [],
        like: 0,
        theme: theme ? theme : null,
        at: at ? [...at] : [],
        // 0：公开 1:粉丝 2:好友圈 3:仅自己可见 4：群可见
        type: type ? type : 0,
      });
      ctx.body = { result };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: errro };
    }
  }
}

// 导出 Controller 的实例
module.exports = new ArticleControl();
