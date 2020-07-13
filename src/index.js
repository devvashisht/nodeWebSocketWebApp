const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3002;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));
//let count = 0;
io.on("connection", (socket) => {
  console.log("new connection estqablish");
  socket.emit("message", "welcome");
  socket.broadcast.emit("message", " A new user has joined");

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed");
    }
    io.emit("message", message);
    callback("DeliveredServer");
  });

  socket.on("disconnect", () => {
    io.emit("message", "User has left");
  });
  socket.on("sendLocation", (coords, callback) => {
    // io.emit("message", `Location: ${coords.latitude},${coords.longitude}`);
    io.emit(
      "message",
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
    callback();
  });
  // socket.emit("countUpdated", count);
  // socket.on("increment", () => {
  //   count++;
  //   // socket.emit("countUpdated", count);
  //   io.emit("countUpdated", count);
  // });
});
io.on("increemnt", () => {});
server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
