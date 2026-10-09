import React from 'react'

const ExpenseDetails = ({incomeAmount , expenseAmount}) => {
  return (
    <div>
      <div>
        Your Balance is {incomeAmount - expenseAmount}
      </div>
      <div className='amount-container'>
        income
        <span className='income-amount'>{incomeAmount}</span>
        expense
        <span className='expense-amount'>{expenseAmount}</span>
      </div>
    </div>
  )
}

export default ExpenseDetails
