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
    if (!user.password) {
      ctx.status = 400;
      ctx.body = { message: "无法注册，请填入必填项！" };
      return;
    }

    // 理论上需要进行密码的加密的，现在就算啦，直接明文放入数据库中。
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

  async login(ctx) {
    const { login_name, password } = ctx.request.body;
    const query = {
      login_name,
      password,
    };
    console.log(query);
    const res = await userService.findOneByInfo(query);
    if (!res) {
      ctx.status = 401;
      ctx.body = {
        message: "用户名不存在或密码错误！",
      };
      return;
    }
    ctx.status = 200;
    ctx.body = res;
  }
}

module.exports = new PassportControl();
