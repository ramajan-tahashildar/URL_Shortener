import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY_TIME = process.env.JWT_EXPIRY_TIME;

function setUser(user) {
  const payload = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY_TIME });
}

function getUser(token) {
  if (!token) {
    return null;
  }
  try {
    // console.log(token); // x
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export { setUser, getUser };
