module.exports = async (client, error) => {
  var stringify = require('json-stringify-safe');
  client.logger.log(`An error event was sent by Discord.js: \n${stringify(error, null, 2)}`, "error");
};
