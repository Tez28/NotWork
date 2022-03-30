const router= require('express').Router();
const sequelize = require('../config/connection');
const { Equipment, Category, Tag, EquipmentTag } = require('../models');

router.get('/', (req, res) => {
     Category.findAll({
         attributes: [
             'id',
             'category_name'
         ],
        include: [
            {
                model: Equipment,
                attributes: ['equipment_name', 'type', 'category_id']
            }
        ]
    })
    .then(dbCategoryData => {
        const categories = dbCategoryData.map((category) => category.get({ plain: true }));
        res.render('homepage', {
            categories,
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/category/:id', (req, res) => {
    Equipment.findAll({
        where: {
            category_id: req.params.id
        },
        attributes: ['id', 'equipment_name', 'type', 'category_id']
    })
.then(dbEquipmentData => {
    const equipment = dbEquipmentData.map((equipment) => equipment.get({ plain: true }));
    res.render('category-equipment', {
        equipment
    });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
})
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;