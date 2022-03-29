const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

const categoryRoutes = require('./category-routes');
const equipmentRoutes = require('./equipment-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

router.use('/categories', categoryRoutes);
router.use('/equipment', equipmentRoutes);


module.exports = router;
