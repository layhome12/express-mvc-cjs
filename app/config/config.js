const dotenv = require("dotenv");

//Dotenv Load
dotenv.config();

const baseUrl = () => {
  let url = process.env.BASE_URL;
  let base = url.replace("http://", "").replace("https://", "");
  let index = base.lastIndexOf(":");
  let port = base.substring(index).replace(":", "");

  return {
    url: url,
    port: port,
  };
};

module.exports = {
  baseUrl,
};
