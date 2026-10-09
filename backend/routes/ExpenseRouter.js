const { fetchExpenses, addExpenses, deleteExpenses } = require('../controllers/ExpenseController');

const router = require('express').Router();

// fetch all the expenses of user based on user._id 

router.get('/' , fetchExpenses);

// create expenses 

router.post('/' , addExpenses);

// delete expenses 

router.delete('/:expenseId' , deleteExpenses)

module.exports = router