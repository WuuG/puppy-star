const userService = require("../services/userService");

class Auth {
  async checkPass(ctx, next) {
    const { token } = ctx.request.body;
    const result = await userService.findOneById(token);
    if (!result) {
      ctx.status = 403;
      ctx.body = { message: "该token未通过验证" };
      return;
    }
    await next();
  }
}

module.exports = new Auth();
