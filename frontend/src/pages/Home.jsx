import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify'
import ExpensesTable from './ExpensesTable';
import ExpenseTrackerForm from './ExpenseTrackerForm';
import ExpenseDetails from './ExpenseDetails';

function Home() {

  const [loggedInUser, setLoggedInUser] = useState('');
  const [expenses, setExpenses] = useState([]);

  const [expenseAmount , setExpenseAmount] = useState(0);
  const [incomeAmount , setIncomeAmount] = useState(0);

  const navigate = useNavigate()

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  // for updating expense 

  useEffect(()=>{
    const amount = expenses.map((item)=>item.amount);
    console.log(amount)
    // for income 
    const income = amount.filter(item => item > 0)
    .reduce((acc,item)=>(acc+=item) , 0);
    console.log('income amount: ' , income)

    // for expense 
    const exp = amount.filter(item => item < 0)
    .reduce((acc,item)=>(acc+=item) , 0 ) * -1;
    console.log('expense amount:' ,exp);

    setIncomeAmount(income);
    setExpenseAmount(exp)
  },[expenses])

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logout successfully')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  const fetchExpenses = async () => {
    try {

      const url = 'http://localhost:500/expenses';

      const response = await fetch(url, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      if (response.status === 403) {
        navigate('/login');
        return;
      }
      const result = await response.json();
      // console.log(result) 
      setExpenses(result.data);

    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const addExpenses = async (data) => {
    try {

      const url = 'http://localhost:500/expenses';

      const response = await fetch(url, {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
      });
      if (response.status === 403) {
        navigate('/login');
        return;
      }
      const result = await response.json();
      // console.log(result) 
      setExpenses(result.data);
      handleSuccess(result.message)
    } catch (error) {
      handleError(error)
    }
  }

   const handleDeleteExpense = async(expenseId) => {
    console.log("Expense ID:", expenseId);
    try {

      const url = `http://localhost:500/expenses/${expenseId}`;

      const response = await fetch(url, {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        method: "DELETE"
      });
      if (response.status === 403) {
        navigate('/login');
        return;
      }
      const result = await response.json();
      // console.log(result) 
      setExpenses(result.data);
      handleSuccess(result.message)
    } catch (error) {
      handleError(error)
    }
   }

  return (
    <div>
      <div className='user-section'>
        <h1>Welcome {loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <ExpenseDetails incomeAmount={incomeAmount} expenseAmount={expenseAmount}/>
      <ExpenseTrackerForm addExpenses={addExpenses} />
      <ExpensesTable expenses={expenses} handleDeleteExpense={handleDeleteExpense}/>
      <ToastContainer />
    </div>
  )
}

export default Home