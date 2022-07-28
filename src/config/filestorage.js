const multer = require("multer");
const path = require("path");

const formatFile = {
  images: ["image/png", "image/jpeg", "image/jpg"],
};

const diskStorage = (dest) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      cb(null, "img-" + Date.now() + path.extname(file.originalname));
    },
  });
};

const imageFileUpload = multer({
  storage: diskStorage("public/files/img"),
  fileFilter: (req, file, cb) => {
    if (!formatFile.images.includes(file.mimetype)) {
      req.errorUpload = true;
      return cb(null, false);
    }

    req.errorUpload = false;
    cb(null, true);
  },
});

module.exports = {
  imageFileUpload,
};
