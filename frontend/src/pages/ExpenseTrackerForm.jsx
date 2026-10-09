import React, { useState } from 'react'
import { handleError } from '../utils';

const ExpenseTrackerForm = ({ addExpenses }) => {

    const [expenseInfo, setExpenseInfo] = useState({ text: '', amount: '' })


    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name , value)
        const copyExpenseInfo = { ...expenseInfo };
        copyExpenseInfo[name] = value;
        setExpenseInfo(copyExpenseInfo)
        // console.log(copyLoginInfo)
    }

    const handleExpense = (e) => {
        e.preventDefault();
        //    console.log(expenseInfo)
        const {text,amount} = expenseInfo;
        if(!text || !amount){
            handleError("All fields are required.");
            return;
        }
       setTimeout(()=>{
        setExpenseInfo({text:"" , amount:''})
       },1000)
        addExpenses(expenseInfo)

    }


    return (
        <div className='container'>
            <h1>Expense Tracker</h1>
            <form onSubmit={handleExpense}>

                <div>
                    <label htmlFor='text'>Expense Description</label>
                    <input onChange={handleChange} value={expenseInfo.text} type='text' name='text' placeholder='Enter your Expense Description.' />
                </div>
                <div>
                    <label htmlFor='amount'>Amount</label>
                    <input onChange={handleChange} value={expenseInfo.amount} type='number' name='amount' placeholder='Enter your amount, expense(-ve) Income(+ve)...' />
                </div>
                <button>Add Expense</button>
            </form>
        </div>
    )
}

export default ExpenseTrackerForm
