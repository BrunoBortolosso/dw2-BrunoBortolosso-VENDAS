const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');

// Define routes
router.get('/resource', controller.getResource);
router.post('/resource', controller.createResource);
router.put('/resource/:id', controller.updateResource);
router.delete('/resource/:id', controller.deleteResource);

module.exports = router;