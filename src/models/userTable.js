const inspirecloud = require("@byteinspire/api");

const userTable = inspirecloud.db.table("user");

// 导出 table 实例
module.exports = userTable;
