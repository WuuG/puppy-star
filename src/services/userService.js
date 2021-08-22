const userTable = require("../models/userTable");
const inspirecloud = require("@byteinspire/api");
const ObjectId = inspirecloud.db.ObjectId;

const { checkUnique } = require("../utils/utils");

class UserService {
  /**
   * 创建一个用户, 理论上这里要进行数据校验的。 但是算了
   * @user 创建一个用户所需的信息
   * @login_name 用户名
   * @email 邮箱
   * @gender 性别
   * @password 密码
   */
  async create(user) {
    const userRecord = {
      login_name: user.login_name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      password: user.password,
    };
    const uniqueQuery = {
      login_name: user.login_name,
      email: user.email,
    };

    const res = await checkUnique(uniqueQuery, userTable);
    if (!res) {
      return { status: false, message: "账户已经被注册!" };
    }
    const result = await userTable.save(userRecord);
    return { status: true, data: result };
  }

  async findOneById(id) {
    return await userTable.where({ _id: ObjectId(id) }).findOne();
  }

  async findOneByInfo(query) {
    console.log(query);
    return await userTable.where(query).findOne();
  }
}

module.exports = new UserService();
