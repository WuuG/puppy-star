const articleTable = require("../models/articleTable");
const inspirecloud = require("@byteinspire/api");
const ObjectId = inspirecloud.db.ObjectId;
const chalk = require("chalk");

/**
 * ArticleServiece
 * 文章表的增删改查
 */
class ArticleService {
  /**
   * 查询文章数据
   * @params skip 跳过几项数据
   * @params limit 返回几项数据
   * @return {Promise<Array<any>>} 返回待办事项数组
   */
  async getArticle(params) {
    console.log(params);
    console.log(chalk.yellow(params.skip));
    const ArticleList = await articleTable
      .where()
      .sort({ createdAt: 1 })
      .skip(params.skip)
      .limit(params.limit)
      .find();
    return ArticleList;
  }

  /**
   * 创建一条文章数据
   * @article 用于创建文章的文章数据
   */
  async create(article) {
    return await articleTable.save(article);
  }
}

// 导出 Service 的实例
module.exports = new ArticleService();
