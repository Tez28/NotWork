const { Category } = require('../models');

const categoryData = [
    {
        category_name: 'Cisco'
    },
    {
        category_name: 'Juniper'
    },
    {
        category_name: 'HPE'
    },
    {
        category_name: 'Arista'
    },
];

const seedCategories = () => Category.bulkCreate(categoryData);
module.exports = seedCategories;