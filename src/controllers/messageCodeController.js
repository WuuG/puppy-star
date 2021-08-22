/**
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含待办事项的增删改查功能
 */
const messageCodeService = require("../services/messageCodeService");
const utils = require("../models/utils");

class MessageCodeController {
  /**
   * 发送验证码
   */
  async sendMessageCode(ctx) {
    const { phone } = ctx.request.body;

    if (!phone) {
      ctx.response.status = 400;
      ctx.response.body = {
        code: -1,
        message: "缺少参数phone",
        success: true,
      };
      return;
    }

    ctx.response.status = 200;

    const callback = async (res) => {
      console.log("发送验证码成功");
      console.log(res.statusCode);

      ctx.response.body = {
        code: 0,
        message: "获取验证码成功",
        success: true,
      };

      /**将验证码存入数据库 */
      messageCodeService.save({ userPhone: phone, userMessageCode: code });
    };

    const error = (res) => {
      console.log("发送验证码失败");
      console.log(res);

      ctx.response.body = {
        code: -1,
        message: "获取验证码失败",
        success: false,
      };
    };

    const code = utils.randomCode(6);

    await messageCodeService
      .sendCode(phone, code)
      .then(
        (res) => callback(res),
        (err) => error(err)
      )
      .catch((err) => {
        console.log("发送验证码出错");
        console.log(err);
      });
  }
  /**
   * 校验验证码
   */
  async checkMessageCode(ctx, next) {
    const { phone, code: inputCode } = ctx.request.body;

    if (!phone) {
      ctx.response.status = 400;
      ctx.response.body = {
        code: -1,
        message: "缺少参数phone",
        success: false,
      };
      return;
    }

    if (!inputCode) {
      ctx.response.status = 400;
      ctx.response.body = {
        code: -1,
        message: "缺少参数messageCode",
        success: false,
      };
      return;
    }

    ctx.response.status = 200;

    // 获取该手机号的短信验证码
    const findItem = await messageCodeService.find(phone); // 这个提示不对。被async包裹的函数会返回Promise对象，必须使用await。

    if (findItem.length == 0) {
      ctx.response.status = 400;
      ctx.response.body = {
        code: -1,
        message: "请先获取验证码",
        success: false,
      };
      return;
    }

    const { userMessageCode: destCode, createdAt } = findItem[0];

    if (Date.now() - createdAt.valueOf() > 60000) {
      ctx.response.body = {
        code: -1,
        message: "短信验证码已过期",
        success: false,
      };
    } else if (destCode !== inputCode) {
      // 比较短信验证码
      ctx.response.body = {
        code: -1,
        message: "短信验证码校验失败",
        success: false,
      };
    } else {
      // ctx.response.body = {
      //   code: 0,
      //   message: "短信验证码校验成功",
      //   success: true,
      // };
      await next();
    }

    const result_del = messageCodeService.delete(findItem);
    if (!result_del) {
      console.log(`删除用户${phone}的验证码记录失败`);
    }
  }
}

module.exports = new MessageCodeController();
