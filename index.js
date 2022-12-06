const http = require("http");
const express = require("express");
const socket = require("ws");
const port = 8080;
const server = http.createServer(express);
const wss = new socket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === socket.OPEN) {
        client.send(data);
      }
    });
  });
});

server.listen(port, () => {
  console.log("server up");
});
