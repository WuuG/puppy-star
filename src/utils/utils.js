exports.checkAllIsNullorUndefined = (array) => {
  let result = true;
  for (const element of array) {
    if (element !== undefined) {
      result = false;
    }
    if (element !== null) {
      result = false;
    }
  }
  return result;
};

exports.checkOneIsNotNullUndefined = (array) => {
  for (const element of array) {
    if (element !== undefined && element !== null) return true;
  }
  return false;
};

/**
 * 判断该在表中是否唯一
 * @uniqueQueryObject 需要进行唯一判断的对象
 * @table 表
 */
exports.checkUnique = async (uniqueQueryObject, table) => {
  for (const prop in uniqueQueryObject) {
    if (!uniqueQueryObject[prop]) continue;
    const queryObj = {
      [prop]: uniqueQueryObject[prop],
    };
    const res = await table.where(queryObj).findOne();
    if (res) return false;
  }
  return true;
};
