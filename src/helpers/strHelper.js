const crypto = require("crypto");
const dotenv = require("dotenv");

//Load Dotenv
dotenv.config();

const randomNumber = (min = 0, max = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const strEncode = (str) => {
  let aes_key = process.env.AES_SECRET_KEY;
  const encryptor = crypto.createCipheriv(
    "AES-256-CBC",
    aes_key,
    aes_key.substring(0, 16)
  );
  const str_encode =
    encryptor.update(str.toString(), "utf8", "base64") +
    encryptor.final("base64");

  return str_encode;
};

const strDecode = (str) => {
  let aes_key = process.env.AES_SECRET_KEY;
  try {
    const decryptor = crypto.createDecipheriv(
      "AES-256-CBC",
      aes_key,
      aes_key.substring(0, 16)
    );

    return decryptor.update(str, "base64", "utf8") + decryptor.final("utf8");
  } catch (err) {
    return false;
  }
};

module.exports = {
  randomNumber,
  strEncode,
  strDecode,
};
