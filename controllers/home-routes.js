const router= require('express').Router();
const sequelize = require('../config/connection');
const { Equipment, Category, Tag, EquipmentTag, User, Comment, Post } = require('../models');
withAuth = require('../utils/auth');

// gets list of categories
router.get('/', (req, res) => {
    console.log(req.session);
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
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/posts', (req, res) => {
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
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// lists equipment related to a specific category
router.get('/category/:id', (req, res) => {
    Equipment.findAll({
        where: {
            category_id: req.params.id
        },
        attributes: ['id', 'equipment_name', 'type', 'category_id'],
        include: {
            model: Category,
            attributes: ['id', 'category_name']
        }
    })
.then(dbEquipmentData => {
    const equipment = dbEquipmentData.map((equipment) => equipment.get({ plain: true }));
    const categoryInfo = dbEquipmentData[0].category; 
    const category = categoryInfo.get({ plain: true });
    res.render('category-equipment', {
        equipment,
        category,
        loggedIn: req.session.loggedIn
    });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
})
});

// gets posts related to equipment
router.get('/equipment/:id', (req, res) => {
    Post.findAll({
        where: {
            equipment_id: req.params.id
        },
        attributes: ['id', 'title', 'text', 'user_id', 'equipment_id', 'created_at'],
        include: [
            {
            model: User,
            attributes: ['username']
            },
            {
                model: Equipment,
                attributes: ['equipment_name', 'type', 'category_id'],
                include: [
                    {
                        model: Category,
                        attributes: ['id', 'category_name']
                    }
                ]
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
            
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        if (!dbPostData.length) {
            res.render('equipment-posts', {
                posts,
                loggedIn: req.session.loggedIn
            })
       
        } else {
            const equipmentInfo = dbPostData[0].equipment; 
            const equipment = equipmentInfo.get({ plain: true });
            res.render('equipment-posts', {
                posts,
                equipment,
                loggedIn: req.session.loggedIn
            })

        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/posts/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'text', 'user_id', 'equipment_id', 'created_at'],
        include: [
            {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
            },
            {
            model: User,
            attributes: ['username']
            },
            {
                model: Equipment,
                attributes: ['equipment_name', 'type', 'category_id'],
                include: [
                    {
                        model: Category,
                        attributes: ['id', 'category_name']
                    }
                ]
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }
        const post = dbPostData.get({ plain: true });
        console.log(post);
        res.render('single-post', {
            post,
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


router.get('/dashboard', withAuth, (req, res) => {
    console.log(req.session);
    console.log('======================');
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id', 
            'title',
            'text',
            'user_id',
            'equipment_id',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
                },
                {
                    model: Equipment,
                    attributes: ['equipment_name', 'type', 'category_id'],
                    include: [
                        {
                            model: Category,
                            attributes: ['id', 'category_name']
                        }
                    ]
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        if (!dbPostData.length) {
            res.render('dashboard', {
                posts,
                loggedIn: req.session.loggedIn
            })
       
        } else {
            const equipmentInfo = dbPostData[0].equipment; 
            const equipment = equipmentInfo.get({ plain: true });
            res.render('dashboard', {
                posts,
                equipment,
                loggedIn: req.session.loggedIn
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/dashboard/edit/:id', withAuth, (req, res) => {
    Post.findByPk(req.params.id, {
      attributes: [
        'id', 
        'title',
        'text',
        'user_id',
        'equipment_id',
        'created_at'
      ],
      include: [
        {
            model: User,
            attributes: ['username']
            },
            {
                model: Equipment,
                attributes: ['equipment_name', 'type', 'category_id'],
                include: [
                    {
                        model: Category,
                        attributes: ['id', 'category_name']
                    }
                ]
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
    ]
    })
      .then(dbPostData => {
        if (dbPostData) {
          const post = dbPostData.get({ plain: true });
          
          res.render('edit-post', {
            post,
            loggedIn: true
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;