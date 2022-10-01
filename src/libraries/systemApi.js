const os = require("os");
const fs = require("fs");

const jsonResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).end(JSON.stringify(data, null, 4));
};

const netLocal = () => {
  const nets = os.networkInterfaces();
  const results = {};

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // ==> Skip over non-IPv4 and Internal (i.e. 127.0.0.1) addresses
      if (net.family === "IPv4" && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  return results;
};

const videoStream = (req, res, file) => {
  let range = req.headers.range;
  if (!range)
    return res.status(400).end(
      JSON.stringify(
        {
          statusCode: 400,
          message: "Required Range Headers",
        },
        null,
        4
      )
    );

  const videoSize = fs.statSync(file).size;

  //==> Parse Range
  const chunkSize = 1 * (1024 * 1024); // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize, videoSize - 1);
  const contentLength = end - start + 1;

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  });

  const videoStream = fs.createReadStream(file, { start, end });
  videoStream.pipe(res);
};

module.exports = {
  jsonResponse,
  netLocal,
  videoStream,
};
