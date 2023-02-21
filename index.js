const http = require("http");
const express = require("express");
const socket = require("ws");
const port = 8080;
const server = http.createServer(express);
const wss = new socket.Server({ server });

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log("got message " + data);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === socket.OPEN) {
        client.send(data);
        console.log("aand here " + data);
      }
    });
  });
});

server.listen(port, () => {
  console.log("server up");
});
