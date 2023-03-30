const router = require('express').Router();

const userRoutes = require('./userRoutes');
const radLibRoutes = require('./radLibRoutes');

router.use('/users', userRoutes);
router.use('/radlibs', radLibRoutes);

module.exports = router;