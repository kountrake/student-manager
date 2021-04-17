var express = require('express');
var router = express.Router();
const groupController = require('../controllers/groupController')

router.get('/', groupController.groupHome);
router.get( '/:groupId', groupController.getGroup );
router.put( '/', groupController.updateGroup );

module.exports = router;
