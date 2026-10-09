
const UserModel = require("../models/User")

const addExpenses = async(req,res) => {
    const body = req.body;
    const {_id} = req.user
    
     try{

       const userData = await UserModel.findByIdAndUpdate(
            // user id
            _id,
            {
                $push:{expenses:body}
            },
            // for returning the updating document 
            {
                new:true
            }
        )
 
        res.status(200).json({
            message:"Expense added successfully",
            success:true,
            data:userData?.expenses
        })
    

     }catch(err){
        return res.status(500).json({
            message:"something went wrong",
            error:err,
            success:false
        })
     }
}

const fetchExpenses = async(req,res) => {
    const {_id} = req.user
    
     try{

       const userData = await UserModel.findById(_id).select('expenses')
 
        res.status(200).json({
            message:"fetched Expense successfully",
            success:true,
            data:userData?.expenses
        })
    

     }catch(err){
        return res.status(500).json({
            message:"something went wrong",
            error:err,
            success:false
        })
     }
}

const deleteExpenses = async(req,res) => {
    const {_id} = req.user;
    const {expenseId} = req.params;
    try{

        const userData = await UserModel.findByIdAndUpdate(
             // user id
             _id,
             {
                 $pull:{expenses:{_id:expenseId}}
             },
             // for returning the updating document 
             {
                 new:true
             }
         )
  
         res.status(200).json({
             message:"Expense deleted successfully",
             success:true,
             data:userData?.expenses
         })
     
 
      }catch(err){
         return res.status(500).json({
             message:"something went wrong",
             error:err,
             success:false
         })
      }

    }

module.exports = {
    addExpenses,
    fetchExpenses,
    deleteExpenses
}