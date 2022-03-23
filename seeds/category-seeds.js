const { Category } = require('../models');

const categoryData = [
    {
        category_name: 'Router',
    },
    {
        category_name: 'Switches',
    },
    {
        category_name: 'Wireless LAN',
    },
    {
        category_name: 'Security',
    },
];

const seedCategories = () => Category.bulkCreate(categoryData);
module.exports = seedCategories;