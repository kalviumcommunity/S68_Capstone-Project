const Usermodel=require('../Modle/Usermodel') 
const bcrypt=require('bcrypt')
const JWT=require('jsonwebtoken')
require('dotenv').config()

const CheckEmail=(email)=>{
    const regex=/^[\w.-]+@[\w.-]+.\w{2,3}$/
    return regex.test(email)
}
const registerUser = async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
    
      if (!CheckEmail(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }
       
  
      
      const existingUser = await Usermodel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists." });
      }
  
    
      const hashedPassword = await bcrypt.hash(password, 10);
  
      
      const user = await Usermodel.create({
        username,
        email,
        password: hashedPassword,
        role: role || "user", // Default role to 'user' if not provided
      });
  
    
      return res.status(201).json({
        message: "User registered successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
  
    } catch (error) {
      console.error("Registration Error:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  };

  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
     
      const user = await Usermodel.findOne({ email }).select("+password");
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
     
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
   
      const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
  
    
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        }
      });
  
    } catch (error) {
      res.status(500).json({ message: "Login error", error });
      console.log(error)
    }
  };

  const getAllUsers = async (req, res) => {
    try {
      const users = await Usermodel.find(); 
      res.status(200).json({
        message: "Fetched all users successfully",
        users,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch users",
        error: error.message,
      });
    }
  };

  const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const user = await Usermodel.findById(userId); 
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        message: "User fetched successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching user",
        error: error.message,
      });
    }
  };
  const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      const updatedUser = await Usermodel.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      )
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Update failed",
        error: error.message,
      });
    }
  };
  
  
  
module.exports={registerUser,loginUser,getAllUsers,getUserById,updateUser}



