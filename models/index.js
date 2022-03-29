// import models
const Equipment = require('./Equipment');
const Category = require('./Category');
const Tag = require('./Tag');
const EquipmentTag = require('./EquipmentTag');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
  hooks: true
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'cascade',
  hooks: true
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
  hooks: true
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade',
  hooks: true
});

// Products belongsTo Category
Equipment.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products
Category.hasMany(Equipment, {
  foreignKey: 'category_id'
});

// Products belongToMany Tags (through ProductTag)
Equipment.belongsToMany(Tag, {
  through: EquipmentTag,
  foreignKey: 'equipment_id'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Equipment, {
  through: EquipmentTag,
  foreignKey: 'tag_id'
});

module.exports = {
  Equipment,
  Category,
  Tag,
  EquipmentTag,
  User,
  Post,
  Comment
};