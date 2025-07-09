import { getUser } from "../services/auth.js";
import user from "../models/user.js";

async function restrictedToLoggedInUsers(req, res, next) {
  try {
    const token = req.headers?.["authorization"];
    // console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        status: "failed",
      });
    }

    const authToken = token.split("Bearer ")[1];

    const user = getUser(authToken);
    // console.log(user);
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

function restrictedTo(roles) {
  return (req, res, next) => {
    const user = req.user;
    // console.log("restrictedTo", user);
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to perform this action",
        status: "failed",
      });
    }
    next();
  };
}

export { restrictedToLoggedInUsers, restrictedTo };
