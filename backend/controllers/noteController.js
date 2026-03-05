const { Note } = require("../models");

exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      UserId: req.user.id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { UserId: req.user.id },
      order: [
        ["isPinned", "DESC"],
        ["createdAt", "DESC"],
      ],
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      where: { id: req.params.id, UserId: req.user.id },
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    await note.update(req.body);

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      where: { id: req.params.id, UserId: req.user.id },
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    await note.destroy();

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};