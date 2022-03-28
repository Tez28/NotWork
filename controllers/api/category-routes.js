const router = require('express').Router();
const { Category } = require('../../models');


// gets all categories
router.get('/', (req, res) => {
    Category.findAll()
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// gets a single category and its corresponding equipment list
router.get('/:id', (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Equipment,
                attributes: ['id', 'equipment_name', 'type']
            }
        ]
    })
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            res.status(404).json({ message: 'No category found with that id'});
            return
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);;
        res.status(500).json(err);
    });
});
// Creates a new category
router.post('/', withAuth (req, res) => {
    Category.create({
        category_name: req.body.category_name
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// deletes a category
router.delete('/:id', withAuth, (req, res) => {
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCategoryData => {
        if(!dbCategoryData) {
            res.status(404).json({ message: 'No category found with that id'});
            return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router



