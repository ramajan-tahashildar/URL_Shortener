//stateful auth <> sessionID

// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

// export { setUser, getUser };

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function setUser(user) {
  const payload = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
}

function getUser(token) {
  if (!token) {
    return null;
  }
  return jwt.verify(token, process.env.JWT_SECRET);
}

export { setUser, getUser };
