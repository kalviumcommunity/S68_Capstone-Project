const express=require('express')
const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
}=require('../controllers/UserController')

const authMiddleware=require('../Middleware/auth')
const router=express.Router()


router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/allusers",authMiddleware,getAllUsers)
router.get("/allusers/:id",authMiddleware,getUserById)
router.put("/updateuser/:id",authMiddleware,updateUser)



module.exports=router