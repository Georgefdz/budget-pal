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

router.delete('/expenses/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Expense.destroy({
      where: { id }
    });
    if (result === 1) {
      res.status(200).send({ message: "Expense deleted successfully" });
    } else {
      res.status(404).send({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error: error.message });
  }
});


module.exports = router;
