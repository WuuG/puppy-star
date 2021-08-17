/**
 * 短信验证码表
 */
const inspirecloud = require('@byteinspire/api');

const messageCodeTable = inspirecloud.db.table('messageCode');

module.exports = messageCodeTable;
