// controllers/userController.js
const userModel=require('../Models/Usermodel');

// Create new user
exports.createUser = async (req, res) => {
  console.log(req);
  console.log(req.body);
  try {
    const data = req.body;
    const result = await userModel.createUser(data);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      id:result.id
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Verify user (login)
exports.verifyUser = async (req, res) => {
  console.log(req)
  try {
    const data = req.body;
    const user = await userModel.verifyUser(data);

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.status(200).json({
      status: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updated = await userModel.updateUser(data, id);

    if (updated) {
      res.status(200).json({ success: true, message: "User updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get user by ID
exports.getUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.getUserByID(id);

    if (!user || user.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await userModel.deleteUser(id);

    if (deleted) {
      res.status(200).json({ success: true, message: "User deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
