const ensureAuthentication = require('../middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthentication , (req,res)=>{
    // console.log('logged in user detail ----', req.user) 
    res.status(200).json([
        {
            name:"mobile",
            price:10000
        },
        {
            name:"PC",
            price:50000
        }
    ])
})

module.exports = router