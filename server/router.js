const express = require('express');
const { Expense } = require('./models');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hey');
});

router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      order: [
        ['date', 'DESC'],
      ],
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Cannot get expenses', error: error.message });
  }
});

router.post('/expenses', async (req, res) => {
  try {
    const { amount, category, date } = req.body;
    const newExpense = await Expense.create({ amount, category, date });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Cannot post expenses', error: error.message });
  }
});

module.exports = router;
