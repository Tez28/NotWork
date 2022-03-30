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

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Equipment.hasMany(Post, {
  foreignKey: 'equipment_id',
});

Post.belongsTo(Equipment, {
  foreignKey: 'equipment_id'
});

// User.belongsToMany(Post, {
//   // through: Vote,
//   // as: 'voted_posts',

//   foreignKey: 'user_id',
//   onDelete: 'SET NULL'
// });

// Post.belongsToMany(User, {
//   through: Vote,
//   as: 'voted_posts',
//   foreignKey: 'post_id',
//   onDelete: 'SET NULL'
// });

// Vote.belongsTo(User, {
//   foreignKey: 'user_id',
//   onDelete: 'SET NULL'
// });

// Vote.belongsTo(Post, {
//   foreignKey: 'post_id',
//   onDelete: 'SET NULL'
// });

// User.hasMany(Vote, {
//   foreignKey: 'user_id'
// });

// Post.hasMany(Vote, {
//   foreignKey: 'post_id'
// });

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
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
