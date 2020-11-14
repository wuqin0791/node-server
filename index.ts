/*
 * @Description: This is a ts file
 * @Author: JeanneWu
 * @Date: 2020-10-25 11:56:11
 */

import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const server = http.createServer();
const publicDir = path.resolve(__dirname, "public");

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  // curl -v(查看请求的log) -d（发送post请求） 'name=frank' http://localhost:8888
  const { method, url: requestUrl, headers } = request;

  const { pathname, search } = url.parse(requestUrl);

  if (method !== "GET") {
    response.statusCode = 405;
    response.end();
    return;
  }
  let fileName;
  fileName = fileName === "" ? "index.html" : pathname.substr(1);

  console.log(fileName);
  fs.readFile(path.resolve(publicDir, fileName), (error, data) => {
    // response.setHeader("Content-Type", "text/html;charset=utf-8");
    console.log(error);
    if (error) {
      if (error.errno === -2) {
        response.statusCode = 404;
        fs.readFile(path.resolve(publicDir, "404.jpeg"), (error, data) => {
          response.end(data);
        });
      } else {
        response.statusCode = 500;
        response.end("服务器异常");
      }
    } else {
      response.setHeader("Catch-control", "public, max-age=31536000");
      response.end(data);
    }
  });
});

server.listen("8888");
