const fileService = require('../services/fileUploadService');
/**
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含待办事项的增删改查功能
 */
class fileUploadController {
  /**
   * @description 上传文件，支持单个、多个文件上传
   * 
   */
  async filesUpload(ctx) {
    const contentType = ctx.request.header['content-type'].split(";")[0];

    if (!contentType || contentType !== "multipart/form-data") {
      ctx.response.stauts = 400;
      ctx.response.body = {
        code: -1,
        message: "content-type必须设置为multipart/form-data！",
        success: false
      }
      return;
    }

    const { userName } = ctx.request.query;
    if (typeof userName !== "string" || !userName) {
      ctx.response.status = 400;
      ctx.response.body = {
        code: -1,
        message: "请传入正确的用户名",
        success: false
      }
      return;
    }
    
    let files = ctx.request.files;

    if (typeof files !== "object" || Object.keys(files).length === 0) {
      ctx.response.status = 400;
      ctx.response.body = {
        code: -1,
        message: "传入文件为空！",
        success: false
      }
      return;
    }

    if (!files.files && files.files instanceof Array) {
      files = files.files;
    }

    const fileUploadRes = [];
    for (const key in files) {
      const { url, id } = await fileService.fileUplaod(userName, files[key]);
      fileUploadRes.push({filename: files[key].name, url, id});
    }

    // ctx.set("Access-Control-Allow-Origin", "*");

    ctx.response.status = 200;
    ctx.response.body = {
      code: 0,
      data: fileUploadRes,
      message: "上传成功", 
      success: true
    };
  }
}

// 导出 Controller 的实例
module.exports = new fileUploadController();
