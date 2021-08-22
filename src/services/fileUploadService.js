const inspirecloud = require("@byteinspire/api");
const fs = require("fs");
const { Buffer } = require("buffer");

/**
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含待办事项的增删改查功能
 */
class fileUploadService {
  /**
   * @description 上传单个文件
   * @param {File}
   * @returns {Object} res: {url, id}
   */
  async fileUplaod({ name: fileName, path: filePath, type }) {
    type = type.split("/")[1];

    const data = fs.readFileSync(filePath); // 如果没有指定option，那么返回Buffer

    const res = await inspirecloud.file.upload(fileName, data, {
      type: type,
    });

    return res;
  }
  /**
   * @description 删除文件
   */

  /**
   * @description 更新文件
   */
}

// 导出 Service 的实例
module.exports = new fileUploadService();
