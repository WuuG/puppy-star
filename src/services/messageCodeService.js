/**
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含待办事项的增删改查功能
 */
const messageCodeTable = require("../models/messageCodeTable");
const md5 = require("md5");
const moment = require("moment");
const { Base64 } = require("js-base64");
const request = require("request");

class MessageCodeService {
  /**
   * 发送验证码
   * @param {String} phone
   * @param {String} code
   * @returns {Promise}
   */
  async sendCode(phone, code) {
    var ACCOUNT_SID = "8aaf07087b3e7403017b47bfdb7a019f";
    var AUTH_TOKEN = "835180e7915a451aa90bdc529ebb0b16";
    var Rest_URL = "https://app.cloopen.com:8883";
    var AppID = "8aaf07087b3e7403017b47bfdcaf01a6";
    //1. 准备请求url
    /*
     * 1.使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
     * 2.SigParameter参数需要大写，如不能写成sig=abcdefg而应该写成sig=ABCDEFG
     */
    var time = moment().format("YYYYMMDDHHmmss");
    var sigParameter = md5(ACCOUNT_SID + AUTH_TOKEN + time) + "";
    var url =
      Rest_URL +
      "/2013-12-26/Accounts/" +
      ACCOUNT_SID +
      "/SMS/TemplateSMS?sig=" +
      sigParameter;

    //2. 准备请求体
    var body = {
      to: phone,
      appId: AppID,
      templateId: "1",
      datas: [code, "1"],
    };

    //3. 准备请求头
    /*
     * 1.使用Base64编码（账户Id + 冒号 + 时间戳）其中账户Id根据url的验证级别对应主账户
     * 2.冒号为英文冒号
     * 3.时间戳是当前系统时间，格式"yyyyMMddHHmmss"，需与SigParameter中时间戳相同。
     */
    var authorization = Base64.encode(ACCOUNT_SID + ":" + time);
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      "Content-Length": JSON.stringify(body).length + "",
      Authorization: authorization,
    };

    //4. 发送请求, 并得到返回的结果, 调用callback
    return new Promise((resolve, reject) => {
      request(
        {
          method: "POST",
          url: url,
          headers: headers,
          body: body,
          json: true,
        },
        function (err, response, body) {
          if (err) {
            reject(response);
            return;
          }

          body.statusCode === "000000" ? resolve(body) : reject(response);
        }
      );
    });
  }
  /**
   * 创建数据表行数据
   * @param {object} params
   */
  create(params) {
    return messageCodeTable.create(params);
  }
  /**
   * 保存该手机号和对应的验证码
   * @param {object | Array} params
   * @returns {string}
   */
  async save(params) {
    const item = this.create(params);
    return await messageCodeTable.save(item);
  }
  /**
   * 查询该手机号对应的行
   * @param {string} phone
   * @returns {Array}
   */
  async find(phone) {
    // console.log("查询该手机号对应的行");
    return await messageCodeTable.where({ userPhone: phone }).find();
  }
  /**
   * 删除校验完毕的验证码航对象
   * @param {object} item
   * @returns {boolean}
   */
  async delete(item) {
    const result = await messageCodeTable.delete(item)[0];
    return result && result.deleteCount && result.deleteCount === 1;
  }

  /**
   * update验证码
   */
  async updateCode(item) {
    return await messageCodeTable.save(item);
  }
}

module.exports = new MessageCodeService();
