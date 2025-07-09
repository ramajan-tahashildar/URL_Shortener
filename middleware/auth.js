import { getUser } from "../services/auth.js";
import user from "../models/user.js";

async function restrictedToLoggedInUsers(req, res, next) {
  try {
    const token = req.cookies.Token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        status: "failed",
      });
    }

    const user = getUser(token);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
        status: "failed",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
}

export default restrictedToLoggedInUsers;
