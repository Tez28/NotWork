const router = require('express').Router();
const { UPSERT } = require('sequelize/types/query-types');
const sequelize = require('../../config/connection.js');
const { Category, Equipment, Tag, EquipmentTag, Post } = require('../../models');

// Gets all equipment 
router.get('/', (req, res) => {
    Equipment.findAll()
    .then(dbEquipmentData => res.json(dbEquipmentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Gets equipment by id and category name
router.get('/:id', (req, res) => {
    Equipment.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'comment_text', 'title', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: Category,
                attributes: ['id', 'category_name']
            }
        ]
    })
    .then(dbEquipmentData => {
        if (!dbEquipmentData) {
            res.status(404).json({ message: 'No equipment found with that ID'});
            return;
        }
        res.json(dbEquipmentData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// Creates new equipment row
router.post('/', (req, res) => {
    Equipment.create({
        equipment_id: req.body.equipment_id,
        tag_id: req.body.tag_id
    })
    .then(dbEquipmentData => res.json(dbEquipmentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// Updates Equipment
router.put('/:id', (req, res) => {
    Equipment.update(
        {
            equipment_id: req.body.equipment_id,
            tag_id: req.body.tag_id
    },
    {
        where: {
            id: req.params.id
        }
    }
    )
    .then(dbEquipmentData => {
        if (!dbEquipmentData) {
            res.status(404).json({ message: 'No Equipment found with that ID!'});
            return;
        }
        res.json(dbEquipmentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Deletes Equipment
router.delete('/:id', (req, res) => {
    Equipment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbEquipmentData => {
        if (!dbEquipmentData) {
            res.status(404).json({ message: 'No equipment found with that ID'});
            return;
        }
        res.json(dbEquipmentData);
    })
    .catch(err => {
        console.log(er);
        res.status(500).json(err);
    });
});

module.exports = router;