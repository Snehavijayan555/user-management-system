const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const loadLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await User.findOne({ email: email });
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        if (userData.is_admin === 0) {
          res.render("login", { message: "Email and password are incorrect" });
        } else {
          req.session.user_id = userData._id;
          res.redirect("/admin/home");
        }
      } else {
        res.render("login", { message: "Email and password are incorrect" });
      }
    } else {
      res.render("login", { message: "Email and password are incorrect" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadDashboard = async (req, res) => {
  try {
    const usersData = await User.find({ is_admin: 0 });
    res.render("home", { users: usersData });
  } catch (error) {
    console.log(error.message);
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/admin");
  } catch (error) {
    console.log(error.message);
  }
};

// add new work start

const newUserLoad = async(req,res)=>{
  try{
res.render('new-user');
  }
  catch(error){
    console.log(error.message);
  }
}

const addUser=async(req,res)=>{
  try{

   
    const name=req.body.name;
    const email=req.body.email;
    const mno=req.body.mno;
    const password=req.body.password;

    const spassword= await securePassword(password);

    const user = new User({
      name:name,
      email:email,
      mobile:mno,
      password:spassword,
      is_admin:0
    });

    const userData=await user.save();

    if(userData){
res.redirect('/admin/home')
    }
    else{
      res.render('new-user',{message:'Something wrong'});
    }

  }
  catch(error){
    console.log(error.message);

  }
}

// edit user functionality
const editUserLoad = async(req,res)=>{
  try{
    const id=req.query.id; 
   const userData = await User.findById({_id:id});
   if(userData){
    res.render('edit-user',{user:userData});
   }
   else{
    res.redirect('/admin/home');
   }
res.render('edit-user');
  }
  catch(error){
    console.log(error.message);
  }
}

const updateUsers= async(req,res)=>{
  try{

  const userData= await  User.findByIdAndUpdate({_id:req.body.id},{$set:{ name:req.body.name,email:req.body.email,mobile:req.body.mno}});

  res.redirect('/admin/home');

  }catch(error){
    console.log(error.message)
  }
}

// delete user
const deleteUser=async(req,res)=>{
  try{

const id=req.query.id;
await User.deleteOne({_id:id})
res.redirect('/admin/home')
  }
  catch(error){
    console.log(error.message);
  }
}

module.exports = {
  loadLogin,
  verifyLogin,
  loadDashboard,
  logout,
  newUserLoad,
  addUser,
  editUserLoad,
  updateUsers,deleteUser
};
