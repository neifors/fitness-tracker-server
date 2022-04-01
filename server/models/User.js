const { init } = require ('../db_config/dbconfig.js')

class User {
   constructor(data){
      this.username = data.username
      this.email = data.email
      this.password = data.password
   }
   
   static get all(){
      return new Promise(async (res, rej) => {
         try {
               const db = await init()
               const usersData = await db.collection('users').find().toArray()
               const users = usersData.map(user => new User({...user}))
               res(users);
         } catch (err) {
               rej(`Error retrieving users: ${err}`)
         }
      })
   }

   static findByEmail(email){
      return new Promise(async (res, rej) => {
         try {
               const db= await init();
               const result = await db.collection('users').find({email: email}).toArray()
               console.log(result.length)
               let user = new User(result[0]);
               res(user)
               
         } catch (err) {
               rej(`Error retrieving user: ${err}`)
         }
      })
   }

   static findByUsername(username){
      return new Promise(async (res, rej) => {
         try {
               const db= await init();
               const result = await db.collection('users').find({username: username}).toArray()
               let user = new User(result[0]);
               res(user)
               
         } catch (err) {
               rej(`${username} not found: ${err}`)
         }
      })
   }

   static create(data) {
      return new Promise (async (res, rej) => {
         try {
            const db = await init();
            console.log("hello I'm into create function")
            let newuser= await db.collection('users').insertOne({
               username: data.username, 
               email: data.email, 
               password: data.password
            })
            // let newUser = new User(user.ops[0]);
            console.log("This is the user has been created into models/User.js")
            console.log(newuser)
            res(`user created succesfully`)

         } catch (err) {
            rej(`Error creating user: ${err}`);
         }
      })
   }


}


module.exports = User
