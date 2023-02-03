const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register new user
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, password2 } = req.body;

  const validatePassword = (password) => {
    const re =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
    return re.test(password);
  };

  if (!name || !username || !email || !password || !password2) {
    res.status(400);
    throw new Error("Please complete all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email, username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (password !== password2) {
    res.status(400);
    throw new Error("Passwords don't match.");
  }

  if (!validatePassword(password)) {
    res.status(400);
    throw new Error("Invalid password format");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let user;
  if (!email.includes("@")) {
    user = await User.findOne({ username: email });
  }
  // Check for user email
  else {
    user = await User.findOne({ email });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Delete user
// @route DELETE /api/user/
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("No user found!");
  }

  const { email, password } = req.body;

  if (!email && !password) {
    res.status(401);
    throw new Error("Please provide both the email and the password!");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const { id } = req.user;

    await Kard.deleteMany({ user: id });
    await user.remove();
    res.status(200).json(user);
  } else {
    res.status(401);
    throw new Error("Please provide the correct password for the email!");
  }
});

// @desc Change password
// @route PATCH /api/user/change
// @access Private
const changePassword = asyncHandler(async (req, res) => {
  const { email, password, newPassword } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  if (!email || !password || !newPassword) {
    const errorMsg = "Please complete all fields!";
    res.status(401).json({ message: errorMsg });
    throw new Error(errorMsg);
  }

  const user = await User.findOne({ email });

  if (!user) {
    const errorMsg = "No user found!";
    res.status(401).json({ message: errorMsg });
    throw new Error(errorMsg);
  }

  if (await bcrypt.compare(newPassword, user?.password)) {
    const errorMsg = "Please pick a password different from your old one.";
    res.status(401).json({ message: errorMsg });
    throw new Error(errorMsg);
  }

  if (await bcrypt.compare(password, user?.password)) {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.body.email },
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json({
      ...updatedUser,
      token: generateToken(user._id),
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  changePassword,
};
