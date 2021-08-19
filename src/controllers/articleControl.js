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
    ctx.body = { list };
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
    const { text, images, video, id } = ctx.request.body;
    if (!id) {
      ctx.status = 400;
      ctx.body = {
        message: "请登录再创建动态!",
      };
      return;
    }
    const result = await articleService.create({
      id,
      text,
      images: images ? [...images] : [],
      video: video ? video : null,
      comments: [],
    });
    ctx.body = { result };
  }
}

// 导出 Controller 的实例
module.exports = new ArticleControl();
