const moment = require("moment");

const dateNow = () => {
  let date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  return date;
};

module.exports = {
  dateNow,
};
