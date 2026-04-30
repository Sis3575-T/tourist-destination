const express = require('express');
const router = express.Router();
const { getWorkers, registerWorker, paySalary, updateStatus, logAttendance } = require('../controllers/workerController');

// All routes here should ideally be protected by a role check middleware
// For now, we'll mount them and rely on the frontend gate, 
// but in production, we should add auth/role middleware here.

router.get('/', getWorkers);
router.post('/', registerWorker);
router.post('/:id/pay', paySalary);
router.post('/:id/attendance', logAttendance);
router.patch('/:id/status', updateStatus);

module.exports = router;
