const inspireCloud = require('@byteinspire/api');

const fileTable = inspireCloud.db.table('_file');

module.exports = fileTable;