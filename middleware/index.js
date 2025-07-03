import fs from "fs";

function middleware(filename) {
  return (req, res, next) => {
    const log = `Server accessed at ${new Date()} on ${req.method} request}`;
    fs.appendFile(filename, log + "\n", (err) => {
      return console.log("Error found at middleware", err);
    });
    next();
  };
}
