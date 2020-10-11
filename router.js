const fs = require("fs");

const requestHandler = (req, res) => {
  const method = req.method;
  if (req.url === "/") {
    res.write("<html>");
    res.write("<head><title>My First Page2</title></head>");
    res.write(
      '<body><form action = "/message" method="POST" > <input type = "text" name = "message" /> <button type="submit"> Send </button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (req.url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = "302";
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body>My first node.js server!!</body>");
  res.write("</html>");
  res.end();
};
// module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: "hard code text",
// };

// module.exports.handler = requestHandler;
// module.exports.someText = "hard code text";

exports.handler = requestHandler;
exports.someText = "hard code text";
