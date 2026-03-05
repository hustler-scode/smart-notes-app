const { Tag } = require("../models");

exports.createTag = async (req, res) => {
  try {
    const tag = await Tag.create({
      ...req.body,
      UserId: req.user.id
    });

    res.status(201).json(tag);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      where: { UserId: req.user.id }
    });

    res.json(tags);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};