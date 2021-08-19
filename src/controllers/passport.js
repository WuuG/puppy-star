const userService = require("../services/userService");
const { checkAllIsNullorUndefined } = require("../utils/utils");

class PassportControl {
  async register(ctx) {
    const user = ctx.request.body;
    // 判断是否有填入一个必填项
    if (checkAllIsNullorUndefined([user.login_name, user.email, user.phone])) {
      ctx.status = 400;
      ctx.body = { message: "无法注册，请填入必填项！" };
      return;
    }
    const result = await userService.create(user);
    console.log(result);
    if (!result.status) {
      ctx.status = 400;
      ctx.body = { message: result.message };
      return;
    }
    ctx.status = 200;
    ctx.body = { data: result.data };
  }
}

module.exports = new PassportControl();
