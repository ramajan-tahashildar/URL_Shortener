import user from "../models/user.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { setUser, getUser } from "../services/auth.js";

async function signInuser(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        status: "failed",
      });
    }

    if (!validEmail.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        status: "failed",
      });
    }

    if (!validPassword.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters, include at least one letter and one number",
        status: "failed",
      });
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await user.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: `${err}`,
      status: "failed",
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const result = await user.findOne({ email });
    if (!result) {
      return res.status(404).json({
        message: "Invalid email",
        status: "failed",
      });
    }
    // Compare the plain password with the hashed password
    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Invalid password",
        status: "failed",
      });
    }

    await user.findOneAndUpdate({ email }, { isLoggedIn: true });

    // //stateful sessionID
    //   const sessionID = uuidv4();
    //   console.log("sessionID", sessionID); //a368b92d-417f-475d-98ae-2c8f7a1f4eb5
    //   setUser(sessionID, result);
    //   // console.log("set session id", id); // undefined

    const token = setUser(result);
    res.cookie("Token", token);
    return res.status(200).json({
      message: "Login successful",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error: ${err}`,
      status: "failed",
    });
  }
}

async function getAllTheuser(req, res) {
  try {
    const result = await user.find();
    if (!result) {
      return res.status(404).json({
        message: "No user found",
        status: "failed",
      });
    }
    return res.status(200).json({
      message: "User found successfully",
      status: "success",
      data: result.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })),
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
}

export { signInuser, getAllTheuser, loginUser };
