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
  
   
      const token = JWT.sign({ id: user._id }, process.env.JWT_SCERET, { expiresIn: "3d" });
  
    
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
  
module.exports={registerUser,loginUser}



