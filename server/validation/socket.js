const userToSocket = {};
const socketToUser = {};

const addUser = (user) => {
  if (userToSocket[user.id]) {
    delete socketToUser[userToSocket[user.id]];
    delete userToSocket[user.id];
  }
  userToSocket[user.id] = user.socketId;
  socketToUser[user.socketId] = user.id;
  console.log("add userToSocket", userToSocket);
  console.log("add socketToUser", socketToUser);
};

const getUserIdBySocketId = (socketId) => {
  return socketToUser[socketId];
};
const getSocketIdByUserId = (userId) => {
  return userToSocket[userId];
};
const deleteUser = (socketId) => {
  const userId = socketToUser[socketId];
  delete socketToUser[socketId];
  delete userToSocket[userId];
  console.log("userToSocket", userToSocket);
  console.log("socketToUser", socketToUser);
};

exports.addUser = addUser;
exports.deleteUser = deleteUser;
exports.getSocketIdByUserId = getSocketIdByUserId;
exports.getUserIdBySocketId = getUserIdBySocketId;
