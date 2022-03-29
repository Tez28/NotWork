const seedCategories = require('./category-seeds');
const seedEquipment = require('./equipment-seeds');
const seedTags = require('./tag-seeds');
const seedEquipmentTags = require('./equipment-tag-seeds');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({
    force: true
  });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedEquipment();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedEquipmentTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();