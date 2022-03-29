const router= require('express').Router();
const sequelize = require('../config/connection');
const { Equipment, Category, Tag, EquipmentTag } = require('../models');

router.get('/', (req, res) => {
    Category.findAll({
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
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

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