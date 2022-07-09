const dateNow = () => {
  let date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
  return date;
};

module.exports = {
  dateNow,
};
