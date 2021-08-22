const userService = require("../services/userService");

class Auth {
  async checkPass(ctx, next) {
    const { authorization } = ctx.request.header;
    const result = await userService.findOneById(authorization);
    if (!result) {
      ctx.status = 403;
      ctx.body = { message: "该token未通过验证" };
      return;
    }
    await next();
  }
}

module.exports = new Auth();
