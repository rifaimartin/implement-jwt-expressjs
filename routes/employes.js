const express = require('express');
const router = express.Router();
const employeController = require('../app/api/controllers/employes');

router.get('/', employeController.getAll);
router.post('/', employeController.create);
router.get('/:employeId', employeController.getById);
router.put('/:employeId', employeController.updateById);
router.delete('/:employeId', employeController.deleteById);

module.exports = router;