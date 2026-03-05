const sequelize = require("../config/database");
const User = require("./User");
const Note = require("./Note");
const Tag = require("./Tag");

User.hasMany(Note, { onDelete: "CASCADE" });
Note.belongsTo(User);

User.hasMany(Tag, { onDelete: "CASCADE" });
Tag.belongsTo(User);

Note.belongsToMany(Tag, { through: "NoteTags" });
Tag.belongsToMany(Note, { through: "NoteTags" });

module.exports = {
  sequelize,
  User,
  Note,
  Tag,
};