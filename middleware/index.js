import fs from "fs";

function middleware(filename) {
  return (req, res, next) => {
    const log = `Server accessed on ${req.method} request at ${new Date()}`;
    fs.appendFile(filename, log + "\n", (err) => {
      if (err) {
        return console.log("Error found at middleware", err);
      }
    });
    next();
  };
}

export default middleware;
