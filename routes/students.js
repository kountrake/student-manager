const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController')

router.get('/', studentController.studentHome);
router.get( '/:studentId', studentController.getStudent );
router.post( '/', studentController.createStudent );
router.put( '/', studentController.updateStudent );
router.delete( '/:studentId', studentController.deleteStudent );

module.exports = router;
