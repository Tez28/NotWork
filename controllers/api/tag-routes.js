const router = require('express').Router();
const { Category, Equipment, Tag, EquipmentTag} = require('../../models');

// get all tags
router.get('/', (req, res) => {
    Tag.findAll()
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get tag by Id
router.get('/:id', (req, res) => {
    Tag.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Equipment,
            attributes: ['equipment_name', 'type', 'category_id'],
            include: {
                model: Category,
                attributes: ['category_name']
            }
        }
    })
})

//create a new tag
router.post('/', (req, res) => {
    Tag.create({
        tag_name: req.body.tag_name
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete tag by id
router.delete('/:id', (req, res) => {
    Tag.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbTagData => {
        if (!dbTagData) {
            res.status(404).json({ message: 'No tags found with that ID'});
            return;
        }
        res.json(dbTagData);
    })
    .catch(err => {
        console.log(er);
        res.status(500).json(err);
    });
})