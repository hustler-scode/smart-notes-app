const { User } = require("../models");

exports.getProfile = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized user" });
      }
  
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password"] },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user);
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    await user.update(req.body);

    const updatedUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    await User.destroy({
      where: { id: req.user.id },
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};