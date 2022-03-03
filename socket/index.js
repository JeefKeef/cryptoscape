const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const getUsers = (followers) => {
  const res = users.filter((user) => followers.includes(user.userId));
  return res;
};

io.on("connection", (socket) => {
  //connected
  console.log("a user connected.");
  //take user id and socket id from client
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and receive message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //notification
  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  //post notificaiton
  socket.on("sendPostNotification", ({ senderName, followers, type }) => {
    const receivers = getUsers(followers);
    receivers.map((receiver) =>
      io.to(receiver.socketId).emit("getPostNotification", {
        senderName,
        type,
      })
    );
  });

  //disconnected
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
