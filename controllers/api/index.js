const router = require('express').Router();

const ownerRoutes = require('./owner-routes');
const petRoutes = require('./pet-routes')

router.use('/owners', ownerRoutes);
router.use('/pets', petRoutes);


module.exports = router;