const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require('../models/User');

router.post('/login', async (req, res)=>{
    const email = req.body.email
    const password=req.body.password.toString();
    try {
        const user  =  await User.findByEmail(email)
        console.log("This is printed by controllers/auth.js")
        const correct= await bcrypt.compare(password, user.password.toString());
        if(correct){
            const token= jwt.sign({username:user.username,email:user.email}, 'my_secret_key2')
            console.log(token)
            return res.status(200).json({token: token,text: "Login Successful"});
        }
        else return res.status(403).json("Wrong password") //unauthorised http response
    } catch(err){
      console.log(err);
      res.status(401).json({ err });
    }
})


router.post('/register', async (req, res) => {
  try {
      const checkemail = await User.findByEmail(req.body.email)
      if(checkemail) {
          return res.status(400).send("Email already exists")
      }

      //The code inside the catch(err) below was originally here
      //But because our findByEmail function raises errors 
      //for users that DONT exist..in this case the error means
      //our user can be created!!
      //Perhaps this is not the right way to do this?

   } catch(err){
       console.log(err)
       const salt = await bcrypt.genSalt();
       const hashed = await bcrypt.hash(req.body.password, salt)
       console.log(hashed)
       const data = {username: req.body.username, email: req.body.email, password: hashed}
       console.log(data)
       const result = await User.create( data )
       if (!result){
           return res.status(500).json({msg: 'user couldnt be registered'})
       }
       res.status(201).json({msg: 'User created',newuser: result})
   }
  
})

module.exports=router;
