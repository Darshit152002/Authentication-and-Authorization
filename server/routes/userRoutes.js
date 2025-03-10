const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const userExists = await User.findOne({ email: user.email });

    if (userExists) {
      return res.send({
        success: false,
        message: "User with this email already exists in DB",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = new User({ ...user, password: hashedPassword });
    newUser.save();

    res.send({
      success: true,
      message: "User successfully registered",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.send({
      success: false,
      message: "User does not exist",
    });
  }
  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    return res.send({
      success: false,
      message: "Incorrect password",
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
    expiresIn: "1d",
  });
  //  console.log(token);

  return res.send({
    success: true,
    message: "User is logged in",
    data: token,
  });
});

// Protected route
router.get("/currentUser", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    return res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
});

exports.router = router;
