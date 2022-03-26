const { EquipmentTag } = require('../models');

const equipmentTagData = [
    {
        equipment_id: 1,
        tag_id: 1,
    },
    {
        equipment_id: 1,
        tag_id: 2,
    },
    {
        equipment_id: 2,
        tag_id: 1,
    },
    {
        equipment_id: 2,
        tag_id: 2,
    },
    {
        equipment_id: 3,
        tag_id: 1,
    },
    {
        equipment_id: 3,
        tag_id: 2,
    },
    {
        equipment_id: 4,
        tag_id: 1,
    },
    {
        equipment_id: 4,
        tag_id: 2,
    },
];

const seedEquipmentTags = () => EquipmentTag.bulkCreate(equipmentTagData);

module.exports = seedEquipmentTags;