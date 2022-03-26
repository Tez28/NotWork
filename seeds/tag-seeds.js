const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'Router',
  },
  {
    tag_name: 'Switch',
  },
  {
    tag_name: 'WAN/LAN',
  },
  {
    tag_name: 'Security',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;