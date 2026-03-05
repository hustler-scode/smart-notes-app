const { Note } = require("../models");
const { Op } = require("sequelize");

exports.summary = async (req, res) => {
  try {

    const userId = req.user.id;

    const totalNotes = await Note.count({ where: { UserId: userId } });

    const completedNotes = await Note.count({
      where: { UserId: userId, isCompleted: true }
    });

    const archivedNotes = await Note.count({
      where: { UserId: userId, isArchived: true }
    });

    const overdueNotes = await Note.count({
      where: {
        UserId: userId,
        dueDate: { [Op.lt]: new Date() },
        isCompleted: false
      }
    });

    res.json({
      totalNotes,
      completedNotes,
      archivedNotes,
      overdueNotes
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};