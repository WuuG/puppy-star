const userService = require("../services/userService");

class userControl {
  async getUserInfo(ctx) {
    const id = ctx.query.id;
    const user = await userService.findOne(id);
    if (!user) {
      ctx.status = 400;
      ctx.body = {
        message: "can not fint the user",
      };
      return;
    }
    ctx.body = { data: user };
  }
}

module.exports = new userControl();
