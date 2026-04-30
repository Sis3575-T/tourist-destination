const Worker = require('../models/Worker');

// @desc    Get all workers
// @route   GET /api/workers
exports.getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find().sort({ createdAt: -1 });
    res.json(workers);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Register new worker
// @route   POST /api/workers
exports.registerWorker = async (req, res) => {
  try {
    const { name, email, phone, position, salary } = req.body;
    const worker = new Worker({ name, email, phone, position, salary });
    await worker.save();
    res.status(201).json(worker);
  } catch (err) {
    res.status(400).json({ message: 'Failed to register worker', error: err.message });
  }
};

// @desc    Process salary payment
// @route   POST /api/workers/:id/pay
exports.paySalary = async (req, res) => {
  try {
    const { amount, period } = req.body;
    const worker = await Worker.findById(req.params.id);
    
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    worker.payments.push({
      amount: amount || worker.salary,
      period: period || new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
      status: 'paid'
    });

    await worker.save();
    res.json(worker);
  } catch (err) {
    res.status(500).json({ message: 'Payment failed', error: err.message });
  }
};

// @desc    Update worker status
// @route   PATCH /api/workers/:id/status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const worker = await Worker.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(worker);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// @desc    Log worker attendance
// @route   POST /api/workers/:id/attendance
exports.logAttendance = async (req, res) => {
  try {
    const { status, note, date } = req.body;
    const worker = await Worker.findById(req.params.id);
    
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    worker.attendance.push({
      status: status || 'present',
      note: note || '',
      date: date || new Date()
    });

    await worker.save();
    res.json(worker);
  } catch (err) {
    res.status(500).json({ message: 'Attendance logging failed', error: err.message });
  }
};
